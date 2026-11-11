import { z } from "zod";
import {
  CATEGORY_IDS,
  PRIORITY_IDS,
  STATE_IDS,
  TAG_IDS,
} from "@/features/todo/components/options";
import { COUNTRY, DEFAULT_COUNTRY } from "@/utils/locale";

/**
 * API payload validation — separate from the form schema.
 * English messages; country rules live here, not in form/.
 */

function basePayloadSchema() {
  return {
    title: z.string().trim().min(1, "Title is required").max(200),
    notes: z.string().trim().max(500).optional().or(z.literal("")),
    priority: z
      .string()
      .min(1)
      .refine((value) => PRIORITY_IDS.includes(value), {
        message: "Invalid priority",
      }),
    category: z
      .string()
      .min(1)
      .refine((value) => CATEGORY_IDS.includes(value), {
        message: "Invalid category",
      }),
    tags: z
      .array(z.string())
      .max(3)
      .refine((value) => value.every((tag) => TAG_IDS.includes(tag)), {
        message: "Invalid tags",
      }),
    pinned: z.boolean(),
  };
}

function extendForCountry(shape, country) {
  if (country === COUNTRY.SE) {
    shape.costCenter = z.string().trim().min(1, "Cost center is required").max(50);
    shape.state = z.string().optional().or(z.literal(""));
    return;
  }

  if (country === COUNTRY.US) {
    shape.state = z
      .string()
      .min(1, "State is required")
      .refine((value) => STATE_IDS.includes(value), {
        message: "Invalid state",
      });
    shape.costCenter = z.string().optional().or(z.literal(""));
  }
}

export function aCreateTodoPayloadSchema(country = DEFAULT_COUNTRY) {
  const shape = basePayloadSchema();
  extendForCountry(shape, country);
  return z.object(shape);
}
