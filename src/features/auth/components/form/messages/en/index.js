const en = {
  title: "Sign in",
  description:
    "Choose a client, then a user. Permission payloads differ per client and are mapped into UI flags after login.",
  submitLabel: "Continue",
  savingLabel: "Signing in…",
  resetLabel: "Reset",
  fields: {
    clientId: {
      label: "Client",
      description: "Which backend / tenant to sign in against.",
      placeholder: "Select a client…",
    },
    userId: {
      label: "User",
      description: "Mock user for the selected client.",
      placeholder: "Select a user…",
    },
  },
  errors: {
    clientRequired: "Please select a client",
    clientInvalid: "Invalid client",
    userRequired: "Please select a user",
    userInvalid: "Invalid user for this client",
    loginFailed: "Could not sign in with that user",
  },
};

export default en;
