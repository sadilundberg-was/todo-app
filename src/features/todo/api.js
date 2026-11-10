import { api } from "@/utils/api";

/**
 * Feature API — thin wrappers around the shared client.
 *
 * React Query hooks import from here, never from `@/utils/api` directly.
 * That keeps endpoint paths and payloads owned by the feature.
 */
export const todoApi = {
  list: () => api.get("/api/todos"),
  create: (payload) => api.post("/api/todos", payload),
  update: (id, data) => api.patch(`/api/todos/${id}`, data),
  remove: (id) => api.delete(`/api/todos/${id}`),
};
