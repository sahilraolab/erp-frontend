import { useState } from "react";
import { api } from "../lib/api";

export default function DepartmentForm({ department, onClose, onSaved }) {
  const isEdit = !!department;

  const [form, setForm] = useState({
    name: department?.name || "",
    code: department?.code || ""
  });

  const submit = async () => {
    if (!form.name) {
      alert("Department name is required");
      return;
    }

    if (isEdit) {
      await api.request(`/masters/departments/${department.id}`, {
        method: "PUT",
        body: JSON.stringify(form)
      });
    } else {
      await api.request("/masters/departments", {
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
          {isEdit ? "Edit Department" : "Create Department"}
        </h2>

        <input
          className="w-full border p-2 rounded"
          placeholder="Department Name *"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Department Code"
          value={form.code}
          onChange={e => setForm({ ...form, code: e.target.value })}
        />

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
