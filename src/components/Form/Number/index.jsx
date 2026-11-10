import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function NumberField({ fieldConfig, field, fieldState, disabled }) {
  const id = `field-${fieldConfig.accessor}`;
  const isInvalid = fieldState.invalid;

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={id}>{fieldConfig.label}</FieldLabel>
      <Input
        {...field}
        id={id}
        type="number"
        placeholder={fieldConfig.placeholder}
        autoComplete="off"
        aria-invalid={isInvalid}
        disabled={disabled}
        value={field.value ?? ""}
        onChange={(event) => {
          const next = event.target.value;
          field.onChange(next === "" ? "" : Number(next));
        }}
      />
      {fieldConfig.description ? (
        <FieldDescription>{fieldConfig.description}</FieldDescription>
      ) : null}
      {isInvalid ? <FieldError errors={[fieldState.error]} /> : null}
    </Field>
  );
}
