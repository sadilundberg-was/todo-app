import { getTodoOptions } from "@/features/todo/options";
import * as SE from "@/features/todo/form/fields/SE";
import * as US from "@/features/todo/form/fields/US";
import { fields as sharedFields } from "@/features/todo/form/fields";
import { getFieldsI18n } from "@/features/todo/form/fields/i18n";
import { getSEFieldsI18n } from "@/features/todo/form/fields/SE/i18n";
import { getUSFieldsI18n } from "@/features/todo/form/fields/US/i18n";
import { getFormI18n } from "@/features/todo/form/i18n";
import { createTodoFormValidation } from "@/features/todo/form/schema";
import { getFormErrorsI18n } from "@/features/todo/form/schema/i18n";
import { DEFAULT_COUNTRY, DEFAULT_LOCALE } from "@/i18n/locale";

/**
 * Country registry — add a folder + one line here per country.
 */
const countryForms = {
  SE: { ...SE, getI18n: getSEFieldsI18n },
  US: { ...US, getI18n: getUSFieldsI18n },
};

/**
 * Create-form UI schema for todos.
 * Pass context only — this module resolves i18n + country fields.
 */
export function createTodoFormSchema({
  locale = DEFAULT_LOCALE,
  country = DEFAULT_COUNTRY,
} = {}) {
  const form = getFormI18n(locale);
  const errors = getFormErrorsI18n(locale);
  const fieldLabels = getFieldsI18n(locale);
  const options = getTodoOptions(locale);
  const countryForm = countryForms[country];

  const validation = createTodoFormValidation(errors, country);
  const fields = sharedFields(fieldLabels, options);
  if (countryForm) {
    fields.push(...countryForm.fields(countryForm.getI18n(locale), options));
  }

  return {
    title: form.title,
    description: form.description,
    submitLabel: form.submitLabel,
    savingLabel: form.savingLabel,
    resetLabel: form.resetLabel,
    validation,
    fields,
  };
}
