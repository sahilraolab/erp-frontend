import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { useAuth } from "../auth/AuthContext";
import SupplierForm from "./SupplierForm";

export default function SupplierList() {
  const { can } = useAuth();
  const [suppliers, setSuppliers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editSupplier, setEditSupplier] = useState(null);

  const loadSuppliers = async () => {
    const res = await api.request("/masters/suppliers");
    setSuppliers(res);
  };

  useEffect(() => {
    loadSuppliers();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Suppliers</h1>
          <p className="text-gray-600 text-sm mt-1">Manage supplier information and vendor relationships</p>
        </div>

        {can("masters.create") && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-black hover:bg-gray-900 text-white font-medium px-5 py-2.5 rounded-md transition-colors duration-200"
          >
            + Create Supplier
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">GSTIN</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">PAN</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {suppliers.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-sm text-gray-500">
                  No records found. Create one to get started.
                </td>
              </tr>
            ) : (
              suppliers.map(s => (
                <tr key={s.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm text-gray-900">{s.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{s.gstin || "-"}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{s.pan || "-"}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{s.phone || "-"}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      s.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}>
                      {s.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {can("masters.update") && (
                      <button
                        onClick={() => {
                          setEditSupplier(s);
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
          <SupplierForm
            supplier={editSupplier}
            onClose={() => {
              setShowForm(false);
              setEditSupplier(null);
            }}
            onSaved={loadSuppliers}
          />
        </div>
      )}
    </div>
  );
}
