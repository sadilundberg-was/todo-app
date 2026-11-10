import { getTranslations } from "@/i18n/getTranslations";
import en from "@/features/todo/form/fields/i18n/en";
import sv from "@/features/todo/form/fields/i18n/sv";

const messages = { en, sv };

export const getFieldsI18n = (locale) => getTranslations(messages, locale);
