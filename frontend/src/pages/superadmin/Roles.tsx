import { motion } from "framer-motion";
import { Shield, Check, X } from "lucide-react";

const roles = ["Super Admin", "Admin", "Teacher", "Parent"];
const permissions = [
    "View Dashboard",
    "Manage Students",
    "Manage Fees",
    "Manage Staff",
    "Mark Attendance",
    "Post Notices",
    "View Reports",
    "School Settings",
    "Manage Roles",
    "Audit Logs",
    "Backup Data",
];

const matrix: Record<string, boolean[]> = {
    "Super Admin": [true, true, true, true, true, true, true, true, true, true, true],
    "Admin": [true, true, true, true, true, true, true, false, false, false, false],
    "Teacher": [false, false, false, false, true, true, false, false, false, false, false],
    "Parent": [false, false, false, false, false, false, false, false, false, false, false],
};

export default function RolesPermissions() {
    return (
        <div className="p-6 max-w-6xl mx-auto space-y-8">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-3xl font-display font-bold text-gray-900 flex items-center gap-3">
                    <Shield className="w-8 h-8 text-primary" /> Roles & Permissions
                </h1>
                <p className="text-muted-foreground mt-1">Control access levels for each user role</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50/80">
                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 min-w-[200px]">Permission</th>
                                {roles.map(role => (
                                    <th key={role} className="text-center py-4 px-4 text-sm font-semibold text-gray-700 min-w-[120px]">
                                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${role === 'Super Admin' ? 'bg-purple-100 text-purple-700' :
                                                role === 'Admin' ? 'bg-blue-100 text-blue-700' :
                                                    role === 'Teacher' ? 'bg-green-100 text-green-700' :
                                                        'bg-pink-100 text-pink-700'
                                            }`}>{role}</span>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {permissions.map((perm, i) => (
                                <motion.tr
                                    key={perm}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.03 }}
                                    className="border-t border-gray-100 hover:bg-gray-50/50 transition-colors"
                                >
                                    <td className="py-4 px-6 text-sm font-medium text-gray-800">{perm}</td>
                                    {roles.map(role => (
                                        <td key={role} className="text-center py-4 px-4">
                                            {matrix[role][i] ? (
                                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                                                    <Check className="w-4 h-4 text-green-600" />
                                                </div>
                                            ) : (
                                                <div className="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center mx-auto">
                                                    <X className="w-4 h-4 text-red-400" />
                                                </div>
                                            )}
                                        </td>
                                    ))}
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <p className="text-sm text-amber-700 font-medium">
                    ⚠️ Permission changes will take effect immediately. Contact system administrator for custom role configurations.
                </p>
            </motion.div>
        </div>
    );
}
