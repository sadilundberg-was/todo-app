import { getTodoOptions } from "@/features/todo/components/options";
import { formMessages } from "@/features/todo/components/form/messages";
import { createTodoFormValidation } from "@/features/todo/components/form/schema";
import { getMessages } from "@/utils/i18n";
import { COUNTRY, DEFAULT_COUNTRY, DEFAULT_LOCALE } from "@/utils/locale";

export function createTodoFormConfig({
  locale = DEFAULT_LOCALE,
  country = DEFAULT_COUNTRY,
} = {}) {
  const t = getMessages(formMessages, locale);
  const { priorities, categories, tags, states } = getTodoOptions(locale);

  return {
    title: t.title,
    description: t.description,
    submitLabel: t.submitLabel,
    savingLabel: t.savingLabel,
    resetLabel: t.resetLabel,
    validation: createTodoFormValidation(t, country),
    fields: [
      {
        accessor: "title",
        label: t.fields.title.label,
        description: t.fields.title.description,
        type: "text",
        placeholder: t.fields.title.placeholder,
        defaultValue: "",
      },
      {
        accessor: "notes",
        label: t.fields.notes.label,
        description: t.fields.notes.description,
        type: "textarea",
        placeholder: t.fields.notes.placeholder,
        defaultValue: "",
      },
      {
        accessor: "priority",
        label: t.fields.priority.label,
        description: t.fields.priority.description,
        type: "radio",
        options: priorities,
        defaultValue: "medium",
        separatorBefore: true,
      },
      {
        accessor: "category",
        label: t.fields.category.label,
        description: t.fields.category.description,
        type: "select",
        placeholder: t.fields.category.placeholder,
        options: categories,
        defaultValue: "",
        separatorBefore: true,
      },
      {
        accessor: "tags",
        label: t.fields.tags.label,
        description: t.fields.tags.description,
        type: "checkbox",
        options: tags,
        defaultValue: [],
        separatorBefore: true,
      },
      {
        accessor: "pinned",
        label: t.fields.pinned.label,
        description: t.fields.pinned.description,
        type: "switch",
        defaultValue: false,
        separatorBefore: true,
      },
      {
        accessor: "costCenter",
        label: t.fields.costCenter.label,
        description: t.fields.costCenter.description,
        type: "text",
        placeholder: t.fields.costCenter.placeholder,
        defaultValue: "",
        separatorBefore: true,
        show: country === COUNTRY.SE,
      },
      {
        accessor: "state",
        label: t.fields.state.label,
        description: t.fields.state.description,
        type: "select",
        placeholder: t.fields.state.placeholder,
        options: states,
        defaultValue: "",
        separatorBefore: true,
        show: [COUNTRY.US, COUNTRY.CA].includes(country),
      },
    ],
  };
}
