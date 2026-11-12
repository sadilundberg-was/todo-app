import { optionsMessages } from "@/features/auth/components/options/messages";
import { CLIENT_IDS, listUsersSync } from "@/features/users/data/api";
import { getMessages } from "@/utils/i18n";
import { DEFAULT_LOCALE } from "@/utils/locale";

export { CLIENT_IDS };

export function getAuthOptions(locale = DEFAULT_LOCALE) {
  const t = getMessages(optionsMessages, locale);

  return {
    clients: CLIENT_IDS.map((id) => ({
      id,
      title: t.clients[id] ?? id,
    })),
  };
}

export function getAuthUserOptions(clientId, locale = DEFAULT_LOCALE) {
  if (!clientId) return [];

  const t = getMessages(optionsMessages, locale);

  return listUsersSync(clientId).map((user) => {
    const statusLabel = user.status ? (t.status[user.status] ?? user.status) : "";

    return {
      id: user.id,
      title: statusLabel
        ? `${user.displayName} (${statusLabel})`
        : user.displayName,
    };
  });
}

export function getClientLabel(clientId, locale = DEFAULT_LOCALE) {
  if (!clientId) return null;
  const t = getMessages(optionsMessages, locale);
  return t.clients[clientId] ?? clientId;
}
