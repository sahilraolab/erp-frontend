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
    <div className="bg-white p-6 rounded shadow max-w-sm">
      <h2 className="font-semibold mb-4">Create Role</h2>

      <input
        className="w-full border p-2 rounded mb-4"
        placeholder="Role name (e.g. SITE_ENGINEER)"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <div className="flex justify-end gap-2">
        <button onClick={onClose}>Cancel</button>
        <button
          onClick={submit}
          className="bg-gray-900 text-white px-4 py-2 rounded"
        >
          Create
        </button>
      </div>
    </div>
  );
}
