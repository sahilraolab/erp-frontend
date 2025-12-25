import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { useAuth } from "../auth/AuthContext";
import TaxForm from "./TaxForm";

export default function TaxList() {
  const { can } = useAuth();
  const [taxes, setTaxes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editTax, setEditTax] = useState(null);

  const loadTaxes = async () => {
    const res = await api.request("/masters/taxes");
    setTaxes(res);
  };

  useEffect(() => {
    loadTaxes();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Taxes</h1>

        {can("masters.create") && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-gray-900 text-white px-4 py-2 rounded"
          >
            + Create Tax
          </button>
        )}
      </div>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="border-b text-left">
            <th className="p-3">Name</th>
            <th>Percentage</th>
            <th>Account</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {taxes.map(t => (
            <tr key={t.id} className="border-b text-sm">
              <td className="p-3">{t.name}</td>
              <td>{t.percentage}%</td>
              <td>{t.accountId || "-"}</td>
              <td>
                <span
                  className={
                    t.isActive
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {t.isActive ? "Active" : "Inactive"}
                </span>
              </td>
              <td className="text-right pr-3">
                {can("masters.update") && (
                  <button
                    onClick={() => {
                      setEditTax(t);
                      setShowForm(true);
                    }}
                    className="text-blue-600 text-sm"
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <TaxForm
          tax={editTax}
          onClose={() => {
            setShowForm(false);
            setEditTax(null);
          }}
          onSaved={loadTaxes}
        />
      )}
    </div>
  );
}
