import { CLIENT } from "@/features/users/constants";
import { atlasTodoClient } from "@/features/todo/data/api/clients/atlas";
import { nordicTodoClient } from "@/features/todo/data/api/clients/nordic";

const ADAPTERS = {
  [CLIENT.NORDIC]: nordicTodoClient,
  [CLIENT.ATLAS]: atlasTodoClient,
};


export function getTodoApiClient(clientId) {
  const client = ADAPTERS[clientId];
  if (!client) {
    throw new Error(`No todo API client registered for client: ${clientId}`);
  }
  return client;
}
