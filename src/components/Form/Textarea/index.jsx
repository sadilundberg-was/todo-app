import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";

export function TextareaField({ fieldConfig, field, fieldState, disabled }) {
  const id = `field-${fieldConfig.accessor}`;
  const isInvalid = fieldState.invalid;

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={id}>{fieldConfig.label}</FieldLabel>
      <Textarea
        {...field}
        id={id}
        placeholder={fieldConfig.placeholder}
        rows={fieldConfig.rows ?? 4}
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
