import { api } from "@/utils/api";

function fromNordic(remote) {
  return {
    id: remote.id,
    title: remote.title ?? "",
    notes: remote.notes ?? "",
    priority: remote.priority ?? "medium",
    category: remote.category ?? "",
    tags: Array.isArray(remote.tags) ? remote.tags : [],
    pinned: Boolean(remote.pinned),
    completed: Boolean(remote.completed),
    costCenter: remote.costCenter ?? "",
    state: remote.state ?? "",
  };
}

function toNordic(todo) {
  const body = {};
  if (todo.title !== undefined) body.title = todo.title;
  if (todo.notes !== undefined) body.notes = todo.notes;
  if (todo.priority !== undefined) body.priority = todo.priority;
  if (todo.category !== undefined) body.category = todo.category;
  if (todo.tags !== undefined) body.tags = todo.tags;
  if (todo.pinned !== undefined) body.pinned = Boolean(todo.pinned);
  if (todo.completed !== undefined) body.completed = Boolean(todo.completed);
  if (todo.costCenter !== undefined) body.costCenter = todo.costCenter;
  if (todo.state !== undefined) body.state = todo.state;
  return body;
}

export const nordicTodoAdapter = {
  async list() {
    const remote = await api.get("/api/todos");
    return remote.map(fromNordic);
  },

  async create(todo) {
    const remote = await api.post("/api/todos", toNordic(todo));
    return fromNordic(remote);
  },

  async update(id, patch) {
    const remote = await api.patch(`/api/todos/${id}`, toNordic(patch));
    return fromNordic(remote);
  },

  async remove(id) {
    await api.delete(`/api/todos/${id}`);
  },
};
