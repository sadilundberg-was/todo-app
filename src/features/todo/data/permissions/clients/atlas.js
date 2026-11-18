
const NO_ACCESS = {
  aCreate: false,
  aEdit: false,
  aToggle: false,
  aDelete: false,
};

export const atlasTodoPermissions = {
  resolve(user) {
    if (!user?.isActive) return NO_ACCESS;

    const grants = new Set(user.grants ?? []);

    return {
      aCreate: grants.has("TODO_CREATE"),
      aEdit: grants.has("TODO_EDIT"),
      aToggle: grants.has("TODO_COMPLETE"),
      aDelete: grants.has("TODO_DELETE"),
    };
  },
};
