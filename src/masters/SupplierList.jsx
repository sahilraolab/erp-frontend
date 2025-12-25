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
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Suppliers</h1>

        {can("masters.create") && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-gray-900 text-white px-4 py-2 rounded"
          >
            + Create Supplier
          </button>
        )}
      </div>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="border-b text-left">
            <th className="p-3">Name</th>
            <th>GSTIN</th>
            <th>PAN</th>
            <th>Phone</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map(s => (
            <tr key={s.id} className="border-b text-sm">
              <td className="p-3">{s.name}</td>
              <td>{s.gstin || "-"}</td>
              <td>{s.pan || "-"}</td>
              <td>{s.phone || "-"}</td>
              <td>
                <span
                  className={
                    s.isActive
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {s.isActive ? "Active" : "Inactive"}
                </span>
              </td>
              <td className="text-right pr-3">
                {can("masters.update") && (
                  <button
                    onClick={() => {
                      setEditSupplier(s);
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
        <SupplierForm
          supplier={editSupplier}
          onClose={() => {
            setShowForm(false);
            setEditSupplier(null);
          }}
          onSaved={loadSuppliers}
        />
      )}
    </div>
  );
}
