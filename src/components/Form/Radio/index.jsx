import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";

export function RadioField({ fieldConfig, field, fieldState, disabled }) {
  const id = `field-${fieldConfig.accessor}`;
  const isInvalid = fieldState.invalid;

  return (
    <FieldSet data-invalid={isInvalid}>
      <FieldLegend variant="label">{fieldConfig.label}</FieldLegend>
      {fieldConfig.description ? (
        <FieldDescription>{fieldConfig.description}</FieldDescription>
      ) : null}
      <RadioGroup
        name={field.name}
        value={field.value}
        onValueChange={field.onChange}
        aria-invalid={isInvalid}
        disabled={disabled}
      >
        {(fieldConfig.options ?? []).map((option) => (
          <FieldLabel key={option.id} htmlFor={`${id}-${option.id}`}>
            <Field orientation="horizontal">
              <FieldContent>
                <FieldTitle>{option.title}</FieldTitle>
                {option.description ? (
                  <FieldDescription>{option.description}</FieldDescription>
                ) : null}
              </FieldContent>
              <RadioGroupItem
                value={option.id}
                id={`${id}-${option.id}`}
              />
            </Field>
          </FieldLabel>
        ))}
      </RadioGroup>
      {isInvalid ? <FieldError errors={[fieldState.error]} /> : null}
    </FieldSet>
  );
}
