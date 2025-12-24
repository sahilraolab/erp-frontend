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
    <div className="bg-white p-6 rounded shadow space-y-4">
      <h2 className="font-semibold text-lg">
        {isEdit ? "Edit User" : "Create User"}
      </h2>

      <input
        className="w-full border p-2 rounded"
        placeholder="Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />

      {!isEdit && (
        <input
          className="w-full border p-2 rounded"
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
      )}

      {!isEdit && (
        <input
          type="password"
          className="w-full border p-2 rounded"
          placeholder="Password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
        />
      )}

      <select
        className="w-full border p-2 rounded"
        value={form.roleId}
        onChange={e => setForm({ ...form, roleId: e.target.value })}
      >
        <option value="">Select Role</option>
        {roles.map(r => (
          <option key={r.id} value={r.id}>{r.name}</option>
        ))}
      </select>

      {isEdit && (
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.isActive}
            onChange={e => setForm({ ...form, isActive: e.target.checked })}
          />
          Active
        </label>
      )}

      <div className="flex justify-end gap-2">
        <button onClick={onClose}>Cancel</button>
        <button
          onClick={submit}
          className="bg-gray-900 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
}
