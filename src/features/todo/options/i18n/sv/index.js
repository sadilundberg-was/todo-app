const sv = {
  priorities: {
    low: {
      title: "Låg",
      description: "Gör när du har tid över",
    },
    medium: {
      title: "Medel",
      description: "Bör göras den här veckan",
    },
    high: {
      title: "Hög",
      description: "Behöver uppmärksamhet snart",
    },
  },
  categories: {
    work: { title: "Jobb" },
    personal: { title: "Privat" },
    learning: { title: "Lärande" },
    errands: { title: "Ärenden" },
  },
  tags: {
    focus: {
      title: "Fokus",
      description: "Kräver ostört djuparbete",
    },
    waiting: {
      title: "Väntar",
      description: "Blockerad av någon annan",
    },
    quick: {
      title: "Snabbt",
      description: "Klart på under 15 minuter",
    },
  },
  states: {
    CA: { title: "Kalifornien" },
    NY: { title: "New York" },
    TX: { title: "Texas" },
  },
};

export default sv;
