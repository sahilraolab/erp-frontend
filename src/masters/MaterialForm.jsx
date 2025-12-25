import { useState, useMemo } from "react";
import { api } from "../lib/api";
import { validateRequired } from "../lib/validation";
import { FormField } from "../components/FormField";

export default function MaterialForm({ material, onClose, onSaved }) {
  const isEdit = !!material;
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: material?.name || "",
    code: material?.code || "",
    category: material?.category || "",
    isActive: material?.isActive ?? true
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!validateRequired(form.name)) newErrors.name = "Material name is required";
    if (!validateRequired(form.code)) newErrors.code = "Material code is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = useMemo(() => {
    return validateRequired(form.name) && validateRequired(form.code);
  }, [form]);

  const submit = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          {isEdit ? "Edit Material" : "Create Material"}
        </h2>
        <p className="text-xs text-gray-600 mt-1">
          {isEdit ? "Update material information" : "Add a new material to your inventory"}
        </p>
      </div>

      <div className="p-6 space-y-5">
        <FormField label="Material Name" required error={errors.name}>
          <input
            type="text"
            placeholder="Enter material name"
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

        <FormField label="Material Code" required error={errors.code} help="Unique identifier for the material">
          <input
            type="text"
            placeholder="e.g., MAT001"
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

        <FormField label="Category" help="Material category or group">
          <input
            type="text"
            placeholder="e.g., Raw Materials, Consumables"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
            value={form.category}
            onChange={e => setForm({ ...form, category: e.target.value })}
          />
        </FormField>

        <FormField label="Status">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={e => setForm({ ...form, isActive: e.target.checked })}
              className="w-4 h-4 text-black border-gray-300 rounded focus:ring-2 focus:ring-black cursor-pointer"
            />
            <span className="text-sm text-gray-700">Active material</span>
          </label>
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
          {loading ? "Saving..." : isEdit ? "Save Changes" : "Create Material"}
        </button>
      </div>
    </div>
  );
}
