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
import {
  createTodoFormSchema,
  todoListSchema,
} from "@/features/todo/config";
import {
  useCreateTodo,
  useDeleteTodo,
  useToggleTodo,
} from "@/features/todo/mutations";
import { useTodos } from "@/features/todo/queries";

/**
 * Feature view — wires query/mutations into shared Form + List via config.
 */
export function TodoPage() {
  const createTodo = useCreateTodo();
  const todosQuery = useTodos();
  const toggleTodo = useToggleTodo();
  const deleteTodo = useDeleteTodo();

  return (
    <main className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-8 px-4 py-12">
      <Card className="w-full">
        <CardContent className="pt-6">
          <Form mutation={createTodo} schema={createTodoFormSchema} />
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>{todoListSchema.title}</CardTitle>
          <CardDescription>{todoListSchema.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <List
            query={todosQuery}
            mutations={{ toggle: toggleTodo, delete: deleteTodo }}
            schema={todoListSchema}
          />
        </CardContent>
      </Card>
    </main>
  );
}
