import { CLIENT } from "@/features/users/constants";
import { CLIENT_IDS } from "@/features/users/data/mock";
import { atlasUserAdapter } from "@/features/users/data/api/adapters/atlas";
import { nordicUserAdapter } from "@/features/users/data/api/adapters/nordic";

const ADAPTERS = {
  [CLIENT.NORDIC]: nordicUserAdapter,
  [CLIENT.ATLAS]: atlasUserAdapter,
};

export function getUserApiAdapter(clientId) {
  const adapter = ADAPTERS[clientId];
  if (!adapter) {
    throw new Error(`No user API adapter registered for client: ${clientId}`);
  }
  return adapter;
}

/**
 * Fake users API — adapters own BE shape → shared user.
 * Async surface matches real HTTP clients.
 */
export const userApi = {
  listClients() {
    return Promise.resolve(CLIENT_IDS.map((id) => ({ id })));
  },

  list(clientId) {
    return Promise.resolve(getUserApiAdapter(clientId).list());
  },

  getById(clientId, userId) {
    return Promise.resolve(getUserApiAdapter(clientId).getById(userId));
  },
};

/** Sync helpers for form config / schema (mock only). */
export function listUsersSync(clientId) {
  return getUserApiAdapter(clientId).list();
}

export function getUserSync(clientId, userId) {
  return getUserApiAdapter(clientId).getById(userId);
}

export { CLIENT_IDS };
