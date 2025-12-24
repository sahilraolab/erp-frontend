import { useState } from "react";
import { api } from "../lib/api";

export default function RoleForm({ onClose, onSaved }) {
  const [name, setName] = useState("");

  const submit = async () => {
    if (!name.trim()) return;

    await api.request("/admin/roles", {
      method: "POST",
      body: JSON.stringify({ name }),
    });

    onSaved();
  };

  return (
    <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Create Role</h2>
        <p className="text-xs text-gray-600 mt-1">Define a new role for your organization</p>
      </div>

      <div className="p-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Role Name
        </label>
        <input
          className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent transition"
          placeholder="e.g. SITE_ENGINEER, PROJECT_MANAGER"
          value={name}
          onChange={e => setName(e.target.value)}
        />
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
          Create Role
        </button>
      </div>
    </div>
  );
}
