"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoApi } from "@/features/todo/data/api";
import { todoKeys } from "@/features/todo/data/queries";

function useInvalidateTodos() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: todoKeys.all });
}

export function useCreateTodo() {
  const invalidate = useInvalidateTodos();

  return useMutation({
    mutationFn: (payload) => todoApi.create(payload),
    onSuccess: invalidate,
  });
}

export function useToggleTodo() {
  const invalidate = useInvalidateTodos();

  return useMutation({
    mutationFn: ({ id, completed }) => todoApi.update(id, { completed }),
    onSuccess: invalidate,
  });
}

export function useDeleteTodo() {
  const invalidate = useInvalidateTodos();

  return useMutation({
    mutationFn: (id) => todoApi.remove(id),
    onSuccess: invalidate,
  });
}
