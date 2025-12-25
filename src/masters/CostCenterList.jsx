import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { useAuth } from "../auth/AuthContext";
import CostCenterForm from "./CostCenterForm";

export default function CostCenterList() {
  const { can } = useAuth();
  const [centers, setCenters] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editCenter, setEditCenter] = useState(null);

  const loadCenters = async () => {
    const res = await api.request("/masters/cost-centers");
    setCenters(res);
  };

  useEffect(() => {
    loadCenters();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Cost Centers</h1>

        {can("masters.create") && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-gray-900 text-white px-4 py-2 rounded"
          >
            + Create Cost Center
          </button>
        )}
      </div>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="border-b text-left">
            <th className="p-3">Name</th>
            <th>Code</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {centers.map(c => (
            <tr key={c.id} className="border-b text-sm">
              <td className="p-3">{c.name}</td>
              <td>{c.code}</td>
              <td className="text-right pr-3">
                {can("masters.update") && (
                  <button
                    onClick={() => {
                      setEditCenter(c);
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
        <CostCenterForm
          costCenter={editCenter}
          onClose={() => {
            setShowForm(false);
            setEditCenter(null);
          }}
          onSaved={loadCenters}
        />
      )}
    </div>
  );
}
