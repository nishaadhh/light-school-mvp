import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Megaphone, Plus, Send, Camera } from "lucide-react";
import { useState } from "react";
import { API_BASE_URL } from "@/lib/config";

export default function TeacherNotices() {
    const { data: notices } = useQuery({
        queryKey: ["/api/notices"],
        queryFn: () => fetch(`${API_BASE_URL}/api/notices`).then(r => r.json()),
    });

    const [showForm, setShowForm] = useState(false);

    return (
        <div className="p-6 max-w-4xl mx-auto space-y-6">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-display font-bold text-gray-900 flex items-center gap-3">
                            <Megaphone className="w-8 h-8 text-primary" /> Class Notices
                        </h1>
                        <p className="text-muted-foreground mt-1">Send notices to parents of your class</p>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowForm(!showForm)}
                        className="px-5 py-3 bg-primary text-white rounded-xl font-semibold flex items-center gap-2 shadow-lg shadow-primary/20"
                    >
                        <Plus className="w-4 h-4" /> New Notice
                    </motion.button>
                </div>
            </motion.div>

            {/* New Notice Form */}
            {showForm && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="glass-card p-6 rounded-2xl space-y-4">
                    <h3 className="font-bold text-gray-900">Send Class Notice</h3>
                    <input type="text" placeholder="Notice title..." className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none" />
                    <textarea placeholder="Notice content..." rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none resize-none" />
                    <div className="flex items-center gap-4">
                        <select className="px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/30 outline-none">
                            <option>LKG A (My Class)</option>
                        </select>
                        <button className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                            <Camera className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-6 py-2 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all flex items-center gap-2">
                            <Send className="w-4 h-4" /> Send Notice
                        </button>
                        <button onClick={() => setShowForm(false)} className="px-6 py-2 bg-gray-100 text-gray-600 rounded-xl font-semibold hover:bg-gray-200 transition-all">Cancel</button>
                    </div>
                </motion.div>
            )}

            {/* Notices List */}
            <div className="space-y-4">
                {(notices || []).map((notice: any, i: number) => (
                    <motion.div
                        key={notice.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="glass-card p-5 rounded-2xl"
                    >
                        <div className="flex items-start gap-4">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${notice.type === 'event' ? 'bg-purple-100' : 'bg-blue-100'
                                }`}>
                                <Megaphone className={`w-5 h-5 ${notice.type === 'event' ? 'text-purple-600' : 'text-blue-600'}`} />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-gray-900">{notice.title}</h3>
                                <p className="text-sm text-gray-600 mt-1">{notice.content}</p>
                                <div className="flex items-center gap-2 mt-3">
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${notice.type === 'event' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                                        }`}>{notice.type}</span>
                                    <span className="text-xs text-muted-foreground">
                                        {new Date(notice.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
