"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/Form";
import { List } from "@/components/List";
import { createTodoFormConfig } from "@/features/todo/components/form/config";
import { createTodoListConfig } from "@/features/todo/components/list/config";
import {
  useCreateTodo,
  useDeleteTodo,
  useToggleTodo,
} from "@/features/todo/data/mutations";
import { useTodos } from "@/features/todo/data/queries";
import { getCountry, getLocale } from "@/utils/locale";

/**
 * Feature view — pass context; form/list configs resolve the rest.
 * Flip DEFAULT_LOCALE / DEFAULT_COUNTRY (LOCALE.* / COUNTRY.*) in src/utils/locale.js.
 */
export function TodoPage() {
  const createTodo = useCreateTodo();
  const todosQuery = useTodos();
  const toggleTodo = useToggleTodo();
  const deleteTodo = useDeleteTodo();

  const locale = getLocale();
  const country = getCountry();

  const formConfig = createTodoFormConfig({ locale, country });
  const listConfig = createTodoListConfig({ locale, country });

  return (
    <main className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-8 px-4 py-12">
      <Card className="w-full">
        <CardContent className="pt-6">
          <Form mutation={createTodo} config={formConfig} />
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>{listConfig.title}</CardTitle>
          <CardDescription>{listConfig.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <List
            query={todosQuery}
            mutations={{ toggle: toggleTodo, delete: deleteTodo }}
            config={listConfig}
          />
        </CardContent>
      </Card>
    </main>
  );
}
