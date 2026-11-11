import { todoController } from "@/server/todos/controller";

/** PATCH /api/todos/:id — update title and/or completed */
export async function PATCH(request, { params }) {
  const { id } = await params;
  return todoController.update(request, { id });
}

/** aDelete /api/todos/:id — remove a todo */
export async function aDelete(request, { params }) {
  const { id } = await params;
  return todoController.remove(request, { id });
}
