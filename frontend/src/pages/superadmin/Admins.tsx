import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Users, Plus, Shield, Mail, MoreVertical } from "lucide-react";

export default function ManageAdmins() {
    const { data: users } = useQuery({
        queryKey: ["/api/users"],
        queryFn: () => fetch("http://localhost:5000/api/users").then(r => r.json()),
    });

    const admins = users?.filter((u: any) => u.role === 'admin' || u.role === 'superadmin') || [];
    const allUsers = users || [];

    return (
        <div className="p-6 max-w-5xl mx-auto space-y-8">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-display font-bold text-gray-900 flex items-center gap-3">
                            <Users className="w-8 h-8 text-primary" /> Manage Users
                        </h1>
                        <p className="text-muted-foreground mt-1">Create and manage user accounts</p>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-5 py-3 bg-primary text-white rounded-xl font-semibold flex items-center gap-2 shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
                    >
                        <Plus className="w-4 h-4" /> Add User
                    </motion.button>
                </div>
            </motion.div>

            {/* Admin Accounts */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-purple-500" /> Administrators
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {admins.map((admin: any, i: number) => (
                        <motion.div
                            key={admin.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-card p-5 rounded-2xl"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-4">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-xl ${admin.role === 'superadmin' ? 'bg-gradient-to-br from-purple-500 to-purple-600' : 'bg-gradient-to-br from-blue-500 to-blue-600'
                                        }`}>
                                        {admin.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">{admin.name}</h4>
                                        <p className="text-sm text-muted-foreground">@{admin.username}</p>
                                        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-bold mt-1 ${admin.role === 'superadmin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                                            }`}>
                                            {admin.role === 'superadmin' ? 'Super Admin' : 'Admin'}
                                        </span>
                                    </div>
                                </div>
                                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                    <MoreVertical className="w-4 h-4 text-gray-400" />
                                </button>
                            </div>
                            <div className="flex items-center gap-3 mt-4 pt-3 border-t border-gray-100">
                                <div className="flex items-center gap-1 text-xs text-green-600">
                                    <div className="w-2 h-2 bg-green-500 rounded-full" /> Active
                                </div>
                                <span className="text-xs text-gray-400">•</span>
                                <span className="text-xs text-gray-500">Last login: Today</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* All Users Table */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <h3 className="font-bold text-lg text-gray-900 mb-4">All Users ({allUsers.length})</h3>
                <div className="glass-card rounded-2xl overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50/80">
                                <th className="text-left py-3 px-5 text-xs font-semibold text-gray-500 uppercase">User</th>
                                <th className="text-left py-3 px-5 text-xs font-semibold text-gray-500 uppercase">Username</th>
                                <th className="text-left py-3 px-5 text-xs font-semibold text-gray-500 uppercase">Role</th>
                                <th className="text-left py-3 px-5 text-xs font-semibold text-gray-500 uppercase">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allUsers.map((user: any) => (
                                <tr key={user.id} className="border-t border-gray-100 hover:bg-gray-50/50 transition-colors">
                                    <td className="py-3 px-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                                                {user.name.charAt(0)}
                                            </div>
                                            <span className="text-sm font-medium text-gray-900">{user.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-5 text-sm text-gray-600">@{user.username}</td>
                                    <td className="py-3 px-5">
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${user.role === 'superadmin' ? 'bg-purple-100 text-purple-700' :
                                                user.role === 'admin' ? 'bg-blue-100 text-blue-700' :
                                                    user.role === 'teacher' ? 'bg-green-100 text-green-700' :
                                                        'bg-pink-100 text-pink-700'
                                            }`}>{user.role}</span>
                                    </td>
                                    <td className="py-3 px-5">
                                        <span className="flex items-center gap-1 text-xs text-green-600">
                                            <div className="w-2 h-2 bg-green-500 rounded-full" /> Active
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
}
