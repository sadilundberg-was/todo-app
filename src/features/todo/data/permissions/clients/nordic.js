
const NO_ACCESS = {
  aCreate: false,
  aEdit: false,
  aToggle: false,
  aDelete: false,
};

export const nordicTodoPermissions = {
  resolve(user) {
    if (!user?.isActive) return NO_ACCESS;

    const entry = user.accesses?.find(
      (access) => access.resource === "todo.item",
    );
    const level = entry?.level ?? "";
    const canWrite = level.includes("W");
    const canDelete = level.includes("D");

    return {
      aCreate: canWrite,
      aEdit: canWrite,
      aToggle: canWrite,
      aDelete: canDelete,
    };
  },
};
