import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function TextField({ fieldConfig, field, fieldState, disabled }) {
  const id = `field-${fieldConfig.accessor}`;
  const isInvalid = fieldState.invalid;

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={id}>{fieldConfig.label}</FieldLabel>
      <Input
        {...field}
        id={id}
        type="text"
        placeholder={fieldConfig.placeholder}
        autoComplete="off"
        aria-invalid={isInvalid}
        disabled={disabled}
      />
      {fieldConfig.description ? (
        <FieldDescription>{fieldConfig.description}</FieldDescription>
      ) : null}
      {isInvalid ? <FieldError errors={[fieldState.error]} /> : null}
    </Field>
  );
}
