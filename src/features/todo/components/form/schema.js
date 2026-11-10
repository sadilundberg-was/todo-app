import { z } from "zod";
import {
  CATEGORY_IDS,
  PRIORITY_IDS,
  STATE_IDS,
  TAG_IDS,
} from "@/features/todo/components/options";
import { COUNTRY, DEFAULT_COUNTRY } from "@/utils/locale";

/** Client-side form validation only — not used by the API. */

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

function extendForCountry(shape, errors, country) {
  if (country === COUNTRY.SE) {
    shape.costCenter = z
      .string()
      .trim()
      .min(1, errors.costCenterRequired)
      .max(50, errors.costCenterTooLong);
    shape.state = z.string().optional().or(z.literal(""));
    return;
  }

  if (country === COUNTRY.US) {
    shape.state = z
      .string({ required_error: errors.stateRequired })
      .min(1, errors.stateRequired)
      .refine((value) => STATE_IDS.includes(value), {
        message: errors.stateInvalid,
      });
    shape.costCenter = z.string().optional().or(z.literal(""));
  }
}

export function createTodoFormValidation(
  t,
  country = DEFAULT_COUNTRY,
) {
  const { errors } = t;
  const shape = baseFormSchema(errors);
  extendForCountry(shape, errors, country);
  return z.object(shape);
}
