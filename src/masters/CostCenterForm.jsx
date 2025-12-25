import { useState } from "react";
import { api } from "../lib/api";

export default function CostCenterForm({ costCenter, onClose, onSaved }) {
  const isEdit = !!costCenter;

  const [form, setForm] = useState({
    name: costCenter?.name || "",
    code: costCenter?.code || ""
  });

  const submit = async () => {
    if (!form.name || !form.code) {
      alert("Name and Code are required");
      return;
    }

    if (isEdit) {
      await api.request(`/masters/cost-centers/${costCenter.id}`, {
        method: "PUT",
        body: JSON.stringify(form)
      });
    } else {
      await api.request("/masters/cost-centers", {
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
          {isEdit ? "Edit Cost Center" : "Create Cost Center"}
        </h2>

        <input
          className="w-full border p-2 rounded"
          placeholder="Cost Center Name *"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Cost Center Code *"
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
