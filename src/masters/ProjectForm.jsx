import { useEffect, useState, useMemo } from "react";
import { api } from "../lib/api";
import { validateRequired } from "../lib/validation";
import { FormField } from "../components/FormField";

export default function ProjectForm({ project, onClose, onSaved }) {
  const isEdit = !!project;
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: project?.name || "",
    code: project?.code || "",
    companyId: project?.companyId || "",
    location: project?.location || ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    api.request("/masters/companies").then(setCompanies);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!validateRequired(form.name)) newErrors.name = "Project name is required";
    if (!validateRequired(form.code)) newErrors.code = "Project code is required";
    if (!validateRequired(form.companyId)) newErrors.companyId = "Company is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = useMemo(() => {
    return validateRequired(form.name) && validateRequired(form.code) && validateRequired(form.companyId);
  }, [form]);

  const submit = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          {isEdit ? "Edit Project" : "Create Project"}
        </h2>
        <p className="text-xs text-gray-600 mt-1">
          {isEdit ? "Update project information" : "Add a new project to your system"}
        </p>
      </div>

      <div className="p-6 space-y-5">
        <FormField label="Company" required error={errors.companyId}>
          <select
            className={`w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition ${
              errors.companyId ? "border-red-500" : "border-gray-300"
            }`}
            value={form.companyId}
            onChange={e => {
              setForm({ ...form, companyId: e.target.value });
              if (errors.companyId) setErrors({ ...errors, companyId: "" });
            }}
          >
            <option value="">Select Company</option>
            {companies.map(c => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Project Name" required error={errors.name}>
          <input
            type="text"
            placeholder="Enter project name"
            className={`w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            value={form.name}
            onChange={e => {
              setForm({ ...form, name: e.target.value });
              if (errors.name) setErrors({ ...errors, name: "" });
            }}
          />
        </FormField>

        <FormField label="Project Code" required error={errors.code} help="Unique identifier for the project">
          <input
            type="text"
            placeholder="e.g., PRJ001"
            className={`w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition font-mono ${
              errors.code ? "border-red-500" : "border-gray-300"
            }`}
            value={form.code}
            onChange={e => {
              setForm({ ...form, code: e.target.value });
              if (errors.code) setErrors({ ...errors, code: "" });
            }}
          />
        </FormField>

        <FormField label="Location">
          <input
            type="text"
            placeholder="Enter project location"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
            value={form.location}
            onChange={e => setForm({ ...form, location: e.target.value })}
          />
        </FormField>
      </div>

      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
        <button
          onClick={onClose}
          className="px-5 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition"
        >
          Cancel
        </button>
        <button
          onClick={submit}
          disabled={!isFormValid || loading}
          className="px-5 py-2.5 text-sm font-medium text-white bg-black hover:bg-gray-900 rounded-md transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Saving..." : isEdit ? "Save Changes" : "Create Project"}
        </button>
      </div>
    </div>
  );
}
