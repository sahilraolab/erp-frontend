import { useEffect, useState } from "react";
import { api } from "../lib/api";

export default function RolePermissions({ role, onClose, onSaved }) {
    const [allPermissions, setAllPermissions] = useState([]);
    const [selected, setSelected] = useState(
        role.permissions.map(p => p.key)
    );

    useEffect(() => {
        api.request("/admin/roles").then(res => {
            const perms = new Set();
            res.forEach(r => r.permissions.forEach(p => perms.add(p.key)));
            setAllPermissions([...perms].sort());
        });
    }, []);

    const toggle = key => {
        setSelected(prev =>
            prev.includes(key)
                ? prev.filter(p => p !== key)
                : [...prev, key]
        );
    };

    const save = async () => {
        await api.request(`/admin/roles/${role.id}/permissions`, {
            method: "POST",
            body: JSON.stringify({ permissions: selected }),
        });
        onSaved();
    };

    return (
        <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] flex flex-col">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                    Manage Permissions
                </h2>
                <p className="text-xs text-gray-600 mt-1">
                    Configure permissions for <span className="font-medium">{role.name}</span>
                </p>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {allPermissions.map(p => (
                        <label
                            key={p}
                            className="flex items-start gap-3 p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer transition"
                        >
                            <input
                                type="checkbox"
                                className="mt-0.5 w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-800"
                                checked={selected.includes(p)}
                                onChange={() => toggle(p)}
                            />
                            <span className="text-sm text-gray-700 leading-tight">{p}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-between items-center">
                <div className="text-sm text-gray-600">
                    <span className="font-medium">{selected.length}</span> of {allPermissions.length} permissions selected
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={save}
                        className="px-5 py-2.5 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-md transition"
                    >
                        Save Permissions
                    </button>
                </div>
            </div>
        </div>
    );
}
