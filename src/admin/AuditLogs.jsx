import { useEffect, useState } from "react";
import { api } from "../lib/api";

export default function AuditLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    api.request("/admin/audit-logs").then(setLogs);
  }, []);


  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Audit Logs</h1>

      <ul className="space-y-2">
        {logs.map(log => (
          <li key={log.id} className="bg-white p-3 rounded shadow text-sm">
            <b>{log.user?.name || "System"}</b>{" "}
            {log.action.replace("_", " ").toLowerCase()}
            {" "}({log.module})
            <span className="text-gray-500 text-xs">
              {new Date(log.createdAt).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
