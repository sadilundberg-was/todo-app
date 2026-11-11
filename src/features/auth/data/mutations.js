"use client";

import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { formMessages } from "@/features/auth/components/form/messages";
import { getMessages } from "@/utils/i18n";
import { getLocale } from "@/utils/locale";

export function useLogin() {
  const { login } = useAuth();

  return useMutation({
    mutationFn: ({ clientId, userId }) => {
      const ok = login(clientId, userId);
      if (!ok) {
        const t = getMessages(formMessages, getLocale());
        throw new Error(t.errors.loginFailed);
      }
      return { clientId, userId };
    },
  });
}
