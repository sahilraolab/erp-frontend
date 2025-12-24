export const SIDEBAR_ITEMS = [
  {
    label: "Profile",
    path: "/",
    permission: null, // visible to all logged-in users
  },
  {
    label: "Admin",
    permission: "admin.view",
    children: [
      { label: "Users", path: "/admin/users", permission: "admin.users.manage" },
      { label: "Roles", path: "/admin/roles", permission: "admin.roles.manage" },
    ],
  },
  {
    label: "Masters",
    permission: "masters.view",
    children: [
      { label: "Masters List", path: "/masters", permission: "masters.view" },
    ],
  },
];
