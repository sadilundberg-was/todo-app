import { getTranslations } from "@/i18n/getTranslations";
import en from "@/features/todo/form/i18n/en";
import sv from "@/features/todo/form/i18n/sv";

const messages = { en, sv };

export const getFormI18n = (locale) => getTranslations(messages, locale);
