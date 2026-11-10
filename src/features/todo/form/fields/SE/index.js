import { z } from "zod";

/** Sweden — form fields + zod extras. */

export function fields(t) {
  return [
    {
      accessor: "costCenter",
      label: t.costCenter.label,
      description: t.costCenter.description,
      type: "input",
      placeholder: t.costCenter.placeholder,
      defaultValue: "",
      separatorBefore: true,
    },
  ];
}

export function extendSchema(shape, errors) {
  shape.costCenter = z
    .string()
    .trim()
    .min(1, errors.costCenterRequired)
    .max(50, errors.costCenterTooLong);
  shape.state = z.string().optional().or(z.literal(""));
  return shape;
}
