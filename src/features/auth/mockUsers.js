/**
 * Mock users per client — each client has a different BE user shape.
 * Todo permissions map those shapes in features/todo/data/permissions.js.
 */

export const ACCOUNT_STATUS = {
  ACTIVE: "ACTIVE",
  SUSPENDED: "SUSPENDED",
};

export const CLIENT = {
  NORDIC: "nordic",
  ATLAS: "atlas",
};

/** Client A — accesses[] + account.statusCode, levels R / RW / RWD */
const NORDIC_USERS = [
  {
    userId: "usr_viewer_01",
    identity: { givenName: "Vera", familyName: "Viewer" },
    account: { statusCode: ACCOUNT_STATUS.ACTIVE },
    accesses: [{ resource: "todo.list", level: "R" }],
  },
  {
    userId: "usr_editor_02",
    identity: { givenName: "Eddie", familyName: "Editor" },
    account: { statusCode: ACCOUNT_STATUS.ACTIVE },
    accesses: [
      { resource: "todo.list", level: "R" },
      { resource: "todo.item", level: "RW" },
    ],
  },
  {
    userId: "usr_admin_03",
    identity: { givenName: "Ada", familyName: "Admin" },
    account: { statusCode: ACCOUNT_STATUS.ACTIVE },
    accesses: [
      { resource: "todo.list", level: "R" },
      { resource: "todo.item", level: "RWD" },
    ],
  },
  {
    userId: "usr_suspended_04",
    identity: { givenName: "Sam", familyName: "Suspended" },
    account: { statusCode: ACCOUNT_STATUS.SUSPENDED },
    accesses: [
      { resource: "todo.list", level: "R" },
      { resource: "todo.item", level: "RWD" },
    ],
  },
];

/**
 * Client B — completely different shape:
 * - id / fullName / isActive
 * - grants: string[] like "TODO_CREATE", "TODO_COMPLETE", "TODO_DELETE"
 */
const ATLAS_USERS = [
  {
    id: "atl_readonly_01",
    fullName: "Riley ReadOnly",
    isActive: true,
    grants: [],
  },
  {
    id: "atl_writer_02",
    fullName: "Wendy Writer",
    isActive: true,
    grants: ["TODO_CREATE", "TODO_EDIT", "TODO_COMPLETE"],
  },
  {
    id: "atl_manager_03",
    fullName: "Morgan Manager",
    isActive: true,
    grants: ["TODO_CREATE", "TODO_EDIT", "TODO_COMPLETE", "TODO_DELETE"],
  },
  {
    id: "atl_disabled_04",
    fullName: "Dana Disabled",
    isActive: false,
    grants: ["TODO_CREATE", "TODO_EDIT", "TODO_COMPLETE", "TODO_DELETE"],
  },
];

/** Client ids only — display labels live in options messages (i18n). */
export const CLIENTS = [
  {
    id: CLIENT.NORDIC,
    users: NORDIC_USERS,
  },
  {
    id: CLIENT.ATLAS,
    users: ATLAS_USERS,
  },
];

export function getClient(clientId) {
  return CLIENTS.find((client) => client.id === clientId) ?? null;
}

export function getClientUsers(clientId) {
  return getClient(clientId)?.users ?? [];
}

export function findMockUser(clientId, userId) {
  return (
    getClientUsers(clientId).find((user) => getUserId(user) === userId) ?? null
  );
}

export function getUserId(user) {
  return user?.userId ?? user?.id ?? null;
}

export function getUserDisplayName(user) {
  if (!user) return "Unknown";
  if (user.identity) {
    return `${user.identity.givenName} ${user.identity.familyName}`;
  }
  if (user.fullName) return user.fullName;
  return "Unknown";
}

export function getUserStatusLabel(user) {
  if (!user) return "";
  if (user.account?.statusCode) return user.account.statusCode;
  if (typeof user.isActive === "boolean") {
    return user.isActive ? "ACTIVE" : "INACTIVE";
  }
  return "";
}
