import { ACCOUNT_STATUS, USER_STATUS } from "@/features/users/constants";
import { NORDIC_USERS } from "@/features/users/data/mock/clients/nordic";

/**
 * Nordic BE → shared app user.
 */
export function fromNordic(remote) {
  const status = remote.account?.statusCode ?? USER_STATUS.INACTIVE;

  return {
    id: remote.userId,
    displayName: remote.identity
      ? `${remote.identity.givenName} ${remote.identity.familyName}`
      : "Unknown",
    status,
    isActive: status === ACCOUNT_STATUS.ACTIVE,
    accesses: remote.accesses ?? [],
  };
}

export const nordicUserClient = {
  list() {
    return NORDIC_USERS.map(fromNordic);
  },

  getById(id) {
    const remote = NORDIC_USERS.find((user) => user.userId === id);
    return remote ? fromNordic(remote) : null;
  },
};
