import { CLIENT } from "@/features/users/constants";
import { atlasTodoPermissions } from "@/features/todo/data/permissions/clients/atlas";
import { nordicTodoPermissions } from "@/features/todo/data/permissions/clients/nordic";

const NO_ACCESS = {
  aCreate: false,
  aEdit: false,
  aToggle: false,
  aDelete: false,
};

const CLIENTS = {
  [CLIENT.NORDIC]: nordicTodoPermissions,
  [CLIENT.ATLAS]: atlasTodoPermissions,
};

export function getTodoPermissionsClient(clientId) {
  return CLIENTS[clientId] ?? null;
}

export function getTodoPermissions(user, clientId) {
  const client = getTodoPermissionsClient(clientId);
  if (!client) return NO_ACCESS;
  return client.resolve(user);
}
