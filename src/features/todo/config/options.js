/** Shared option lists — used by validation, form config, and list config. */

export const PRIORITIES = [
  {
    id: "low",
    title: "Low",
    description: "Nice to do when you have spare time",
  },
  {
    id: "medium",
    title: "Medium",
    description: "Should get done this week",
  },
  {
    id: "high",
    title: "High",
    description: "Needs attention soon",
  },
];

export const CATEGORIES = [
  { value: "work", label: "Work" },
  { value: "personal", label: "Personal" },
  { value: "learning", label: "Learning" },
  { value: "errands", label: "Errands" },
];

export const TAGS = [
  {
    id: "focus",
    title: "Focus",
    description: "Needs deep work / no interruptions",
  },
  {
    id: "waiting",
    title: "Waiting",
    description: "Blocked on someone else",
  },
  {
    id: "quick",
    title: "Quick win",
    description: "Can finish in under 15 minutes",
  },
];

export const PRIORITY_IDS = PRIORITIES.map((item) => item.id);
export const CATEGORY_VALUES = CATEGORIES.map((item) => item.value);
export const TAG_IDS = TAGS.map((item) => item.id);
