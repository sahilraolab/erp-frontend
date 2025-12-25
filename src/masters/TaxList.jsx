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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Taxes</h1>
          <p className="text-gray-600 text-sm mt-1">Configure tax rates and accounting settings</p>
        </div>

        {can("masters.create") && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-black hover:bg-gray-900 text-white font-medium px-5 py-2.5 rounded-md transition-colors duration-200"
          >
            + Create Tax
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Percentage</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Account</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {taxes.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-sm text-gray-500">
                  No records found. Create one to get started.
                </td>
              </tr>
            ) : (
              taxes.map(t => (
                <tr key={t.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm text-gray-900">{t.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{t.percentage}%</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{t.accountId || "-"}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      t.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}>
                      {t.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {can("masters.update") && (
                      <button
                        onClick={() => {
                          setEditTax(t);
                          setShowForm(true);
                        }}
                        className="text-sm font-medium text-black hover:text-gray-700 transition"
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <TaxForm
            tax={editTax}
            onClose={() => {
              setShowForm(false);
              setEditTax(null);
            }}
            onSaved={loadTaxes}
          />
        </div>
      )}
    </div>
  );
}
