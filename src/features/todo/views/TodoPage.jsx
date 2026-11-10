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
import { createTodoFormSchema } from "@/features/todo/form/config";
import { createTodoListSchema } from "@/features/todo/list/config";
import {
  useCreateTodo,
  useDeleteTodo,
  useToggleTodo,
} from "@/features/todo/mutations";
import { useTodos } from "@/features/todo/queries";
import { getCountry, getLocale } from "@/i18n/locale";

/**
 * Feature view — pass context; form/list configs resolve the rest.
 * Flip DEFAULT_LOCALE / DEFAULT_COUNTRY in src/i18n/locale.js.
 */
export function TodoPage() {
  const createTodo = useCreateTodo();
  const todosQuery = useTodos();
  const toggleTodo = useToggleTodo();
  const deleteTodo = useDeleteTodo();

  const locale = getLocale();
  const country = getCountry();

  const formSchema = createTodoFormSchema({ locale, country });
  const listSchema = createTodoListSchema({ locale });

  return (
    <main className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-8 px-4 py-12">
      <Card className="w-full">
        <CardContent className="pt-6">
          <Form mutation={createTodo} schema={formSchema} />
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>{listSchema.title}</CardTitle>
          <CardDescription>{listSchema.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <List
            query={todosQuery}
            mutations={{ toggle: toggleTodo, delete: deleteTodo }}
            schema={listSchema}
          />
        </CardContent>
      </Card>
    </main>
  );
}
