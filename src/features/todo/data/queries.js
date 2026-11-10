"use client";

import { useQuery } from "@tanstack/react-query";
import { todoApi } from "@/features/todo/data/api";

/** Shared query keys — mutations invalidate via these same keys. */
export const todoKeys = {
  all: ["todos"],
  list: () => [...todoKeys.all, "list"],
};

export function useTodos() {
  return useQuery({
    queryKey: todoKeys.list(),
    queryFn: todoApi.list,
  });
}
