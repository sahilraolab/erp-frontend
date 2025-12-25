import { useState, useMemo } from "react";
import { api } from "../lib/api";
import { validateRequired, validateMinLength, validateGSTIN, validatePAN } from "../lib/validation";
import { FormField } from "../components/FormField";

export default function CompanyForm({ company, onClose, onSaved }) {
  const isEdit = !!company;

  const [form, setForm] = useState({
    name: company?.name || "",
    code: company?.code || "",
    gstin: company?.gstin || "",
    pan: company?.pan || "",
    currency: company?.currency || "INR"
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!validateRequired(form.name)) {
      newErrors.name = "Company name is required";
    } else if (!validateMinLength(form.name, 3)) {
      newErrors.name = "Company name must be at least 3 characters";
    }

    if (!validateRequired(form.code)) {
      newErrors.code = "Company code is required";
    }

    if (form.gstin && !validateGSTIN(form.gstin)) {
      newErrors.gstin = "GSTIN must be 15 alphanumeric characters";
    }

    if (form.pan && !validatePAN(form.pan)) {
      newErrors.pan = "PAN must be 10 alphanumeric characters";
    }

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          {isEdit ? "Edit Company" : "Create Company"}
        </h2>
        <p className="text-xs text-gray-600 mt-1">
          {isEdit ? "Update company information" : "Add a new company to your system"}
        </p>
      </div>

      <div className="p-6 space-y-5">
        <FormField
          label="Company Name"
          required
          error={errors.name}
        >
          <input
            type="text"
            placeholder="Enter company name"
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

        <FormField
          label="Company Code"
          required
          error={errors.code}
          help="Unique identifier for the company"
        >
          <input
            type="text"
            placeholder="e.g., ABC001"
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

        <FormField
          label="GSTIN"
          error={errors.gstin}
          help="15 characters (alphanumeric only)"
        >
          <input
            type="text"
            placeholder="e.g., 27AAPCS5055K1Z0"
            className={`w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition font-mono ${
              errors.gstin ? "border-red-500" : "border-gray-300"
            }`}
            value={form.gstin}
            onChange={e => {
              setForm({ ...form, gstin: e.target.value.toUpperCase() });
              if (errors.gstin) setErrors({ ...errors, gstin: "" });
            }}
          />
        </FormField>

        <FormField
          label="PAN"
          error={errors.pan}
          help="10 characters (alphanumeric only)"
        >
          <input
            type="text"
            placeholder="e.g., AAAPA1234A"
            className={`w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition font-mono ${
              errors.pan ? "border-red-500" : "border-gray-300"
            }`}
            value={form.pan}
            onChange={e => {
              setForm({ ...form, pan: e.target.value.toUpperCase() });
              if (errors.pan) setErrors({ ...errors, pan: "" });
            }}
          />
        </FormField>

        <FormField
          label="Currency"
          required
        >
          <select
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
            value={form.currency}
            onChange={e => setForm({ ...form, currency: e.target.value })}
          >
            <option value="INR">Indian Rupee (INR)</option>
            <option value="USD">US Dollar (USD)</option>
            <option value="EUR">Euro (EUR)</option>
            <option value="GBP">British Pound (GBP)</option>
          </select>
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
          {loading ? "Saving..." : isEdit ? "Save Changes" : "Create Company"}
        </button>
      </div>
    </div>
  );
}
