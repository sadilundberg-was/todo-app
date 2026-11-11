"use client";

import { useEffect } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
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
 * Data-driven form.
 *
 * Props:
 * - mutation → react-query mutation (whole object)
 * - config   → {
 *     title, description, submitLabel?,
 *     validation,          // Zod schema
 *     fields: [{ accessor, label, description, type, defaultValue, ... }]
 *   }
 *
 * Field extras:
 * - getOptions(values)  → dynamic select options
 * - getDisabled(values) → disable field from other values
 * - resets: ["other"]   → clear listed fields when this field changes
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

function resolveFieldConfig(fieldConfig, values) {
  return {
    ...fieldConfig,
    options: fieldConfig.getOptions
      ? fieldConfig.getOptions(values)
      : fieldConfig.options,
  };
}

function FieldControl({
  fieldConfig,
  field,
  fieldState,
  disabled,
  values,
}) {
  const resolved = resolveFieldConfig(fieldConfig, values);
  const Component = FIELD_BY_TYPE[resolved.type];
  const fieldDisabled =
    disabled || Boolean(fieldConfig.getDisabled?.(values));

  if (!Component) {
    return (
      <FieldError>
        Unsupported field type: {String(fieldConfig.type)}
      </FieldError>
    );
  }

  return (
    <Component
      fieldConfig={resolved}
      field={field}
      fieldState={fieldState}
      disabled={fieldDisabled}
    />
  );
}

export function Form({ mutation, config }) {
  const disabled = mutation.isPending;

  const { control, handleSubmit, reset, setValue, subscribe } = useForm({
    resolver: zodResolver(config.validation),
    defaultValues: getDefaultValues(config.fields),
  });

  const values = useWatch({ control });

  useEffect(() => {
    return subscribe({
      formState: { values: true },
      callback: ({ name, type }) => {
        if (type !== "change" || !name) return;
        const fieldConfig = config.fields.find(
          (field) => field.accessor === name,
        );
        if (!fieldConfig?.resets?.length) return;

        for (const accessor of fieldConfig.resets) {
          const target = config.fields.find(
            (field) => field.accessor === accessor,
          );
          setValue(accessor, target?.defaultValue ?? "");
        }
      },
    });
  }, [subscribe, setValue, config.fields]);

  async function onSubmit(submitValues) {
    await mutation.mutateAsync(submitValues);
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
                control={control}
                render={({ field, fieldState }) => (
                  <FieldControl
                    fieldConfig={fieldConfig}
                    field={field}
                    fieldState={fieldState}
                    disabled={disabled}
                    values={values}
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
              onClick={() => reset()}
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
