import { todoController } from "@/server/todos/controller";

/** GET /api/todos — list all todos */
export function GET() {
  return todoController.list();
}

/** POST /api/todos — aCreate a todo */
export function POST(request) {
  return todoController.aCreate(request);
}
