const sv = {
  title: "Ny todo",
  description:
    "Exempel med Field + React Hook Form — prioritet, kategori, taggar och fäst.",
  submitLabel: "Lägg till",
  savingLabel: "Sparar…",
  resetLabel: "Återställ",
  fields: {
    title: {
      label: "Titel",
      description: "En kort, handlingsbar titel för uppgiften.",
      placeholder: "Leverera det modulära todo-exemplet",
    },
    notes: {
      label: "Anteckningar",
      description: "Valfria detaljer som hjälper dig bli klar.",
      placeholder: "Kontext, länkar eller acceptanskriterier…",
    },
    priority: {
      label: "Prioritet",
      description: "Hur bråttom är den här uppgiften?",
    },
    category: {
      label: "Kategori",
      description: "Används för att gruppera todos i listan.",
      placeholder: "Välj en kategori",
    },
    tags: {
      label: "Taggar",
      description: "Valfria etiketter för hur du vill arbeta med den.",
    },
    pinned: {
      label: "Fäst överst",
      description: "Håll den här todon ovanför resten av listan.",
    },
    costCenter: {
      label: "Kostnadsställe",
      description: "Krävs för svenska arbetsplatstodos.",
      placeholder: "t.ex. 4400",
    },
    state: {
      label: "Delstat",
      description: "Krävs för amerikanska arbetsplatstodos.",
      placeholder: "Välj en delstat",
    },
  },
  errors: {
    titleRequired: "Titel krävs",
    titleTooLong: "Titeln får vara högst 200 tecken",
    notesTooLong: "Anteckningar får vara högst 500 tecken",
    priorityRequired: "Välj en prioritet",
    priorityInvalid: "Ogiltig prioritet",
    categoryRequired: "Välj en kategori",
    categoryInvalid: "Ogiltig kategori",
    tagsTooMany: "Du kan välja högst 3 taggar",
    tagsInvalid: "Du valde en ogiltig tagg",
    costCenterRequired: "Kostnadsställe krävs",
    costCenterTooLong: "Kostnadsställe får vara högst 50 tecken",
    stateRequired: "Välj en delstat",
    stateInvalid: "Ogiltig delstat",
  },
};

export default sv;
