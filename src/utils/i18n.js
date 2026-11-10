import { DEFAULT_LOCALE } from "@/utils/locale";

export function getMessages(messages, locale = DEFAULT_LOCALE) {
  return messages[locale] ?? messages[DEFAULT_LOCALE];
}
