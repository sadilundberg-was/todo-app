const en = {
  title: "New todo",
  description:
    "Complex Field + React Hook Form example — priority, category, tags, and pin.",
  submitLabel: "Add todo",
  savingLabel: "Saving…",
  resetLabel: "Reset",
  fields: {
    title: {
      label: "Title",
      description: "A short, actionable title for the task.",
      placeholder: "Ship the modular todo example",
    },
    notes: {
      label: "Notes",
      description: "Optional details that help you finish the task.",
      placeholder: "Context, links, or acceptance criteria…",
    },
    priority: {
      label: "Priority",
      description: "How urgent is this task?",
    },
    category: {
      label: "Category",
      description: "Used to group todos in the list.",
      placeholder: "Select a category",
    },
    tags: {
      label: "Tags",
      description:
        "Optional labels that describe how you want to work on this.",
    },
    pinned: {
      label: "Pin to top",
      description: "Keep this todo above the rest of the list.",
    },
    costCenter: {
      label: "Cost center",
      description: "Required for Swedish workplace todos.",
      placeholder: "e.g. 4400",
    },
    state: {
      label: "State",
      description: "Required for US workplace todos.",
      placeholder: "Select a state",
    },
  },
  errors: {
    titleRequired: "Title is required",
    titleTooLong: "Title must be 200 characters or fewer",
    notesTooLong: "Notes must be 500 characters or fewer",
    priorityRequired: "Please select a priority",
    priorityInvalid: "Invalid priority",
    categoryRequired: "Please select a category",
    categoryInvalid: "Invalid category",
    tagsTooMany: "You can select up to 3 tags",
    tagsInvalid: "You selected an invalid tag",
    costCenterRequired: "Cost center is required",
    costCenterTooLong: "Cost center must be 50 characters or fewer",
    stateRequired: "Please select a state",
    stateInvalid: "Invalid state",
  },
};

export default en;
