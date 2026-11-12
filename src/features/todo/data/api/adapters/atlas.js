import { api } from "@/utils/api";

function asAtlasRemote(row) {
  return {
    todoId: row.id,
    label: row.title,
    description: row.notes ?? "",
    priorityCode: row.priority ?? "medium",
    folder: row.category ?? "",
    labels: Array.isArray(row.tags) ? row.tags : [],
    isStarred: Boolean(row.pinned),
    status: row.completed ? "DONE" : "OPEN",
    meta: {
      costCenter: row.costCenter ?? "",
      region: row.state ?? "",
    },
  };
}

function fromAtlas(remote) {
  return {
    id: remote.todoId,
    title: remote.label ?? "",
    notes: remote.description ?? "",
    priority: remote.priorityCode ?? "medium",
    category: remote.folder ?? "",
    tags: Array.isArray(remote.labels) ? remote.labels : [],
    pinned: Boolean(remote.isStarred),
    completed: remote.status === "DONE",
    costCenter: remote.meta?.costCenter ?? "",
    state: remote.meta?.region ?? "",
  };
}

function toAtlas(todo) {
  const body = {};

  if (todo.title !== undefined) body.label = todo.title;
  if (todo.notes !== undefined) body.description = todo.notes;
  if (todo.priority !== undefined) body.priorityCode = todo.priority;
  if (todo.category !== undefined) body.folder = todo.category;
  if (todo.tags !== undefined) body.labels = todo.tags;
  if (todo.pinned !== undefined) body.isStarred = Boolean(todo.pinned);
  if (todo.completed !== undefined) {
    body.status = todo.completed ? "DONE" : "OPEN";
  }
  if (todo.costCenter !== undefined || todo.state !== undefined) {
    body.meta = {
      ...(todo.costCenter !== undefined
        ? { costCenter: todo.costCenter }
        : {}),
      ...(todo.state !== undefined ? { region: todo.state } : {}),
    };
  }

  return body;
}

function atlasBodyToShared(body) {
  const data = {};
  if (body.label !== undefined) data.title = body.label;
  if (body.description !== undefined) data.notes = body.description;
  if (body.priorityCode !== undefined) data.priority = body.priorityCode;
  if (body.folder !== undefined) data.category = body.folder;
  if (body.labels !== undefined) data.tags = body.labels;
  if (body.isStarred !== undefined) data.pinned = body.isStarred;
  if (body.status !== undefined) data.completed = body.status === "DONE";
  if (body.meta?.costCenter !== undefined) {
    data.costCenter = body.meta.costCenter;
  }
  if (body.meta?.region !== undefined) data.state = body.meta.region;
  return data;
}

export const atlasTodoAdapter = {
  async list() {
    const rows = await api.get("/api/todos");
    return rows.map((row) => fromAtlas(asAtlasRemote(row)));
  },

  async create(todo) {
    const atlasBody = toAtlas(todo);
    const row = await api.post("/api/todos", atlasBodyToShared(atlasBody));
    return fromAtlas(asAtlasRemote(row));
  },

  async update(id, patch) {
    const atlasBody = toAtlas(patch);
    const row = await api.patch(
      `/api/todos/${id}`,
      atlasBodyToShared(atlasBody),
    );
    return fromAtlas(asAtlasRemote(row));
  },

  async remove(id) {
    await api.delete(`/api/todos/${id}`);
  },
};
