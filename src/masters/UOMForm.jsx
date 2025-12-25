import { useState } from "react";
import { api } from "../lib/api";

export default function UOMForm({ uom, onClose, onSaved }) {
  const isEdit = !!uom;

  const [form, setForm] = useState({
    name: uom?.name || "",
    symbol: uom?.symbol || ""
  });

  const submit = async () => {
    if (!form.name || !form.symbol) {
      alert("Name and Symbol are required");
      return;
    }

    if (isEdit) {
      await api.request(`/masters/uoms/${uom.id}`, {
        method: "PUT",
        body: JSON.stringify(form)
      });
    } else {
      await api.request("/masters/uoms", {
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
          {isEdit ? "Edit UOM" : "Create UOM"}
        </h2>

        <input
          className="w-full border p-2 rounded"
          placeholder="UOM Name * (e.g. Kilogram)"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Symbol * (e.g. Kg)"
          value={form.symbol}
          onChange={e => setForm({ ...form, symbol: e.target.value })}
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
