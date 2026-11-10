import { getTranslations } from "@/i18n/getTranslations";
import { DEFAULT_LOCALE } from "@/i18n/locale";
import en from "@/features/todo/options/i18n/en";
import sv from "@/features/todo/options/i18n/sv";

/** Stable option ids — display text comes from options/i18n. */

export const PRIORITY_IDS = ["low", "medium", "high"];
export const CATEGORY_IDS = ["work", "personal", "learning", "errands"];
export const TAG_IDS = ["focus", "waiting", "quick"];
export const STATE_IDS = ["CA", "NY", "TX"];

const messages = { en, sv };

function mapOptions(ids, copy) {
  return ids.map((id) => ({
    id,
    title: copy[id].title,
    description: copy[id].description,
  }));
}

export function getTodoOptions(locale = DEFAULT_LOCALE) {
  const optionsCopy = getTranslations(messages, locale);
  return {
    priorities: mapOptions(PRIORITY_IDS, optionsCopy.priorities),
    categories: mapOptions(CATEGORY_IDS, optionsCopy.categories),
    tags: mapOptions(TAG_IDS, optionsCopy.tags),
    states: mapOptions(STATE_IDS, optionsCopy.states),
  };
}
