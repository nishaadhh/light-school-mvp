import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Users, GraduationCap, DollarSign, Shield, Server, Clock, Activity, Database } from "lucide-react";

export default function SuperAdminDashboard() {
    const { data: stats } = useQuery({
        queryKey: ["/api/system-stats"],
        queryFn: () => fetch("http://localhost:5000/api/system-stats").then(r => r.json()),
    });

    const cards = [
        { title: "Total Users", value: stats?.totalUsers || 0, icon: Users, color: "from-blue-500 to-blue-600", shadow: "shadow-blue-500/30", trend: "Active" },
        { title: "Total Students", value: stats?.totalStudents || 0, icon: GraduationCap, color: "from-green-500 to-green-600", shadow: "shadow-green-500/30", trend: "+3 this month" },
        { title: "Total Revenue", value: `₹${(stats?.totalRevenue || 0).toLocaleString()}`, icon: DollarSign, color: "from-purple-500 to-purple-600", shadow: "shadow-purple-500/30", trend: "Collected" },
        { title: "System Health", value: stats?.systemHealth || "—", icon: Activity, color: "from-emerald-500 to-emerald-600", shadow: "shadow-emerald-500/30", trend: stats?.uptime || "—" },
    ];

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-white" />
                    </div>
                    <h1 className="text-3xl font-display font-bold text-gray-900">System Dashboard</h1>
                </div>
                <p className="text-muted-foreground">System-wide overview and configuration</p>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, i) => (
                    <motion.div
                        key={card.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card p-6 rounded-2xl"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground font-medium mb-1">{card.title}</p>
                                <h3 className="text-3xl font-display font-bold text-gray-900">{card.value}</h3>
                                <p className="text-xs text-green-600 font-semibold mt-1">{card.trend}</p>
                            </div>
                            <div className={`p-3 rounded-xl bg-gradient-to-br ${card.color} shadow-lg ${card.shadow}`}>
                                <card.icon className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* System Info Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Quick Info */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-card p-6 rounded-2xl">
                    <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                        <Server className="w-5 h-5 text-primary" /> System Information
                    </h3>
                    <div className="space-y-4">
                        {[
                            { label: "Platform Version", value: "v2.1.0" },
                            { label: "Database", value: "In-Memory (Demo)" },
                            { label: "API Status", value: "Running", badge: "bg-green-100 text-green-700" },
                            { label: "Total Admins", value: stats?.totalAdmins || 0 },
                            { label: "Total Teachers", value: stats?.totalTeachers || 0 },
                            { label: "Uptime", value: stats?.uptime || "99.9%" },
                        ].map((item) => (
                            <div key={item.label} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                                <span className="text-sm text-muted-foreground">{item.label}</span>
                                {item.badge ? (
                                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${item.badge}`}>{item.value}</span>
                                ) : (
                                    <span className="text-sm font-semibold text-gray-900">{item.value}</span>
                                )}
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Last Backup */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="glass-card p-6 rounded-2xl">
                    <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                        <Database className="w-5 h-5 text-primary" /> Backup Status
                    </h3>
                    <div className="space-y-4">
                        <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                                <span className="text-sm font-semibold text-green-700">Last Backup: Successful</span>
                            </div>
                            <p className="text-xs text-green-600">{stats?.lastBackup ? new Date(stats.lastBackup).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'N/A'}</p>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                            <span className="text-sm font-semibold text-blue-700">Auto-Backup: Enabled</span>
                            <p className="text-xs text-blue-600 mt-1">Every Sunday at 2:00 AM IST</p>
                        </div>
                        <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                            <span className="text-sm font-semibold text-purple-700">Storage Used: 12.4 MB / 1 GB</span>
                            <div className="w-full bg-purple-200 rounded-full h-2 mt-2">
                                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '1.2%' }} />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Quick Actions */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="glass-card p-6 rounded-2xl">
                <h3 className="font-bold text-lg mb-4 text-gray-900 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" /> Quick Actions
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: "School Settings", icon: "⚙️", bg: "from-blue-50 to-blue-100", border: "border-blue-200" },
                        { label: "Manage Admins", icon: "👥", bg: "from-purple-50 to-purple-100", border: "border-purple-200" },
                        { label: "View Audit Logs", icon: "📋", bg: "from-green-50 to-green-100", border: "border-green-200" },
                        { label: "Create Backup", icon: "💾", bg: "from-orange-50 to-orange-100", border: "border-orange-200" },
                    ].map((action) => (
                        <button key={action.label} className={`p-4 bg-gradient-to-br ${action.bg} rounded-xl hover:shadow-lg transition-all text-left border ${action.border} group`}>
                            <span className="text-2xl mb-2 block">{action.icon}</span>
                            <span className="font-semibold text-sm text-gray-900">{action.label}</span>
                        </button>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
