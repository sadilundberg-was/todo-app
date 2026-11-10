import { getTodoOptions } from "@/features/todo/options";
import { getListI18n } from "@/features/todo/list/i18n";
import { DEFAULT_LOCALE } from "@/i18n/locale";

/**
 * List UI schema for todos.
 * Pass context only — this module resolves i18n.
 */
export function createTodoListSchema({ locale = DEFAULT_LOCALE } = {}) {
  const list = getListI18n(locale);
  const { priorities, categories, tags, states } = getTodoOptions(locale);

  return {
    title: list.title,
    description: list.description,
    messages: list.messages,
    item: {
      key: "id",
      variant: "outline",
      size: "sm",
      title: {
        accessor: "title",
        completedAccessor: "completed",
        pinnedAccessor: "pinned",
      },
      description: {
        accessor: "notes",
        meta: [
          { accessor: "priority", options: priorities },
          { accessor: "category", options: categories },
          { accessor: "tags", options: tags, multiple: true },
          { accessor: "costCenter" },
          { accessor: "state", options: states },
        ],
      },
      media: {
        type: "checkbox",
        accessor: "completed",
        mutation: "toggle",
      },
      actions: [
        {
          type: "delete",
          mutation: "delete",
        },
      ],
    },
  };
}
