import { getTranslations } from "@/i18n/getTranslations";
import en from "@/features/todo/form/fields/SE/i18n/en";
import sv from "@/features/todo/form/fields/SE/i18n/sv";

const messages = { en, sv };

export const getSEFieldsI18n = (locale) => getTranslations(messages, locale);
