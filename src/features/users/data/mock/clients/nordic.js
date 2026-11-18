import { ACCOUNT_STATUS } from "@/features/users/constants";

/** Nordic BE user shape — accesses[] + account.statusCode */
export const NORDIC_USERS = [
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
