import { z } from "zod";
import {
  CATEGORY_VALUES,
  PRIORITY_IDS,
  TAG_IDS,
} from "@/features/todo/config/options";

/** Shared Zod schemas for the todo feature (forms + API validation). */
export const createTodoSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(200, "Title must be 200 characters or fewer"),
  notes: z
    .string()
    .trim()
    .max(500, "Notes must be 500 characters or fewer")
    .optional()
    .or(z.literal("")),
  priority: z
    .string({ required_error: "Please select a priority" })
    .min(1, "Please select a priority")
    .refine((value) => PRIORITY_IDS.includes(value), {
      message: "Invalid priority",
    }),
  category: z
    .string({ required_error: "Please select a category" })
    .min(1, "Please select a category")
    .refine((value) => CATEGORY_VALUES.includes(value), {
      message: "Invalid category",
    }),
  tags: z
    .array(z.string())
    .max(3, "You can select up to 3 tags")
    .refine((value) => value.every((tag) => TAG_IDS.includes(tag)), {
      message: "You selected an invalid tag",
    }),
  pinned: z.boolean(),
});
