import { prisma } from "@/server/db/prisma";

function serializeTags(tags) {
  return JSON.stringify(Array.isArray(tags) ? tags : []);
}

function parseTags(raw) {
  try {
    const parsed = JSON.parse(raw ?? "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function toTodo(record) {
  if (!record) return null;
  return {
    ...record,
    tags: parseTags(record.tags),
  };
}

/**
 * Todo service — pure business / data logic.
 *
 * Controllers talk HTTP. Services talk Prisma.
 * Keep this layer free of Request/Response objects so it stays testable.
 */
export const todoService = {
  async list() {
    const todos = await prisma.todo.findMany({
      orderBy: [{ pinned: "desc" }, { createdAt: "desc" }],
    });
    return todos.map(toTodo);
  },

  async getById(id) {
    const todo = await prisma.todo.findUnique({ where: { id } });
    return toTodo(todo);
  },

  async create({
    title,
    notes = "",
    priority,
    category,
    tags = [],
    pinned = false,
    costCenter = "",
    state = "",
  }) {
    const todo = await prisma.todo.create({
      data: {
        title: title.trim(),
        notes: notes?.trim() ?? "",
        priority,
        category,
        tags: serializeTags(tags),
        pinned,
        costCenter: costCenter?.trim() ?? "",
        state: state?.trim() ?? "",
      },
    });
    return toTodo(todo);
  },

  async update(id, data) {
    const payload = { ...data };
    if (Array.isArray(payload.tags)) {
      payload.tags = serializeTags(payload.tags);
    }

    const todo = await prisma.todo.update({
      where: { id },
      data: payload,
    });
    return toTodo(todo);
  },

  remove(id) {
    return prisma.todo.delete({ where: { id } });
  },
};
