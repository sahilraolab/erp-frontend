import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { useAuth } from "../auth/AuthContext";
import ProjectForm from "./ProjectForm";

export default function ProjectList() {
  const { can } = useAuth();
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editProject, setEditProject] = useState(null);

  const loadProjects = async () => {
    const res = await api.request("/masters/projects");
    setProjects(res);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Projects</h1>

        {can("masters.create") && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-gray-900 text-white px-4 py-2 rounded"
          >
            + Create Project
          </button>
        )}
      </div>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="border-b text-left">
            <th className="p-3">Project</th>
            <th>Code</th>
            <th>Company</th>
            <th>Location</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {projects.map(p => (
            <tr key={p.id} className="border-b text-sm">
              <td className="p-3">{p.name}</td>
              <td>{p.code}</td>
              <td>{p.company?.name}</td>
              <td>{p.location || "-"}</td>
              <td>{p.isActive ? "Active" : "Inactive"}</td>
              <td className="text-right pr-3">
                {can("masters.update") && (
                  <button
                    onClick={() => {
                      setEditProject(p);
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
        <ProjectForm
          project={editProject}
          onClose={() => {
            setShowForm(false);
            setEditProject(null);
          }}
          onSaved={loadProjects}
        />
      )}
    </div>
  );
}
