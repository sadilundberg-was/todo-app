"use client";

import { Form } from "@/components/Form";
import { createLoginFormConfig } from "@/features/auth/components/form/config";
import { useLogin } from "@/features/auth/data/mutations";
import { getLocale } from "@/utils/locale";

export function LoginPage() {
  const login = useLogin();
  const locale = getLocale();
  const formConfig = createLoginFormConfig({ locale });

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 py-12">
      <Form mutation={login} config={formConfig} />
    </main>
  );
}
