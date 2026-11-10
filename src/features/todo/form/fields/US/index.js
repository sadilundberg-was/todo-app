import { z } from "zod";
import { STATE_IDS } from "@/features/todo/options";

/** United States — form fields + zod extras. */

export function fields(t, options) {
  const { states } = options;
  return [
    {
      accessor: "state",
      label: t.state.label,
      description: t.state.description,
      type: "select",
      placeholder: t.state.placeholder,
      options: states,
      defaultValue: "",
      separatorBefore: true,
    },
  ];
}

export function extendSchema(shape, errors) {
  shape.state = z
    .string({ required_error: errors.stateRequired })
    .min(1, errors.stateRequired)
    .refine((value) => STATE_IDS.includes(value), {
      message: errors.stateInvalid,
    });
  shape.costCenter = z.string().optional().or(z.literal(""));
  return shape;
}
