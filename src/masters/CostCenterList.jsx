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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cost Centers</h1>
          <p className="text-gray-600 text-sm mt-1">Track and manage cost allocation centers</p>
        </div>

        {can("masters.create") && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-black hover:bg-gray-900 text-white font-medium px-5 py-2.5 rounded-md transition-colors duration-200"
          >
            + Create Cost Center
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Code</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {centers.length === 0 ? (
              <tr>
                <td colSpan="3" className="px-6 py-8 text-center text-sm text-gray-500">
                  No records found. Create one to get started.
                </td>
              </tr>
            ) : (
              centers.map(c => (
                <tr key={c.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm text-gray-900">{c.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{c.code}</td>
                  <td className="px-6 py-4 text-right">
                    {can("masters.update") && (
                      <button
                        onClick={() => {
                          setEditCenter(c);
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
          <CostCenterForm
            costCenter={editCenter}
            onClose={() => {
              setShowForm(false);
              setEditCenter(null);
            }}
            onSaved={loadCenters}
          />
        </div>
      )}
    </div>
  );
}
