import { motion } from "framer-motion";
import { Database, Download, Upload, Clock, HardDrive, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";

const backups = [
    { id: 1, name: "Full System Backup", date: "2026-02-09T02:00:00", size: "12.4 MB", status: "success", type: "automatic" },
    { id: 2, name: "Full System Backup", date: "2026-02-02T02:00:00", size: "11.8 MB", status: "success", type: "automatic" },
    { id: 3, name: "Manual Backup", date: "2026-01-28T14:30:00", size: "11.2 MB", status: "success", type: "manual" },
    { id: 4, name: "Full System Backup", date: "2026-01-26T02:00:00", size: "10.9 MB", status: "success", type: "automatic" },
    { id: 5, name: "Pre-Update Backup", date: "2026-01-20T09:15:00", size: "10.5 MB", status: "success", type: "manual" },
];

export default function BackupRestore() {
    const [creating, setCreating] = useState(false);
    const [created, setCreated] = useState(false);

    const handleCreateBackup = () => {
        setCreating(true);
        setTimeout(() => {
            setCreating(false);
            setCreated(true);
            setTimeout(() => setCreated(false), 3000);
        }, 2000);
    };

    return (
        <div className="p-6 max-w-5xl mx-auto space-y-8">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-3xl font-display font-bold text-gray-900 flex items-center gap-3">
                    <Database className="w-8 h-8 text-primary" /> Backup & Restore
                </h1>
                <p className="text-muted-foreground mt-1">Manage system backups and data recovery</p>
            </motion.div>

            {/* Actions Row */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCreateBackup}
                    disabled={creating}
                    className="glass-card p-6 rounded-2xl text-left hover:shadow-xl transition-all group"
                >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        {creating ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : created ? (
                            <CheckCircle className="w-6 h-6 text-white" />
                        ) : (
                            <Download className="w-6 h-6 text-white" />
                        )}
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">
                        {creating ? 'Creating Backup...' : created ? 'Backup Created!' : 'Create Backup'}
                    </h3>
                    <p className="text-xs text-muted-foreground">Create a full system backup now</p>
                </motion.button>

                <div className="glass-card p-6 rounded-2xl text-left">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-3">
                        <Upload className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">Restore Data</h3>
                    <p className="text-xs text-muted-foreground">Restore from a previous backup</p>
                </div>

                <div className="glass-card p-6 rounded-2xl text-left">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-3">
                        <Clock className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">Auto-Backup</h3>
                    <p className="text-xs text-muted-foreground">Every Sunday at 2:00 AM IST</p>
                    <span className="inline-flex px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold mt-2">Enabled</span>
                </div>
            </motion.div>

            {/* Storage Info */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                        <HardDrive className="w-5 h-5 text-primary" /> Storage
                    </h3>
                    <span className="text-sm text-muted-foreground">12.4 MB / 1 GB used</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-gradient-to-r from-primary to-purple-500 h-3 rounded-full transition-all" style={{ width: '1.2%' }} />
                </div>
            </motion.div>

            {/* Backup History */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <h3 className="font-bold text-lg text-gray-900 mb-4">Backup History</h3>
                <div className="space-y-3">
                    {backups.map((backup, i) => (
                        <motion.div
                            key={backup.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="glass-card p-4 rounded-xl flex items-center justify-between"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-900">{backup.name}</h4>
                                    <p className="text-xs text-muted-foreground">
                                        {new Date(backup.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-bold ${backup.type === 'automatic' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                                    }`}>
                                    {backup.type}
                                </span>
                                <span className="text-sm text-gray-500">{backup.size}</span>
                                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                    <Download className="w-4 h-4 text-gray-400" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
