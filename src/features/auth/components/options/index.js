import {
  CLIENTS,
  getClientUsers,
  getUserDisplayName,
  getUserId,
  getUserStatusLabel,
} from "@/features/auth/mockUsers";
import { optionsMessages } from "@/features/auth/components/options/messages";
import { getMessages } from "@/utils/i18n";
import { DEFAULT_LOCALE } from "@/utils/locale";

export const CLIENT_IDS = CLIENTS.map((client) => client.id);

export function getAuthOptions(locale = DEFAULT_LOCALE) {
  const t = getMessages(optionsMessages, locale);

  return {
    clients: CLIENTS.map((client) => ({
      id: client.id,
      title: t.clients[client.id] ?? client.id,
    })),
  };
}

export function getAuthUserOptions(clientId, locale = DEFAULT_LOCALE) {
  const t = getMessages(optionsMessages, locale);

  return getClientUsers(clientId).map((user) => {
    const status = getUserStatusLabel(user);
    const statusLabel = status ? (t.status[status] ?? status) : "";
    const name = getUserDisplayName(user);

    return {
      id: getUserId(user),
      title: statusLabel ? `${name} (${statusLabel})` : name,
    };
  });
}

export function getClientLabel(clientId, locale = DEFAULT_LOCALE) {
  if (!clientId) return null;
  const t = getMessages(optionsMessages, locale);
  return t.clients[clientId] ?? clientId;
}
