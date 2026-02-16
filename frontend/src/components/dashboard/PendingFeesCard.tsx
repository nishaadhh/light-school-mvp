import { Banknote, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

export function PendingFeesCard() {
    const { data: fees } = useQuery({
        queryKey: ["/api/fees"],
    });

    const pendingFees = fees?.filter((f: any) => f.status === "pending") || [];
    const totalPending = pendingFees.reduce((sum: number, f: any) => sum + f.amount, 0);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6 rounded-2xl"
        >
            <div className="flex items-start justify-between mb-4">
                <div>
                    <p className="text-muted-foreground text-sm font-medium mb-1">
                        Pending Fees
                    </p>
                    <h3 className="text-3xl font-display font-bold text-gray-900">
                        ₹{totalPending.toLocaleString()}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                        {pendingFees.length} students
                    </p>
                </div>
                <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg shadow-orange-500/30">
                    <Banknote className="w-6 h-6 text-white" />
                </div>
            </div>

            <div className="space-y-2 mt-4">
                {pendingFees.slice(0, 3).map((fee: any, idx: number) => (
                    <motion.div
                        key={fee.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + idx * 0.1 }}
                        className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-100"
                    >
                        <div className="flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-orange-600" />
                            <span className="text-sm font-medium text-gray-900">
                                {fee.studentName}
                            </span>
                        </div>
                        <span className="text-sm font-semibold text-orange-600">
                            ₹{fee.amount}
                        </span>
                    </motion.div>
                ))}
            </div>

            {pendingFees.length > 3 && (
                <button className="w-full mt-3 text-sm text-primary font-semibold hover:underline">
                    View all {pendingFees.length} pending
                </button>
            )}
        </motion.div>
    );
}
