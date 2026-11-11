import { api } from "@/utils/api";

export const todoApi = {
  list: () => api.get("/api/todos"),
  aCreate: (payload) => api.post("/api/todos", payload),
  update: (id, data) => api.patch(`/api/todos/${id}`, data),
  remove: (id) => api.delete(`/api/todos/${id}`),
};
