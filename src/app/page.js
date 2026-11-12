"use client";

import { Button } from "@/components/ui/button";
import { getClientLabel } from "@/features/auth/components/options";
import { LoginPage } from "@/features/auth/views/login";
import { TodoPage } from "@/features/todo/views";
import { useAuth } from "@/hooks/useAuth";
import { getLocale } from "@/utils/locale";

/**
 * App Router pages stay thin.
 * Auth gate → feature view.
 */
export default function Home() {
  const { user, clientId, isAuthenticated, logout } = useAuth();
  const locale = getLocale();
  const clientLabel = getClientLabel(clientId, locale);

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <>
      <header className="border-b border-zinc-200">
        <div className="flex items-center justify-between gap-3 py-3">
          <p className="text-sm text-zinc-600">
            <span className="font-medium text-zinc-900">
              {user.displayName}
            </span>
            {clientLabel ? (
              <span className="text-zinc-400"> · {clientLabel}</span>
            ) : null}
          </p>
          <Button type="button" variant="outline" size="sm" onClick={logout}>
            Log out
          </Button>
        </div>
      </header>
      <TodoPage />
    </>
  );
}
