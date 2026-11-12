import { todoController } from "@/server/todos/controller";

/** PATCH /api/todos/:id — update title and/or completed */
export async function PATCH(request, { params }) {
  const { id } = await params;
  return todoController.update(request, { id });
}

/** DELETE /api/todos/:id — remove a todo */
export async function DELETE(request, { params }) {
  const { id } = await params;
  return todoController.remove(request, { id });
}
