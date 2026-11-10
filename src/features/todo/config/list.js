import { CATEGORIES, PRIORITIES, TAGS } from "@/features/todo/config/options";

/**
 * List UI schema for todos.
 * Consumed by the shared data-driven <List />.
 */
export const todoListSchema = {
  title: "Your todos",
  description: "Pinned items stay on top. Toggle complete or delete from each row.",
  messages: {
    empty: "No todos yet — add your first one above.",
    loading: "Loading todos…",
  },
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
        {
          accessor: "priority",
          options: PRIORITIES,
          value: "id",
          label: "title",
        },
        {
          accessor: "category",
          options: CATEGORIES,
          value: "value",
          label: "label",
        },
        {
          accessor: "tags",
          options: TAGS,
          value: "id",
          label: "title",
          multiple: true,
        },
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
