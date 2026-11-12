import { CLIENT } from "@/features/auth/mockUsers";
import { atlasTodoAdapter } from "@/features/todo/data/api/adapters/atlas";
import { nordicTodoAdapter } from "@/features/todo/data/api/adapters/nordic";

const ADAPTERS = {
  [CLIENT.NORDIC]: nordicTodoAdapter,
  [CLIENT.ATLAS]: atlasTodoAdapter,
};


export function getTodoApiAdapter(clientId) {
  const adapter = ADAPTERS[clientId];
  if (!adapter) {
    throw new Error(`No todo API adapter registered for client: ${clientId}`);
  }
  return adapter;
}
