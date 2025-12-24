import { useEffect, useState } from "react";
import { api } from "../lib/api";

export default function AuditLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    api.request("/admin/audit-logs").then(setLogs);
  }, []);


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Audit Logs</h1>
        <p className="text-gray-600 text-sm mt-1">Track system activities and user actions</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 divide-y divide-gray-200">
        {logs.map(log => (
          <div key={log.id} className="p-5 hover:bg-gray-50 transition">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="text-sm">
                  <span className="font-semibold text-gray-900">{log.user?.name || "System"}</span>
                  <span className="text-gray-600 mx-2">
                    {log.action.replace("_", " ").toLowerCase()}
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">
                    {log.module}
                  </span>
                </div>
              </div>
              <div className="text-xs text-gray-500 whitespace-nowrap ml-4">
                {new Date(log.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
