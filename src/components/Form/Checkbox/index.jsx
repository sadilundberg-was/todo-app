import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";

export function CheckboxField({ fieldConfig, field, fieldState, disabled }) {
  const id = `field-${fieldConfig.accessor}`;
  const isInvalid = fieldState.invalid;

  return (
    <FieldSet>
      <FieldLegend>{fieldConfig.label}</FieldLegend>
      {fieldConfig.description ? (
        <FieldDescription>{fieldConfig.description}</FieldDescription>
      ) : null}
      <FieldGroup data-slot="checkbox-group">
        {(fieldConfig.options ?? []).map((option) => (
          <Field
            key={option.id}
            orientation="horizontal"
            data-invalid={isInvalid}
          >
            <Checkbox
              id={`${id}-${option.id}`}
              name={field.name}
              aria-invalid={isInvalid}
              disabled={disabled}
              checked={(field.value ?? []).includes(option.id)}
              onCheckedChange={(checked) => {
                const current = field.value ?? [];
                const nextValue = checked
                  ? [...current, option.id]
                  : current.filter((value) => value !== option.id);
                field.onChange(nextValue);
                field.onBlur();
              }}
            />
            <FieldContent>
              <FieldLabel htmlFor={`${id}-${option.id}`}>
                {option.title}
              </FieldLabel>
              {option.description ? (
                <FieldDescription>{option.description}</FieldDescription>
              ) : null}
            </FieldContent>
          </Field>
        ))}
      </FieldGroup>
      {isInvalid ? <FieldError errors={[fieldState.error]} /> : null}
    </FieldSet>
  );
}
