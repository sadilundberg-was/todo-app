import { CLIENT } from "@/features/users/constants";
import { CLIENT_IDS } from "@/features/users/data/mock";
import { atlasUserClient } from "@/features/users/data/api/clients/atlas";
import { nordicUserClient } from "@/features/users/data/api/clients/nordic";

const ADAPTERS = {
  [CLIENT.NORDIC]: nordicUserClient,
  [CLIENT.ATLAS]: atlasUserClient,
};

export function getUserApiClient(clientId) {
  const client = ADAPTERS[clientId];
  if (!client) {
    throw new Error(`No user API client registered for client: ${clientId}`);
  }
  return client;
}

/**
 * Fake users API — clients own BE shape → shared user.
 * Async surface matches real HTTP clients.
 */
export const userApi = {
  listClients() {
    return Promise.resolve(CLIENT_IDS.map((id) => ({ id })));
  },

  list(clientId) {
    return Promise.resolve(getUserApiClient(clientId).list());
  },

  getById(clientId, userId) {
    return Promise.resolve(getUserApiClient(clientId).getById(userId));
  },
};

/** Sync helpers for form config / schema (mock only). */
export function listUsersSync(clientId) {
  return getUserApiClient(clientId).list();
}

export function getUserSync(clientId, userId) {
  return getUserApiClient(clientId).getById(userId);
}

export { CLIENT_IDS };
