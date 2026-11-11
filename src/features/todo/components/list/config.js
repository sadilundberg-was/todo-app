import { getTodoOptions } from "@/features/todo/components/options";
import { listMessages } from "@/features/todo/components/list/messages";
import { getMessages } from "@/utils/i18n";
import { COUNTRY, DEFAULT_COUNTRY, DEFAULT_LOCALE } from "@/utils/locale";

/**
 * List UI config for todos.
 * Pass context only — this module resolves messages, country meta, permissions.
 */
export function createTodoListConfig({
  locale = DEFAULT_LOCALE,
  country = DEFAULT_COUNTRY,
  permissions = {},
} = {}) {
  const t = getMessages(listMessages, locale);
  const { priorities, categories, tags, states } = getTodoOptions(locale);
  const { aToggle = true, aDelete = true } = permissions;

  return {
    title: t.title,
    description: t.description,
    empty: t.empty,
    loading: t.loading,
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
          ...(country === COUNTRY.SE
            ? [{ accessor: "costCenter" }]
            : []),
          ...(country === COUNTRY.US
            ? [{ accessor: "state", options: states }]
            : []),
        ],
      },
      ...(aToggle
        ? {
            media: {
              type: "checkbox",
              accessor: "completed",
              mutation: "aToggle",
            },
          }
        : {}),
      actions: [
        ...(aDelete
          ? [
              {
                type: "aDelete",
                mutation: "aDelete",
              },
            ]
          : []),
      ],
    },
  };
}
