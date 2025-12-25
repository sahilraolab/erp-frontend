import { useState } from "react";
import { api } from "../lib/api";

export default function TaxForm({ tax, onClose, onSaved }) {
  const isEdit = !!tax;

  const [form, setForm] = useState({
    name: tax?.name || "",
    percentage: tax?.percentage || "",
    accountId: tax?.accountId || "",
    isActive: tax?.isActive ?? true
  });

  const submit = async () => {
    if (!form.name || !form.percentage) {
      alert("Name and percentage are required");
      return;
    }

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
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow w-[420px] space-y-4">
        <h2 className="font-semibold text-lg">
          {isEdit ? "Edit Tax" : "Create Tax"}
        </h2>

        <input
          className="w-full border p-2 rounded"
          placeholder="Tax Name * (eg: GST 18%)"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="number"
          className="w-full border p-2 rounded"
          placeholder="Percentage *"
          value={form.percentage}
          onChange={e =>
            setForm({ ...form, percentage: e.target.value })
          }
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Account ID (optional)"
          value={form.accountId}
          onChange={e =>
            setForm({ ...form, accountId: e.target.value })
          }
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
