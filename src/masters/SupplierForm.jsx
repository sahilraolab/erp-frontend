import { useState } from "react";
import { api } from "../lib/api";

export default function SupplierForm({ supplier, onClose, onSaved }) {
  const isEdit = !!supplier;

  const [form, setForm] = useState({
    name: supplier?.name || "",
    gstin: supplier?.gstin || "",
    pan: supplier?.pan || "",
    contactPerson: supplier?.contactPerson || "",
    phone: supplier?.phone || "",
    email: supplier?.email || "",
    isActive: supplier?.isActive ?? true
  });

  const submit = async () => {
    if (!form.name) {
      alert("Supplier name is required");
      return;
    }

    if (isEdit) {
      await api.request(`/masters/suppliers/${supplier.id}`, {
        method: "PUT",
        body: JSON.stringify(form)
      });
    } else {
      await api.request("/masters/suppliers", {
        method: "POST",
        body: JSON.stringify(form)
      });
    }

    onSaved();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow w-[440px] space-y-4">
        <h2 className="font-semibold text-lg">
          {isEdit ? "Edit Supplier" : "Create Supplier"}
        </h2>

        <input
          className="w-full border p-2 rounded"
          placeholder="Supplier Name *"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="GSTIN"
          value={form.gstin}
          onChange={e => setForm({ ...form, gstin: e.target.value })}
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="PAN"
          value={form.pan}
          onChange={e => setForm({ ...form, pan: e.target.value })}
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Contact Person"
          value={form.contactPerson}
          onChange={e =>
            setForm({ ...form, contactPerson: e.target.value })
          }
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Phone"
          value={form.phone}
          onChange={e => setForm({ ...form, phone: e.target.value })}
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
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
