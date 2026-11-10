"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { CheckboxField } from "@/components/Form/Checkbox";
import { NumberField } from "@/components/Form/Number";
import { RadioField } from "@/components/Form/Radio";
import { SelectField } from "@/components/Form/Select";
import { SwitchField } from "@/components/Form/Switch";
import { TextField } from "@/components/Form/Text";
import { TextareaField } from "@/components/Form/Textarea";

/**
 * Data-driven create form.
 *
 * Props:
 * - mutation → react-query mutation (whole object)
 * - config   → {
 *     title, description, submitLabel?,
 *     validation,          // Zod schema
 *     fields: [{ accessor, label, description, type, defaultValue, ... }]
 *   }
 *
 * Types: text | number | textarea | checkbox | select | radio | switch
 */

const FIELD_BY_TYPE = {
  text: TextField,
  number: NumberField,
  textarea: TextareaField,
  select: SelectField,
  radio: RadioField,
  checkbox: CheckboxField,
  switch: SwitchField,
};

function getDefaultValues(fields) {
  return Object.fromEntries(
    fields.map((field) => [field.accessor, field.defaultValue]),
  );
}

function FieldControl({ fieldConfig, field, fieldState, disabled }) {
  const Component = FIELD_BY_TYPE[fieldConfig.type];

  if (!Component) {
    return (
      <FieldError>
        Unsupported field type: {String(fieldConfig.type)}
      </FieldError>
    );
  }

  return (
    <Component
      fieldConfig={fieldConfig}
      field={field}
      fieldState={fieldState}
      disabled={disabled}
    />
  );
}

export function Form({ mutation, config }) {
  const disabled = mutation.isPending;

  const form = useForm({
    resolver: zodResolver(config.validation),
    defaultValues: getDefaultValues(config.fields),
  });

  async function onSubmit(values) {
    await mutation.mutateAsync(values);
    form.reset();
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldSet>
        {config.title ? <FieldLegend>{config.title}</FieldLegend> : null}
        {config.description ? (
          <FieldDescription>{config.description}</FieldDescription>
        ) : null}

        <FieldGroup>
          {config.fields.map((fieldConfig) => (
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
              {disabled
                ? (config.savingLabel ?? "Saving…")
                : (config.submitLabel ?? "Save")}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
              disabled={disabled}
            >
              {config.resetLabel ?? "Reset"}
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}
