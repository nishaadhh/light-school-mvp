import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { ClipboardList, Filter, Search, User, Clock } from "lucide-react";
import { useState } from "react";

export default function AuditLogs() {
    const { data: logs } = useQuery({
        queryKey: ["/api/audit-logs"],
        queryFn: () => fetch("http://localhost:5000/api/audit-logs").then(r => r.json()),
    });

    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");

    const filteredLogs = (logs || []).filter((log: any) => {
        const matchesFilter = filter === "all" || log.role === filter;
        const matchesSearch = search === "" ||
            log.action.toLowerCase().includes(search.toLowerCase()) ||
            log.target.toLowerCase().includes(search.toLowerCase()) ||
            log.user.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const actionColors: Record<string, string> = {
        Created: "bg-green-100 text-green-700",
        Updated: "bg-blue-100 text-blue-700",
        Deleted: "bg-red-100 text-red-700",
        Backup: "bg-purple-100 text-purple-700",
    };

    const roleColors: Record<string, string> = {
        superadmin: "bg-purple-100 text-purple-700",
        admin: "bg-blue-100 text-blue-700",
        teacher: "bg-green-100 text-green-700",
    };

    return (
        <div className="p-6 max-w-5xl mx-auto space-y-8">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-3xl font-display font-bold text-gray-900 flex items-center gap-3">
                    <ClipboardList className="w-8 h-8 text-primary" /> Audit Logs
                </h1>
                <p className="text-muted-foreground mt-1">Track all system changes and user activities</p>
            </motion.div>

            {/* Filters */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search logs..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
                    />
                </div>
                <div className="flex gap-2">
                    {["all", "superadmin", "admin", "teacher"].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === f
                                    ? 'bg-primary text-white shadow-md'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* Timeline */}
            <div className="space-y-4">
                {filteredLogs.map((log: any, i: number) => (
                    <motion.div
                        key={log.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="glass-card p-5 rounded-2xl flex items-start gap-4"
                    >
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <User className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                                <span className="font-semibold text-gray-900 text-sm">{log.user}</span>
                                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${roleColors[log.role] || "bg-gray-100 text-gray-600"}`}>
                                    {log.role}
                                </span>
                                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${actionColors[log.action] || "bg-gray-100 text-gray-600"}`}>
                                    {log.action}
                                </span>
                            </div>
                            <p className="text-sm text-gray-700 font-medium">{log.target}</p>
                            <p className="text-xs text-muted-foreground mt-1">{log.details}</p>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-400 flex-shrink-0">
                            <Clock className="w-3 h-3" />
                            {new Date(log.timestamp).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
