/** Atlas BE user shape — id / fullName / isActive / grants[] */
export const ATLAS_USERS = [
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
