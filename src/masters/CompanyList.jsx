import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { useAuth } from "../auth/AuthContext";
import CompanyForm from "./CompanyForm";

export default function CompanyList() {
  const { can } = useAuth();
  const [companies, setCompanies] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editCompany, setEditCompany] = useState(null);

  const loadCompanies = async () => {
    const res = await api.request("/masters/companies");
    setCompanies(res);
  };

  useEffect(() => {
    loadCompanies();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Companies</h1>

        {can("masters.create") && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-gray-900 text-white px-4 py-2 rounded"
          >
            + Create Company
          </button>
        )}
      </div>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="text-left border-b">
            <th className="p-3">Name</th>
            <th>Code</th>
            <th>GSTIN</th>
            <th>PAN</th>
            <th>Currency</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {companies.map(c => (
            <tr key={c.id} className="border-b text-sm">
              <td className="p-3">{c.name}</td>
              <td>{c.code}</td>
              <td>{c.gstin || "-"}</td>
              <td>{c.pan || "-"}</td>
              <td>{c.currency}</td>
              <td className="text-right pr-3">
                {can("masters.update") && (
                  <button
                    onClick={() => {
                      setEditCompany(c);
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
        <CompanyForm
          company={editCompany}
          onClose={() => {
            setShowForm(false);
            setEditCompany(null);
          }}
          onSaved={loadCompanies}
        />
      )}
    </div>
  );
}
