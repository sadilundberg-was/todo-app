"use client";

import { useAuth } from "@/hooks/useAuth";

export function usePermissions(resolve) {
  const { user, clientId } = useAuth();
  return resolve(user, clientId);
}
