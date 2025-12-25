import { useState, useMemo } from "react";
import { api } from "../lib/api";
import { validateRequired } from "../lib/validation";
import { FormField } from "../components/FormField";

export default function DepartmentForm({ department, onClose, onSaved }) {
  const isEdit = !!department;
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: department?.name || "",
    code: department?.code || ""
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!validateRequired(form.name)) newErrors.name = "Department name is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = useMemo(() => {
    return validateRequired(form.name);
  }, [form.name]);

  const submit = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          {isEdit ? "Edit Department" : "Create Department"}
        </h2>
        <p className="text-xs text-gray-600 mt-1">
          {isEdit ? "Update department information" : "Add a new department to your organization"}
        </p>
      </div>

      <div className="p-6 space-y-5">
        <FormField label="Department Name" required error={errors.name}>
          <input
            type="text"
            placeholder="Enter department name"
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

        <FormField label="Department Code" help="Optional identifier for the department">
          <input
            type="text"
            placeholder="e.g., DEPT001"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition font-mono"
            value={form.code}
            onChange={e => setForm({ ...form, code: e.target.value })}
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
          {loading ? "Saving..." : isEdit ? "Save Changes" : "Create Department"}
        </button>
      </div>
    </div>
  );
}
