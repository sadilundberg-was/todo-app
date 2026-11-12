import {
  getAuthOptions,
  getAuthUserOptions,
} from "@/features/auth/components/options";
import { formMessages } from "@/features/auth/components/form/messages";
import { createLoginFormValidation } from "@/features/auth/components/form/schema";
import { getMessages } from "@/utils/i18n";
import { DEFAULT_LOCALE } from "@/utils/locale";

export function createLoginFormConfig({ locale = DEFAULT_LOCALE } = {}) {
  const t = getMessages(formMessages, locale);
  const { clients } = getAuthOptions(locale);

  return {
    title: t.title,
    description: t.description,
    submitLabel: t.submitLabel,
    savingLabel: t.savingLabel,
    resetLabel: t.resetLabel,
    validation: createLoginFormValidation(t),
    fields: [
      {
        accessor: "clientId",
        label: t.fields.clientId.label,
        description: t.fields.clientId.description,
        type: "select",
        placeholder: t.fields.clientId.placeholder,
        options: clients,
        defaultValue: "",
        resets: ["userId"],
      },
      {
        accessor: "userId",
        label: t.fields.userId.label,
        description: t.fields.userId.description,
        type: "select",
        placeholder: t.fields.userId.placeholder,
        defaultValue: "",
        getOptions: (values) => getAuthUserOptions(values?.clientId, locale),
        getDisabled: (values) => !values?.clientId,
      },
    ],
  };
}
