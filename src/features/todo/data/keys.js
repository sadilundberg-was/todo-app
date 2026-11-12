export const todoKeys = {
    all: ["todos"],
    list: (clientId) => [...todoKeys.all, "list", clientId],
  };