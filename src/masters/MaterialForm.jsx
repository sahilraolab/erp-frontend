import { useState } from "react";
import { api } from "../lib/api";

export default function MaterialForm({ material, onClose, onSaved }) {
  const isEdit = !!material;

  const [form, setForm] = useState({
    name: material?.name || "",
    code: material?.code || "",
    category: material?.category || "",
    isActive: material?.isActive ?? true
  });

  const submit = async () => {
    if (!form.name || !form.code) {
      alert("Name and Code are required");
      return;
    }

    if (isEdit) {
      await api.request(`/masters/materials/${material.id}`, {
        method: "PUT",
        body: JSON.stringify(form)
      });
    } else {
      await api.request("/masters/materials", {
        method: "POST",
        body: JSON.stringify(form)
      });
    }

    onSaved();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow w-[420px] space-y-4">
        <h2 className="font-semibold text-lg">
          {isEdit ? "Edit Material" : "Create Material"}
        </h2>

        <input
          className="w-full border p-2 rounded"
          placeholder="Material Name *"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Material Code *"
          value={form.code}
          onChange={e => setForm({ ...form, code: e.target.value })}
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Category"
          value={form.category}
          onChange={e => setForm({ ...form, category: e.target.value })}
        />

        {isEdit && (
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={e =>
                setForm({ ...form, isActive: e.target.checked })
              }
            />
            Active
          </label>
        )}

        <div className="flex justify-end gap-2 pt-2">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={submit}
            className="bg-gray-900 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
