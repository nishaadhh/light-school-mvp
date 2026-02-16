import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Users, Plus, GraduationCap, BookOpen, MoreVertical } from "lucide-react";
import { API_BASE_URL } from "@/lib/config";

const classAssignments: Record<string, string> = {
    "Anjali Teacher": "LKG A",
    "Priya Teacher": "LKG B",
    "Reshma Teacher": "UKG A",
};

const activityData: Record<string, { classes: number; attendance: string; lastActive: string }> = {
    "Anjali Teacher": { classes: 4, attendance: "98%", lastActive: "Today" },
    "Priya Teacher": { classes: 4, attendance: "95%", lastActive: "Today" },
    "Reshma Teacher": { classes: 4, attendance: "92%", lastActive: "Yesterday" },
};

export default function StaffManagement() {
    const { data: staff } = useQuery({
        queryKey: ["/api/staff"],
        queryFn: () => fetch(`${API_BASE_URL}/api/staff`).then(r => r.json()),
    });

    const teachers = staff || [];

    return (
        <div className="p-6 max-w-6xl mx-auto space-y-8">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-display font-bold text-gray-900 flex items-center gap-3">
                            <Users className="w-8 h-8 text-primary" /> Staff Management
                        </h1>
                        <p className="text-muted-foreground mt-1">Manage teachers and staff assignments</p>
                    </div>
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                        className="px-5 py-3 bg-primary text-white rounded-xl font-semibold flex items-center gap-2 shadow-lg shadow-primary/20">
                        <Plus className="w-4 h-4" /> Add Teacher
                    </motion.button>
                </div>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                    { label: "Total Teachers", value: teachers.length, color: "from-blue-500 to-blue-600", icon: Users },
                    { label: "Classes Covered", value: 3, color: "from-green-500 to-green-600", icon: BookOpen },
                    { label: "Avg Attendance Rate", value: "95%", color: "from-purple-500 to-purple-600", icon: GraduationCap },
                ].map((stat, i) => (
                    <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-5 rounded-2xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">{stat.label}</p>
                                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                            </div>
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                                <stat.icon className="w-5 h-5 text-white" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Teacher Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teachers.map((teacher: any, i: number) => {
                    const assigned = classAssignments[teacher.name] || "Unassigned";
                    const activity = activityData[teacher.name] || { classes: 0, attendance: "N/A", lastActive: "N/A" };

                    return (
                        <motion.div
                            key={teacher.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-card p-6 rounded-2xl hover:shadow-xl transition-all"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-green-500/30">
                                        {teacher.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">{teacher.name}</h3>
                                        <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-bold">{assigned}</span>
                                    </div>
                                </div>
                                <button className="p-1.5 hover:bg-gray-100 rounded-lg"><MoreVertical className="w-4 h-4 text-gray-400" /></button>
                            </div>

                            <div className="space-y-3 pt-4 border-t border-gray-100">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Students</span>
                                    <span className="font-semibold text-gray-900">{activity.classes}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Attendance Rate</span>
                                    <span className="font-semibold text-green-600">{activity.attendance}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Last Active</span>
                                    <span className="font-semibold text-gray-900">{activity.lastActive}</span>
                                </div>
                            </div>

                            <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                                <button className="flex-1 py-2 bg-primary/10 text-primary rounded-lg text-sm font-semibold hover:bg-primary/20 transition-colors">View Profile</button>
                                <button className="flex-1 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors">Reassign</button>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
