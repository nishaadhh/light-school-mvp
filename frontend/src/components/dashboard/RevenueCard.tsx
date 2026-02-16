import { TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { LineChart, Line, ResponsiveContainer } from "recharts";

const mockData = [
    { value: 12000 },
    { value: 15000 },
    { value: 13000 },
    { value: 18000 },
    { value: 16000 },
    { value: 22000 },
    { value: 25000 },
];

export function RevenueCard() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6 rounded-2xl"
        >
            <div className="flex items-start justify-between mb-4">
                <div>
                    <p className="text-muted-foreground text-sm font-medium mb-1">
                        Monthly Revenue
                    </p>
                    <h3 className="text-3xl font-display font-bold text-gray-900">
                        ₹2,50,000
                    </h3>
                    <div className="flex items-center gap-1 mt-2">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-semibold text-green-600">
                            +12.5%
                        </span>
                        <span className="text-xs text-muted-foreground">vs last month</span>
                    </div>
                </div>
                <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-green-600 shadow-lg shadow-green-500/30">
                    <TrendingUp className="w-6 h-6 text-white" />
                </div>
            </div>

            <div className="h-16 -mx-2">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockData}>
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#10b981"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
}
