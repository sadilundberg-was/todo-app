import { CLIENT } from "@/features/users/constants";
import { atlasTodoPermissions } from "@/features/todo/data/permissions/clients/atlas";
import { nordicTodoPermissions } from "@/features/todo/data/permissions/clients/nordic";
import { NO_ACCESS } from "@/features/todo/data/permissions/shared";

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
