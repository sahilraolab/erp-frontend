import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { useAuth } from "../auth/AuthContext";
import BranchForm from "./BranchForm";

export default function BranchList() {
  const { can } = useAuth();
  const [branches, setBranches] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editBranch, setEditBranch] = useState(null);

  const loadBranches = async () => {
    const res = await api.request("/masters/branches");
    setBranches(res);
  };

  useEffect(() => {
    loadBranches();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Branches</h1>

        {can("masters.create") && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-gray-900 text-white px-4 py-2 rounded"
          >
            + Create Branch
          </button>
        )}
      </div>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="border-b text-left">
            <th className="p-3">Branch Name</th>
            <th>Code</th>
            <th>Company</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {branches.map(b => (
            <tr key={b.id} className="border-b text-sm">
              <td className="p-3">{b.name}</td>
              <td>{b.code}</td>
              <td>{b.company?.name || "-"}</td>
              <td className="text-right pr-3">
                {can("masters.update") && (
                  <button
                    onClick={() => {
                      setEditBranch(b);
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
        <BranchForm
          branch={editBranch}
          onClose={() => {
            setShowForm(false);
            setEditBranch(null);
          }}
          onSaved={loadBranches}
        />
      )}
    </div>
  );
}
