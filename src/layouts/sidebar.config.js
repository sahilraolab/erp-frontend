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

  {
    label: "Masters",
    permission: "masters.view",
    children: [
      { label: "Companies", path: "/masters/companies", permission: "masters.view" },
      { label: "Branches", path: "/masters/branches", permission: "masters.view" },
      { label: "Projects", path: "/masters/projects", permission: "masters.view" },
      { label: "Departments", path: "/masters/departments", permission: "masters.view" },
      { label: "UOM", path: "/masters/uoms", permission: "masters.view" },
      { label: "Cost Centers", path: "/masters/cost-centers", permission: "masters.view" },
      { label: "Materials", path: "/masters/materials", permission: "masters.view" },
      { label: "Suppliers", path: "/masters/suppliers", permission: "masters.view" },
      { label: "Taxes", path: "/masters/taxes", permission: "masters.view" },
    ],
  },
];
