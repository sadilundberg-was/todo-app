import { CLIENT } from "@/features/users/constants";
import { ATLAS_USERS } from "@/features/users/data/mock/atlas";
import { NORDIC_USERS } from "@/features/users/data/mock/nordic";

export const CLIENTS = [
  { id: CLIENT.NORDIC, users: NORDIC_USERS },
  { id: CLIENT.ATLAS, users: ATLAS_USERS },
];

export const CLIENT_IDS = CLIENTS.map((client) => client.id);

export function getClient(clientId) {
  return CLIENTS.find((client) => client.id === clientId) ?? null;
}

export function listRawUsers(clientId) {
  return getClient(clientId)?.users ?? [];
}
