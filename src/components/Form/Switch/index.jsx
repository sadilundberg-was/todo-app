import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";

export function SwitchField({ fieldConfig, field, fieldState, disabled }) {
  const id = `field-${fieldConfig.accessor}`;
  const isInvalid = fieldState.invalid;

  return (
    <Field orientation="horizontal" data-invalid={isInvalid}>
      <FieldContent>
        <FieldLabel htmlFor={id}>{fieldConfig.label}</FieldLabel>
        {fieldConfig.description ? (
          <FieldDescription>{fieldConfig.description}</FieldDescription>
        ) : null}
      </FieldContent>
      <Switch
        id={id}
        name={field.name}
        checked={field.value}
        onCheckedChange={field.onChange}
        aria-invalid={isInvalid}
        disabled={disabled}
      />
      {isInvalid ? <FieldError errors={[fieldState.error]} /> : null}
    </Field>
  );
}
