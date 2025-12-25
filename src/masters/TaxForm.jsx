import { useState, useMemo } from "react";
import { api } from "../lib/api";
import { validateRequired, validatePercentage } from "../lib/validation";
import { FormField } from "../components/FormField";

export default function TaxForm({ tax, onClose, onSaved }) {
  const isEdit = !!tax;
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: tax?.name || "",
    percentage: tax?.percentage || "",
    accountId: tax?.accountId || "",
    isActive: tax?.isActive ?? true
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!validateRequired(form.name)) {
      newErrors.name = "Tax name is required";
    }

    if (!validateRequired(form.percentage)) {
      newErrors.percentage = "Percentage is required";
    } else if (!validatePercentage(form.percentage)) {
      newErrors.percentage = "Percentage must be between 0 and 100";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = useMemo(() => {
    return validateRequired(form.name) && validateRequired(form.percentage) && validatePercentage(form.percentage);
  }, [form]);

  const submit = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      if (isEdit) {
        await api.request(`/masters/taxes/${tax.id}`, {
          method: "PUT",
          body: JSON.stringify(form)
        });
      } else {
        await api.request("/masters/taxes", {
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
          {isEdit ? "Edit Tax" : "Create Tax"}
        </h2>
        <p className="text-xs text-gray-600 mt-1">
          {isEdit ? "Update tax information" : "Add a new tax rate to your system"}
        </p>
      </div>

      <div className="p-6 space-y-5">
        <FormField label="Tax Name" required error={errors.name} help="e.g., GST 18%, VAT 5%">
          <input
            type="text"
            placeholder="e.g., GST 18%"
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

        <FormField label="Percentage" required error={errors.percentage} help="Value between 0 and 100">
          <input
            type="number"
            step="0.01"
            min="0"
            max="100"
            placeholder="e.g., 18"
            className={`w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition ${
              errors.percentage ? "border-red-500" : "border-gray-300"
            }`}
            value={form.percentage}
            onChange={e => {
              setForm({ ...form, percentage: e.target.value });
              if (errors.percentage) setErrors({ ...errors, percentage: "" });
            }}
          />
        </FormField>

        <FormField label="Account ID" help="Optional accounting reference">
          <input
            type="text"
            placeholder="e.g., ACC001"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition font-mono"
            value={form.accountId}
            onChange={e => setForm({ ...form, accountId: e.target.value })}
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
            <span className="text-sm text-gray-700">Active tax</span>
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
          {loading ? "Saving..." : isEdit ? "Save Changes" : "Create Tax"}
        </button>
      </div>
    </div>
  );
}
