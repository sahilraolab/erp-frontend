export function MasterList({ title, description, items, columns, actions, onAdd, addLabel, emptyMessage }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-600 text-sm mt-1">{description}</p>
        </div>
        {onAdd && (
          <button
            onClick={onAdd}
            className="bg-black hover:bg-gray-900 text-white font-medium px-5 py-2.5 rounded-md transition-colors duration-200"
          >
            + {addLabel || "Create"}
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider ${
                    col.align === "right" ? "text-right" : ""
                  }`}
                >
                  {col.label}
                </th>
              ))}
              {actions && <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">Action</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {items.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)} className="px-6 py-8 text-center text-gray-500 text-sm">
                  {emptyMessage || "No records found"}
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition">
                  {columns.map((col) => (
                    <td
                      key={`${item.id}-${col.key}`}
                      className={`px-6 py-4 text-sm ${
                        col.isMono ? "font-mono text-gray-600" : col.isBold ? "font-medium text-gray-900" : "text-gray-600"
                      }`}
                    >
                      {col.render ? col.render(item[col.key], item) : item[col.key]}
                    </td>
                  ))}
                  {actions && (
                    <td className="px-6 py-4 text-right space-x-3">
                      {actions(item).map((action, idx) => (
                        <button
                          key={idx}
                          onClick={action.onClick}
                          className="text-sm font-medium text-black hover:text-gray-700 transition"
                        >
                          {action.label}
                        </button>
                      ))}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
