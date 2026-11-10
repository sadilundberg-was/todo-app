import { getTranslations } from "@/i18n/getTranslations";
import en from "@/features/todo/list/i18n/en";
import sv from "@/features/todo/list/i18n/sv";

const messages = { en, sv };

export const getListI18n = (locale) => getTranslations(messages, locale);
