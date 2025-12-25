import { useState, useMemo } from "react";
import { api } from "../lib/api";
import { validateRequired, validateGSTIN, validatePAN, validatePhone, validateEmail } from "../lib/validation";
import { FormField } from "../components/FormField";

export default function SupplierForm({ supplier, onClose, onSaved }) {
  const isEdit = !!supplier;
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: supplier?.name || "",
    gstin: supplier?.gstin || "",
    pan: supplier?.pan || "",
    contactPerson: supplier?.contactPerson || "",
    phone: supplier?.phone || "",
    email: supplier?.email || "",
    isActive: supplier?.isActive ?? true
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!validateRequired(form.name)) {
      newErrors.name = "Supplier name is required";
    }

    if (form.gstin && !validateGSTIN(form.gstin)) {
      newErrors.gstin = "GSTIN must be 15 alphanumeric characters";
    }

    if (form.pan && !validatePAN(form.pan)) {
      newErrors.pan = "PAN must be 10 alphanumeric characters";
    }

    if (form.phone && !validatePhone(form.phone)) {
      newErrors.phone = "Phone must be 10 digits";
    }

    if (form.email && !validateEmail(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          {isEdit ? "Edit Supplier" : "Create Supplier"}
        </h2>
        <p className="text-xs text-gray-600 mt-1">
          {isEdit ? "Update supplier information" : "Add a new supplier to your database"}
        </p>
      </div>

      <div className="p-6 space-y-5">
        <FormField label="Supplier Name" required error={errors.name}>
          <input
            type="text"
            placeholder="Enter supplier name"
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

        <FormField label="GSTIN" error={errors.gstin} help="15 characters (alphanumeric only)">
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

        <FormField label="PAN" error={errors.pan} help="10 characters (alphanumeric only)">
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

        <FormField label="Contact Person">
          <input
            type="text"
            placeholder="Enter contact person name"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
            value={form.contactPerson}
            onChange={e => setForm({ ...form, contactPerson: e.target.value })}
          />
        </FormField>

        <FormField label="Phone" error={errors.phone} help="10 digits">
          <input
            type="tel"
            placeholder="e.g., 9876543210"
            className={`w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition font-mono ${
              errors.phone ? "border-red-500" : "border-gray-300"
            }`}
            value={form.phone}
            onChange={e => {
              setForm({ ...form, phone: e.target.value });
              if (errors.phone) setErrors({ ...errors, phone: "" });
            }}
          />
        </FormField>

        <FormField label="Email" error={errors.email}>
          <input
            type="email"
            placeholder="e.g., supplier@example.com"
            className={`w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            value={form.email}
            onChange={e => {
              setForm({ ...form, email: e.target.value });
              if (errors.email) setErrors({ ...errors, email: "" });
            }}
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
            <span className="text-sm text-gray-700">Active supplier</span>
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
          {loading ? "Saving..." : isEdit ? "Save Changes" : "Create Supplier"}
        </button>
      </div>
    </div>
  );
}
