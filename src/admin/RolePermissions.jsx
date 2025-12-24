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
        <div className="bg-white p-6 rounded shadow max-w-3xl">
            <h2 className="font-semibold mb-4">
                Permissions – {role.name}
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm max-h-96 overflow-y-auto">
                {allPermissions.map(p => (
                    <label key={p} className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={selected.includes(p)}
                            onChange={() => toggle(p)}
                        />
                        {p}
                    </label>
                ))}
            </div>

            <div className="mt-4 flex justify-end gap-2">
                <button onClick={onClose}>Cancel</button>
                <button
                    onClick={save}
                    className="bg-gray-900 text-white px-4 py-2 rounded"
                >
                    Save Permissions
                </button>
            </div>
        </div>
    );
}
