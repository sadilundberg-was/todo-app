import { z } from "zod";
import { CLIENT_IDS, getUserSync } from "@/features/users/data/api";

export function createLoginFormValidation(t) {
  const { errors } = t;

  return z
    .object({
      clientId: z
        .string({ required_error: errors.clientRequired })
        .min(1, errors.clientRequired)
        .refine((value) => CLIENT_IDS.includes(value), {
          message: errors.clientInvalid,
        }),
      userId: z
        .string({ required_error: errors.userRequired })
        .min(1, errors.userRequired),
    })
    .superRefine((values, ctx) => {
      const user = getUserSync(values.clientId, values.userId);

      if (!user) {
        ctx.addIssue({
          code: "custom",
          path: ["userId"],
          message: errors.userInvalid,
        });
        return;
      }

      if (!user.isActive) {
        ctx.addIssue({
          code: "custom",
          path: ["userId"],
          message: errors.userInactive,
        });
      }
    });
}
