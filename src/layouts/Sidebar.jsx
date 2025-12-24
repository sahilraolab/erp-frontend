import { NavLink } from "react-router-dom";
import { SIDEBAR_ITEMS } from "./sidebar.config";
import { useAuth } from "../auth/AuthContext";

export default function Sidebar() {
  const { can } = useAuth();

  return (
    <aside className="w-64 bg-gray-900 text-gray-100 min-h-screen border-r border-gray-800">
      <div className="px-6 py-6 border-b border-gray-800">
        <div className="text-xl font-bold text-white">ERP System</div>
        <div className="text-xs text-gray-400 mt-1">Management Portal</div>
      </div>

      <nav className="px-4 py-6 space-y-2">
        {SIDEBAR_ITEMS.map((item) => {
          if (item.permission && !can(item.permission)) return null;

          if (!item.children) {
            return (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  `block px-4 py-2.5 rounded-lg font-medium transition-all ${
                    isActive
                      ? "bg-gray-800 text-white shadow-lg"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`
                }
              >
                {item.label}
              </NavLink>
            );
          }

          return (
            <div key={item.label} className="pt-4">
              <div className="text-xs uppercase font-semibold text-gray-500 px-4 mb-2 tracking-wider">
                {item.label}
              </div>
              <div className="space-y-1">
                {item.children.map((child) =>
                  can(child.permission) ? (
                    <NavLink
                      key={child.label}
                      to={child.path}
                      className={({ isActive }) =>
                        `block px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                          isActive
                            ? "bg-gray-800 text-white shadow-lg"
                            : "text-gray-300 hover:bg-gray-800 hover:text-white"
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
