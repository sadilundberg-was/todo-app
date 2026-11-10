"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

/**
 * Data-driven create form.
 *
 * Props:
 * - mutation → react-query mutation (whole object)
 * - schema   → {
 *     title, description, submitLabel?,
 *     validation,          // Zod schema
 *     fields: [{ accessor, label, description, type, defaultValue, ... }]
 *   }
 *
 * Types: input | textarea | checkbox | select | radio | switch
 */
function getDefaultValues(fields) {
  return Object.fromEntries(
    fields.map((field) => [field.accessor, field.defaultValue]),
  );
}

function FieldControl({ fieldConfig, field, fieldState, disabled }) {
  const id = `field-${fieldConfig.accessor}`;
  const isInvalid = fieldState.invalid;

  switch (fieldConfig.type) {
    case "input":
      return (
        <Field data-invalid={isInvalid}>
          <FieldLabel htmlFor={id}>{fieldConfig.label}</FieldLabel>
          <Input
            {...field}
            id={id}
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

    case "textarea":
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

    case "select":
      return (
        <Field data-invalid={isInvalid}>
          <FieldLabel htmlFor={id}>{fieldConfig.label}</FieldLabel>
          <Select
            name={field.name}
            value={field.value}
            onValueChange={field.onChange}
            disabled={disabled}
          >
            <SelectTrigger
              id={id}
              aria-invalid={isInvalid}
              className="w-full"
            >
              <SelectValue
                placeholder={fieldConfig.placeholder ?? "Select…"}
              />
            </SelectTrigger>
            <SelectContent>
              {(fieldConfig.options ?? []).map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
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

    case "radio":
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
              <FieldLabel
                key={option.id}
                htmlFor={`${id}-${option.id}`}
              >
                <Field orientation="horizontal">
                  <FieldContent>
                    <FieldTitle>{option.title}</FieldTitle>
                    {option.description ? (
                      <FieldDescription>
                        {option.description}
                      </FieldDescription>
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

    case "checkbox":
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
                    <FieldDescription>
                      {option.description}
                    </FieldDescription>
                  ) : null}
                </FieldContent>
              </Field>
            ))}
          </FieldGroup>
          {isInvalid ? <FieldError errors={[fieldState.error]} /> : null}
        </FieldSet>
      );

    case "switch":
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

    default:
      return (
        <FieldError>
          Unsupported field type: {String(fieldConfig.type)}
        </FieldError>
      );
  }
}

export function Form({ mutation, schema }) {
  const disabled = mutation.isPending;

  const form = useForm({
    resolver: zodResolver(schema.validation),
    defaultValues: getDefaultValues(schema.fields),
  });

  async function onSubmit(values) {
    await mutation.mutateAsync(values);
    form.reset();
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldSet>
        {schema.title ? <FieldLegend>{schema.title}</FieldLegend> : null}
        {schema.description ? (
          <FieldDescription>{schema.description}</FieldDescription>
        ) : null}

        <FieldGroup>
          {schema.fields.map((fieldConfig) => (
            <div key={fieldConfig.accessor} className="contents">
              {fieldConfig.separatorBefore ? <FieldSeparator /> : null}
              <Controller
                name={fieldConfig.accessor}
                control={form.control}
                render={({ field, fieldState }) => (
                  <FieldControl
                    fieldConfig={fieldConfig}
                    field={field}
                    fieldState={fieldState}
                    disabled={disabled}
                  />
                )}
              />
            </div>
          ))}

          {mutation.isError ? (
            <FieldError>{mutation.error.message}</FieldError>
          ) : null}

          <Field orientation="horizontal">
            <Button type="submit" disabled={disabled}>
              {disabled ? "Saving…" : (schema.submitLabel ?? "Save")}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
              disabled={disabled}
            >
              Reset
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}
