import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectField({ fieldConfig, field, fieldState, disabled }) {
  const id = `field-${fieldConfig.accessor}`;
  const isInvalid = fieldState.invalid;

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={id}>{fieldConfig.label}</FieldLabel>
      <Select
        key={field.value || `${field.name}-empty`}
        name={field.name}
        value={field.value || undefined}
        onValueChange={field.onChange}
        disabled={disabled}
      >
        <SelectTrigger id={id} aria-invalid={isInvalid} className="w-full">
          <SelectValue placeholder={fieldConfig.placeholder ?? "Select…"} />
        </SelectTrigger>
        <SelectContent>
          {(fieldConfig.options ?? []).map((option) => (
            <SelectItem key={option.id} value={option.id}>
              {option.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {fieldConfig.description ? (
        <FieldDescription>{fieldConfig.description}</FieldDescription>
      ) : null}
      {isInvalid ? <FieldError errors={[fieldState.error]} /> : null}
    </Field>
  );
}
