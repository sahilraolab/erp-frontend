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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Companies</h1>
          <p className="text-gray-600 text-sm mt-1">Manage company master data</p>
        </div>

        {can("masters.create") && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-black hover:bg-gray-900 text-white font-medium px-5 py-2.5 rounded-md transition-colors duration-200"
          >
            + Create Company
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Code</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">GSTIN</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">PAN</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Currency</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {companies.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-500 text-sm">
                  No companies found. Create one to get started.
                </td>
              </tr>
            ) : (
              companies.map(c => (
                <tr key={c.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{c.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-mono">{c.code}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{c.gstin || "-"}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{c.pan || "-"}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{c.currency}</td>
                  <td className="px-6 py-4 text-right">
                    {can("masters.update") && (
                      <button
                        onClick={() => {
                          setEditCompany(c);
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
          <CompanyForm
            company={editCompany}
            onClose={() => {
              setShowForm(false);
              setEditCompany(null);
            }}
            onSaved={loadCompanies}
          />
        </div>
      )}
    </div>
  );
}
