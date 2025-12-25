import { useState } from "react";
import { api } from "../lib/api";

export default function CompanyForm({ company, onClose, onSaved }) {
  const isEdit = !!company;

  const [form, setForm] = useState({
    name: company?.name || "",
    code: company?.code || "",
    gstin: company?.gstin || "",
    pan: company?.pan || "",
    currency: company?.currency || "INR"
  });

  const submit = async () => {
    if (!form.name || !form.code) {
      alert("Name and Code are required");
      return;
    }

    if (isEdit) {
      await api.request(`/masters/companies/${company.id}`, {
        method: "PUT",
        body: JSON.stringify(form)
      });
    } else {
      await api.request("/masters/companies", {
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
          {isEdit ? "Edit Company" : "Create Company"}
        </h2>

        <input
          className="w-full border p-2 rounded"
          placeholder="Company Name *"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Company Code *"
          value={form.code}
          onChange={e => setForm({ ...form, code: e.target.value })}
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

        <select
          className="w-full border p-2 rounded"
          value={form.currency}
          onChange={e => setForm({ ...form, currency: e.target.value })}
        >
          <option value="INR">INR</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>

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
