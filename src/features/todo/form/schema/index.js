import { z } from "zod";
import {
  CATEGORY_IDS,
  PRIORITY_IDS,
  TAG_IDS,
} from "@/features/todo/options";
import * as SE from "@/features/todo/form/fields/SE";
import * as US from "@/features/todo/form/fields/US";
import en from "@/features/todo/form/schema/i18n/en";
import { DEFAULT_COUNTRY } from "@/i18n/locale";

/** Client-side form validation only — not used by the API. */

const countryForms = { SE, US };

function baseFormSchema(errors) {
  return {
    title: z
      .string()
      .trim()
      .min(1, errors.titleRequired)
      .max(200, errors.titleTooLong),
    notes: z
      .string()
      .trim()
      .max(500, errors.notesTooLong)
      .optional()
      .or(z.literal("")),
    priority: z
      .string({ required_error: errors.priorityRequired })
      .min(1, errors.priorityRequired)
      .refine((value) => PRIORITY_IDS.includes(value), {
        message: errors.priorityInvalid,
      }),
    category: z
      .string({ required_error: errors.categoryRequired })
      .min(1, errors.categoryRequired)
      .refine((value) => CATEGORY_IDS.includes(value), {
        message: errors.categoryInvalid,
      }),
    tags: z
      .array(z.string())
      .max(3, errors.tagsTooMany)
      .refine((value) => value.every((tag) => TAG_IDS.includes(tag)), {
        message: errors.tagsInvalid,
      }),
    pinned: z.boolean(),
  };
}

export function createTodoFormValidation(errors = en, country = DEFAULT_COUNTRY) {
  const shape = baseFormSchema(errors);
  countryForms[country]?.extendSchema?.(shape, errors);
  return z.object(shape);
}
