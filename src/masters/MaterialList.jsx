import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { useAuth } from "../auth/AuthContext";
import MaterialForm from "./MaterialForm";

export default function MaterialList() {
  const { can } = useAuth();
  const [materials, setMaterials] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editMaterial, setEditMaterial] = useState(null);

  const loadMaterials = async () => {
    const res = await api.request("/masters/materials");
    setMaterials(res);
  };

  useEffect(() => {
    loadMaterials();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Materials</h1>

        {can("masters.create") && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-gray-900 text-white px-4 py-2 rounded"
          >
            + Create Material
          </button>
        )}
      </div>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="border-b text-left">
            <th className="p-3">Name</th>
            <th>Code</th>
            <th>Category</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {materials.map(m => (
            <tr key={m.id} className="border-b text-sm">
              <td className="p-3">{m.name}</td>
              <td>{m.code}</td>
              <td>{m.category || "-"}</td>
              <td>
                <span
                  className={
                    m.isActive
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {m.isActive ? "Active" : "Inactive"}
                </span>
              </td>
              <td className="text-right pr-3">
                {can("masters.update") && (
                  <button
                    onClick={() => {
                      setEditMaterial(m);
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
        <MaterialForm
          material={editMaterial}
          onClose={() => {
            setShowForm(false);
            setEditMaterial(null);
          }}
          onSaved={loadMaterials}
        />
      )}
    </div>
  );
}
