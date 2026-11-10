/** Fields every country gets. Labels come from fields/i18n. */

export function fields(t, options) {
  const { priorities, categories, tags } = options;
  return [
    {
      accessor: "title",
      label: t.title.label,
      description: t.title.description,
      type: "input",
      placeholder: t.title.placeholder,
      defaultValue: "",
    },
    {
      accessor: "notes",
      label: t.notes.label,
      description: t.notes.description,
      type: "textarea",
      placeholder: t.notes.placeholder,
      defaultValue: "",
    },
    {
      accessor: "priority",
      label: t.priority.label,
      description: t.priority.description,
      type: "radio",
      options: priorities,
      defaultValue: "medium",
      separatorBefore: true,
    },
    {
      accessor: "category",
      label: t.category.label,
      description: t.category.description,
      type: "select",
      placeholder: t.category.placeholder,
      options: categories,
      defaultValue: "",
      separatorBefore: true,
    },
    {
      accessor: "tags",
      label: t.tags.label,
      description: t.tags.description,
      type: "checkbox",
      options: tags,
      defaultValue: [],
      separatorBefore: true,
    },
    {
      accessor: "pinned",
      label: t.pinned.label,
      description: t.pinned.description,
      type: "switch",
      defaultValue: false,
      separatorBefore: true,
    },
  ];
}
