export const SIDEBAR_ITEMS = [
  {
    label: "Profile",
    path: "/",
    permission: null,
  },
  {
    label: "Admin",
    permission: "admin.view",
    children: [
      {
        label: "Users",
        path: "/admin/users",
        permission: "admin.users.manage",
      },
      {
        label: "Roles",
        path: "/admin/roles",
        permission: "admin.roles.manage",
      },
      {
        label: "Audit Logs",
        path: "/admin/audit",
        permission: "admin.audit",
      },
    ],
  },
];
