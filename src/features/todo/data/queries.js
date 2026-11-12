"use client";

import { useQuery } from "@tanstack/react-query";
import { getTodoApiAdapter } from "@/features/todo/data/api";
import { useAuth } from "@/hooks/useAuth";
import { todoKeys } from "@/features/todo/data/keys";

export function useTodos() {
  const { clientId } = useAuth();

  return useQuery({
    queryKey: todoKeys.list(clientId),
    queryFn: () => getTodoApiAdapter(clientId).list(),
    enabled: Boolean(clientId),
  });
}
