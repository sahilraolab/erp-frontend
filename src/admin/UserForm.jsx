import { useEffect, useState } from "react";
import { api } from "../lib/api";

export default function UserForm({ user, onClose, onSaved }) {
  const isEdit = !!user;
  const [roles, setRoles] = useState([]);
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
    roleId: user?.roleId || "",
    isActive: user?.isActive ?? true,
  });

  useEffect(() => {
    api.request("/admin/roles").then(setRoles);
  }, []);

  const submit = async () => {
    if (isEdit) {
      await api.request(`/admin/users/${user.id}`, {
        method: "PUT",
        body: JSON.stringify({
          name: form.name,
          roleId: form.roleId,
          isActive: form.isActive,
        }),
      });
    } else {
      await api.request("/admin/users", {
        method: "POST",
        body: JSON.stringify(form),
      });
    }

    onSaved();
    onClose();
  };

  return (
    <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          {isEdit ? "Edit User" : "Create User"}
        </h2>
      </div>

      <div className="p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent transition"
            placeholder="Enter full name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
        </div>

        {!isEdit && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent transition"
              placeholder="user@company.com"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
          </div>
        )}

        {!isEdit && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent transition"
              placeholder="Enter password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Role
          </label>
          <select
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent transition"
            value={form.roleId}
            onChange={e => setForm({ ...form, roleId: e.target.value })}
          >
            <option value="">Select Role</option>
            {roles.map(r => (
              <option key={r.id} value={r.id}>{r.name}</option>
            ))}
          </select>
        </div>

        {isEdit && (
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-800"
              checked={form.isActive}
              onChange={e => setForm({ ...form, isActive: e.target.checked })}
            />
            <span className="text-sm font-medium text-gray-700">Active User</span>
          </label>
        )}
      </div>

      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
        <button
          onClick={onClose}
          className="px-5 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition"
        >
          Cancel
        </button>
        <button
          onClick={submit}
          className="px-5 py-2.5 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-md transition"
        >
          {isEdit ? "Save Changes" : "Create User"}
        </button>
      </div>
    </div>
  );
}
