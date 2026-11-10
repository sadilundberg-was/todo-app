import { getTranslations } from "@/i18n/getTranslations";
import en from "@/features/todo/form/schema/i18n/en";
import sv from "@/features/todo/form/schema/i18n/sv";

const messages = { en, sv };

export const getFormErrorsI18n = (locale) => getTranslations(messages, locale);
