import { CATEGORIES, PRIORITIES, TAGS } from "@/features/todo/config/options";
import { createTodoSchema } from "@/features/todo/schema";

/**
 * Create-form UI schema for todos.
 * Consumed by the shared data-driven <Form />.
 */
export const createTodoFormSchema = {
  title: "New todo",
  description:
    "Complex Field + React Hook Form example — priority, category, tags, and pin.",
  submitLabel: "Add todo",
  validation: createTodoSchema,
  fields: [
    {
      accessor: "title",
      label: "Title",
      description: "A short, actionable title for the task.",
      type: "input",
      placeholder: "Ship the modular todo example",
      defaultValue: "",
    },
    {
      accessor: "notes",
      label: "Notes",
      description: "Optional details that help you finish the task.",
      type: "textarea",
      placeholder: "Context, links, or acceptance criteria…",
      defaultValue: "",
    },
    {
      accessor: "priority",
      label: "Priority",
      description: "How urgent is this task?",
      type: "radio",
      options: PRIORITIES,
      defaultValue: "medium",
      separatorBefore: true,
    },
    {
      accessor: "category",
      label: "Category",
      description: "Used to group todos in the list.",
      type: "select",
      placeholder: "Select a category",
      options: CATEGORIES,
      defaultValue: "",
      separatorBefore: true,
    },
    {
      accessor: "tags",
      label: "Tags",
      description:
        "Optional labels that describe how you want to work on this.",
      type: "checkbox",
      options: TAGS,
      defaultValue: [],
      separatorBefore: true,
    },
    {
      accessor: "pinned",
      label: "Pin to top",
      description: "Keep this todo above the rest of the list.",
      type: "switch",
      defaultValue: false,
      separatorBefore: true,
    },
  ],
};
