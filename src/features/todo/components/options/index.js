import { optionsMessages } from "@/features/todo/components/options/messages";
import { getMessages } from "@/utils/i18n";
import { DEFAULT_LOCALE } from "@/utils/locale";

/** Stable option ids — display text comes from options/messages. */

export const PRIORITY_IDS = ["low", "medium", "high"];
export const CATEGORY_IDS = ["work", "personal", "learning", "errands"];
export const TAG_IDS = ["focus", "waiting", "quick"];
export const STATE_IDS = ["CA", "NY", "TX"];

function mapOptions(ids, labels) {
  return ids.map((id) => ({
    id,
    title: labels[id].title,
    description: labels[id].description,
  }));
}

export function getTodoOptions(locale = DEFAULT_LOCALE) {
  const t = getMessages(optionsMessages, locale);
  return {
    priorities: mapOptions(PRIORITY_IDS, t.priorities),
    categories: mapOptions(CATEGORY_IDS, t.categories),
    tags: mapOptions(TAG_IDS, t.tags),
    states: mapOptions(STATE_IDS, t.states),
  };
}
