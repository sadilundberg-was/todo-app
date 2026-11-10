import { DEFAULT_LOCALE } from "@/i18n/locale";

export function getTranslations(messages, locale = DEFAULT_LOCALE) {
  return messages[locale] ?? messages[DEFAULT_LOCALE];
}
