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
import { getTodoPermissions } from "@/features/todo/data/permissions";
import { usePermissions } from "@/hooks/usePermissions";
import { getCountry, getLocale } from "@/utils/locale";

export function TodoPage() {
  const todosQuery = useTodos();
  const createTodo = useCreateTodo();
  const toggleTodo = useToggleTodo();
  const deleteTodo = useDeleteTodo();

  const permissions = usePermissions(getTodoPermissions);

  const locale = getLocale();
  const country = getCountry();

  const formConfig = createTodoFormConfig({ locale, country });
  const listConfig = createTodoListConfig({ locale, country, permissions });

  return (
    <main className="flex flex-1 flex-col gap-8 py-12">
      {permissions.aCreate ? (
        <Card>
          <CardHeader>
            <CardTitle>{formConfig.title}</CardTitle>
            <CardDescription>{formConfig.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Form mutation={createTodo} config={formConfig} />
          </CardContent>
        </Card>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle>{listConfig.title}</CardTitle>
          <CardDescription>{listConfig.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <List
            query={todosQuery}
            mutations={{ aToggle: toggleTodo, aDelete: deleteTodo }}
            config={listConfig}
          />
        </CardContent>
      </Card>
    </main>
  );
}
