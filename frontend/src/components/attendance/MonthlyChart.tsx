import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { motion } from "framer-motion";

const mockData = [
    { day: "Mon", present: 7, absent: 1 },
    { day: "Tue", present: 8, absent: 0 },
    { day: "Wed", present: 6, absent: 2 },
    { day: "Thu", present: 8, absent: 0 },
    { day: "Fri", present: 7, absent: 1 },
];

export function MonthlyAttendanceChart() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6 rounded-2xl mt-6"
        >
            <h3 className="font-bold text-lg mb-4 text-gray-900">This Week's Attendance</h3>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockData}>
                        <XAxis dataKey="day" stroke="#9ca3af" />
                        <YAxis stroke="#9ca3af" />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "rgba(255, 255, 255, 0.95)",
                                border: "1px solid #e5e7eb",
                                borderRadius: "0.75rem",
                                boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)"
                            }}
                        />
                        <Bar dataKey="present" fill="#10b981" radius={[8, 8, 0, 0]} />
                        <Bar dataKey="absent" fill="#ef4444" radius={[8, 8, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-sm text-gray-600">Present</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-sm text-gray-600">Absent</span>
                </div>
            </div>
        </motion.div>
    );
}
