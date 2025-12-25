import { useEffect, useState } from "react";
import { api } from "../lib/api";

export default function ProjectForm({ project, onClose, onSaved }) {
  const isEdit = !!project;

  const [companies, setCompanies] = useState([]);
  const [form, setForm] = useState({
    name: project?.name || "",
    code: project?.code || "",
    companyId: project?.companyId || "",
    location: project?.location || ""
  });

  useEffect(() => {
    api.request("/masters/companies").then(setCompanies);
  }, []);

  const submit = async () => {
    if (!form.name || !form.code || !form.companyId) {
      alert("Please fill all required fields");
      return;
    }

    if (isEdit) {
      await api.request(`/masters/projects/${project.id}`, {
        method: "PUT",
        body: JSON.stringify(form)
      });
    } else {
      await api.request("/masters/projects", {
        method: "POST",
        body: JSON.stringify(form)
      });
    }

    onSaved();
    onClose();
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-md">
      <h2 className="font-semibold text-lg mb-4">
        {isEdit ? "Edit Project" : "Create Project"}
      </h2>

      <div className="space-y-3">
        <select
          className="w-full border p-2 rounded"
          value={form.companyId}
          onChange={e => setForm({ ...form, companyId: e.target.value })}
        >
          <option value="">Select Company *</option>
          {companies.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        <input
          className="w-full border p-2 rounded"
          placeholder="Project Name *"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Project Code *"
          value={form.code}
          onChange={e => setForm({ ...form, code: e.target.value })}
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Location"
          value={form.location}
          onChange={e => setForm({ ...form, location: e.target.value })}
        />
      </div>

      <div className="flex justify-end gap-2 mt-4">
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
