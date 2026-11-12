const sv = {
  title: "Logga in",
  description:
    "Välj klient och sedan användare. Behörigheter skiljer sig per klient och mappas till UI-flaggor efter inloggning.",
  submitLabel: "Fortsätt",
  savingLabel: "Loggar in…",
  resetLabel: "Återställ",
  fields: {
    clientId: {
      label: "Klient",
      description: "Vilken backend / tenant du loggar in mot.",
      placeholder: "Välj en klient…",
    },
    userId: {
      label: "Användare",
      description: "Mockad användare för vald klient.",
      placeholder: "Välj en användare…",
    },
  },
  errors: {
    clientRequired: "Välj en klient",
    clientInvalid: "Ogiltig klient",
    userRequired: "Välj en användare",
    userInvalid: "Ogiltig användare för denna klient",
    userInactive: "Detta konto är avstängt eller inaktivt",
    loginFailed: "Kunde inte logga in med den användaren",
  },
};

export default sv;
