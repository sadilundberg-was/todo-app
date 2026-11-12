import { USER_STATUS } from "@/features/users/constants";
import { ATLAS_USERS } from "@/features/users/data/mock/atlas";

/**
 * Atlas BE → shared app user.
 */
export function fromAtlas(remote) {
  const isActive = remote.isActive === true;

  return {
    id: remote.id,
    displayName: remote.fullName ?? "Unknown",
    status: isActive ? USER_STATUS.ACTIVE : USER_STATUS.INACTIVE,
    isActive,
    grants: remote.grants ?? [],
  };
}

export const atlasUserAdapter = {
  list() {
    return ATLAS_USERS.map(fromAtlas);
  },

  getById(id) {
    const remote = ATLAS_USERS.find((user) => user.id === id);
    return remote ? fromAtlas(remote) : null;
  },
};
