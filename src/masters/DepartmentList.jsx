import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { useAuth } from "../auth/AuthContext";
import DepartmentForm from "./DepartmentForm";

export default function DepartmentList() {
  const { can } = useAuth();
  const [departments, setDepartments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editDepartment, setEditDepartment] = useState(null);

  const loadDepartments = async () => {
    const res = await api.request("/masters/departments");
    setDepartments(res);
  };

  useEffect(() => {
    loadDepartments();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Departments</h1>

        {can("masters.create") && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-gray-900 text-white px-4 py-2 rounded"
          >
            + Create Department
          </button>
        )}
      </div>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="border-b text-left">
            <th className="p-3">Department Name</th>
            <th>Code</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {departments.map(d => (
            <tr key={d.id} className="border-b text-sm">
              <td className="p-3">{d.name}</td>
              <td>{d.code || "-"}</td>
              <td className="text-right pr-3">
                {can("masters.update") && (
                  <button
                    onClick={() => {
                      setEditDepartment(d);
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
        <DepartmentForm
          department={editDepartment}
          onClose={() => {
            setShowForm(false);
            setEditDepartment(null);
          }}
          onSaved={loadDepartments}
        />
      )}
    </div>
  );
}
