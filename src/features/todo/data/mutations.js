"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getTodoApiClient } from "@/features/todo/data/api";
import { todoKeys } from "@/features/todo/data/keys";
import { useAuth } from "@/hooks/useAuth";

function useTodoMutation() {
  const queryClient = useQueryClient();
  const { clientId } = useAuth();

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: todoKeys.list(clientId) });

  return { clientId, invalidate };
}

export function useCreateTodo() {
  const { clientId, invalidate } = useTodoMutation();

  return useMutation({
    mutationFn: (payload) => getTodoApiClient(clientId).create(payload),
    onSuccess: invalidate
  });
}

export function useToggleTodo() {
  const { clientId, invalidate } = useTodoMutation();

  return useMutation({
    mutationFn: ({ id, completed }) =>
      getTodoApiClient(clientId).update(id, { completed }),
    onSuccess: invalidate
  });
}

export function useDeleteTodo() {
  const { clientId, invalidate } = useTodoMutation();

  return useMutation({
    mutationFn: (id) => getTodoApiClient(clientId).remove(id),
    onSuccess: invalidate
  });
}