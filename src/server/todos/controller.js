import { NextResponse } from "next/server";
import { todoService } from "@/server/todos/service";
import { aCreateTodoPayloadSchema } from "@/server/todos/validation";
import { getCountry } from "@/utils/locale";

const todoPayloadSchema = aCreateTodoPayloadSchema(getCountry());

/**
 * Todo controller — HTTP boundary.
 *
 * Responsibilities:
 * 1. Parse / validate the request
 * 2. Call the service
 * 3. Shape the HTTP response
 *
 * Route files stay thin: they only wire verbs → controller methods.
 */
function badRequest(message) {
  return NextResponse.json({ error: message }, { status: 400 });
}

function notFound(message = "Todo not found") {
  return NextResponse.json({ error: message }, { status: 404 });
}

export const todoController = {
  async list() {
    const todos = await todoService.list();
    return NextResponse.json(todos);
  },

  async aCreate(request) {
    const body = await request.json();
    const parsed = todoPayloadSchema.safeParse(body);

    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message ?? "Invalid todo payload";
      return badRequest(message);
    }

    const todo = await todoService.aCreate(parsed.data);
    return NextResponse.json(todo, { status: 201 });
  },

  async update(request, { id }) {
    const existing = await todoService.getById(id);
    if (!existing) return notFound();

    const body = await request.json();
    const data = {};

    if (typeof body?.title === "string") {
      const title = body.title.trim();
      if (!title) return badRequest("Title cannot be empty");
      if (title.length > 200) {
        return badRequest("Title must be 200 characters or fewer");
      }
      data.title = title;
    }

    if (typeof body?.notes === "string") {
      data.notes = body.notes.trim();
    }

    if (typeof body?.priority === "string") {
      data.priority = body.priority;
    }

    if (typeof body?.category === "string") {
      data.category = body.category;
    }

    if (Array.isArray(body?.tags)) {
      data.tags = body.tags;
    }

    if (typeof body?.pinned === "boolean") {
      data.pinned = body.pinned;
    }

    if (typeof body?.completed === "boolean") {
      data.completed = body.completed;
    }

    if (typeof body?.costCenter === "string") {
      data.costCenter = body.costCenter.trim();
    }

    if (typeof body?.state === "string") {
      data.state = body.state.trim();
    }

    if (Object.keys(data).length === 0) {
      return badRequest("No valid fields to update");
    }

    const todo = await todoService.update(id, data);
    return NextResponse.json(todo);
  },

  async remove(_request, { id }) {
    const existing = await todoService.getById(id);
    if (!existing) return notFound();

    await todoService.remove(id);
    return new NextResponse(null, { status: 204 });
  },
};
