import { useEffect, useState } from "react";
import { api } from "../lib/api";

export default function BranchForm({ branch, onClose, onSaved }) {
  const isEdit = !!branch;
  const [companies, setCompanies] = useState([]);

  const [form, setForm] = useState({
    name: branch?.name || "",
    code: branch?.code || "",
    companyId: branch?.companyId || ""
  });

  useEffect(() => {
    api.request("/masters/companies").then(setCompanies);
  }, []);

  const submit = async () => {
    if (!form.name || !form.code || !form.companyId) {
      alert("All fields are required");
      return;
    }

    if (isEdit) {
      await api.request(`/masters/branches/${branch.id}`, {
        method: "PUT",
        body: JSON.stringify(form)
      });
    } else {
      await api.request("/masters/branches", {
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
          {isEdit ? "Edit Branch" : "Create Branch"}
        </h2>

        <input
          className="w-full border p-2 rounded"
          placeholder="Branch Name *"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Branch Code *"
          value={form.code}
          onChange={e => setForm({ ...form, code: e.target.value })}
        />

        <select
          className="w-full border p-2 rounded"
          value={form.companyId}
          onChange={e => setForm({ ...form, companyId: e.target.value })}
        >
          <option value="">Select Company *</option>
          {companies.map(c => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
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
