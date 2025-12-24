import { NavLink } from "react-router-dom";
import { SIDEBAR_ITEMS } from "./sidebar.config";
import { useAuth } from "../auth/AuthContext";

export default function Sidebar() {
  const { can } = useAuth();

  return (
    <aside className="w-64 bg-gray-900 text-gray-200 min-h-screen px-4 py-6">
      <div className="text-lg font-semibold mb-6">ERP</div>

      <nav className="space-y-4">
        {SIDEBAR_ITEMS.map((item) => {
          if (item.permission && !can(item.permission)) return null;

          if (!item.children) {
            return (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded ${
                    isActive ? "bg-gray-700" : "hover:bg-gray-800"
                  }`
                }
              >
                {item.label}
              </NavLink>
            );
          }

          return (
            <div key={item.label}>
              <div className="text-xs uppercase text-gray-400 mb-1">
                {item.label}
              </div>
              <div className="space-y-1 ml-2">
                {item.children.map((child) =>
                  can(child.permission) ? (
                    <NavLink
                      key={child.label}
                      to={child.path}
                      className={({ isActive }) =>
                        `block px-3 py-2 rounded text-sm ${
                          isActive
                            ? "bg-gray-700"
                            : "hover:bg-gray-800"
                        }`
                      }
                    >
                      {child.label}
                    </NavLink>
                  ) : null
                )}
              </div>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
