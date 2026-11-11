import { ACCOUNT_STATUS, CLIENT } from "@/features/auth/mockUsers";

const NO_ACCESS = {
  aCreate: false,
  aEdit: false,
  aToggle: false,
  aDelete: false,
};

function resolveNordicPermissions(user) {
  if (!user) return NO_ACCESS;
  if (user.account?.statusCode !== ACCOUNT_STATUS.ACTIVE) return NO_ACCESS;

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
}

function resolveAtlasPermissions(user) {
  if (!user?.isActive) return NO_ACCESS;

  const grants = new Set(user.grants ?? []);

  return {
    aCreate: grants.has("TODO_CREATE"),
    aEdit: grants.has("TODO_EDIT"),
    aToggle: grants.has("TODO_COMPLETE"),
    aDelete: grants.has("TODO_DELETE"),
  };
}

export function resolveTodoPermissions(user, clientId) {
  if (clientId === CLIENT.ATLAS) return resolveAtlasPermissions(user);
  if (clientId === CLIENT.NORDIC) return resolveNordicPermissions(user);
  return NO_ACCESS;
}

export function getTodoPermissions(user, clientId) {
  return resolveTodoPermissions(user, clientId);
}
