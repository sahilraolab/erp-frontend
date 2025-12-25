import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { useAuth } from "../auth/AuthContext";
import UOMForm from "./UOMForm";

export default function UOMList() {
  const { can } = useAuth();
  const [uoms, setUoms] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editUOM, setEditUOM] = useState(null);

  const loadUOMs = async () => {
    const res = await api.request("/masters/uoms");
    setUoms(res);
  };

  useEffect(() => {
    loadUOMs();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Units of Measurement (UOM)</h1>

        {can("masters.create") && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-gray-900 text-white px-4 py-2 rounded"
          >
            + Create UOM
          </button>
        )}
      </div>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="border-b text-left">
            <th className="p-3">Name</th>
            <th>Symbol</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {uoms.map(u => (
            <tr key={u.id} className="border-b text-sm">
              <td className="p-3">{u.name}</td>
              <td>{u.symbol}</td>
              <td className="text-right pr-3">
                {can("masters.update") && (
                  <button
                    onClick={() => {
                      setEditUOM(u);
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
        <UOMForm
          uom={editUOM}
          onClose={() => {
            setShowForm(false);
            setEditUOM(null);
          }}
          onSaved={loadUOMs}
        />
      )}
    </div>
  );
}
