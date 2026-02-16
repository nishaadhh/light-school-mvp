import { CalendarCheck } from "lucide-react";
import { motion } from "framer-motion";

interface AttendanceOverviewProps {
    present: number;
    total: number;
}

export function AttendanceOverview({ present, total }: AttendanceOverviewProps) {
    const percentage = Math.round((present / total) * 100);
    const circumference = 2 * Math.PI * 45;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6 rounded-2xl"
        >
            <div className="flex items-start justify-between mb-4">
                <div>
                    <p className="text-muted-foreground text-sm font-medium mb-1">
                        Today's Attendance
                    </p>
                    <h3 className="text-3xl font-display font-bold text-gray-900">
                        {percentage}%
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                        {present} of {total} students
                    </p>
                </div>
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30">
                    <CalendarCheck className="w-6 h-6 text-white" />
                </div>
            </div>

            <div className="flex items-center justify-center mt-4">
                <svg className="transform -rotate-90" width="120" height="120">
                    <circle
                        cx="60"
                        cy="60"
                        r="45"
                        stroke="#e5e7eb"
                        strokeWidth="8"
                        fill="none"
                    />
                    <motion.circle
                        cx="60"
                        cy="60"
                        r="45"
                        stroke="#3b82f6"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        strokeLinecap="round"
                    />
                </svg>
            </div>
        </motion.div>
    );
}
