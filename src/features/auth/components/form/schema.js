import { z } from "zod";
import {
  CLIENT_IDS,
  getAuthUserOptions,
} from "@/features/auth/components/options";
import { DEFAULT_LOCALE } from "@/utils/locale";

export function createLoginFormValidation(t, locale = DEFAULT_LOCALE) {
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
      const userIds = getAuthUserOptions(values.clientId, locale).map(
        (user) => user.id,
      );
      if (!userIds.includes(values.userId)) {
        ctx.addIssue({
          code: "custom",
          path: ["userId"],
          message: errors.userInvalid,
        });
      }
    });
}
