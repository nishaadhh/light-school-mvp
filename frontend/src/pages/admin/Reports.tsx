import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { BarChart3, Users, DollarSign, CalendarCheck } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const COLORS = ['#3b82f6', '#22c55e', '#a855f7', '#f59e0b', '#ec4899'];

export default function Reports() {
    const { data: reports } = useQuery({
        queryKey: ["/api/reports"],
        queryFn: () => fetch("http://localhost:5000/api/reports").then(r => r.json()),
    });

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-3xl font-display font-bold text-gray-900 flex items-center gap-3">
                    <BarChart3 className="w-8 h-8 text-primary" /> Reports & Analytics
                </h1>
                <p className="text-muted-foreground mt-1">View comprehensive school analytics</p>
            </motion.div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                            <DollarSign className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="font-bold text-gray-900">Fee Collection</h3>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Collected</span>
                            <span className="text-sm font-bold text-green-600">₹{(reports?.feeCollection?.collected || 0).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Pending</span>
                            <span className="text-sm font-bold text-red-500">₹{(reports?.feeCollection?.pending || 0).toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: reports?.feeCollection ? `${(reports.feeCollection.collected / reports.feeCollection.total) * 100}%` : '0%' }} />
                        </div>
                    </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                            <Users className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="font-bold text-gray-900">Students by Class</h3>
                    </div>
                    <div className="space-y-2">
                        {(reports?.studentsByClass || []).map((cls: any) => (
                            <div key={cls.class} className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">{cls.class}</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-24 bg-gray-200 rounded-full h-2">
                                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(cls.count / 5) * 100}%` }} />
                                    </div>
                                    <span className="text-sm font-bold text-gray-900 w-6 text-right">{cls.count}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                            <CalendarCheck className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="font-bold text-gray-900">Attendance Rate</h3>
                    </div>
                    <div className="flex items-center justify-center py-4">
                        <div className="relative w-28 h-28">
                            <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="10" />
                                <circle cx="50" cy="50" r="40" fill="none" stroke="#a855f7" strokeWidth="10" strokeDasharray="251.2" strokeDashoffset="25.12" strokeLinecap="round" />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-2xl font-bold text-gray-900">90%</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Attendance Chart */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-6 rounded-2xl">
                    <h3 className="font-bold text-lg text-gray-900 mb-4">Weekly Attendance</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={reports?.attendanceSummary || []}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
                            <YAxis stroke="#94a3b8" fontSize={12} />
                            <Tooltip />
                            <Bar dataKey="present" fill="#22c55e" radius={[6, 6, 0, 0]} name="Present" />
                            <Bar dataKey="absent" fill="#ef4444" radius={[6, 6, 0, 0]} name="Absent" />
                        </BarChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Class Distribution Pie */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-card p-6 rounded-2xl">
                    <h3 className="font-bold text-lg text-gray-900 mb-4">Class Distribution</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={reports?.studentsByClass || []}
                                cx="50%"
                                cy="50%"
                                outerRadius={90}
                                dataKey="count"
                                nameKey="class"
                                label={({ name, value }) => `${name}: ${value}`}
                            >
                                {(reports?.studentsByClass || []).map((_: any, i: number) => (
                                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </motion.div>
            </div>
        </div>
    );
}
