import { motion } from "framer-motion";
import { DollarSign, CheckCircle, Clock, Receipt, CreditCard } from "lucide-react";
import { useState } from "react";

const mockFees = [
    { id: 1, month: "February 2026", amount: 2500, status: "pending", dueDate: "2026-02-10" },
    { id: 2, month: "January 2026", amount: 2500, status: "paid", dueDate: "2026-01-10", paidDate: "2026-01-08" },
    { id: 3, month: "December 2025", amount: 2500, status: "paid", dueDate: "2025-12-10", paidDate: "2025-12-09" },
    { id: 4, month: "November 2025", amount: 2500, status: "paid", dueDate: "2025-11-10", paidDate: "2025-11-07" },
];

export default function ParentFees() {
    const [showReceipt, setShowReceipt] = useState<number | null>(null);
    const [payingId, setPayingId] = useState<number | null>(null);
    const [paidId, setPaidId] = useState<number | null>(null);

    const handlePay = (id: number) => {
        setPayingId(id);
        setTimeout(() => {
            setPayingId(null);
            setPaidId(id);
        }, 2000);
    };

    return (
        <div className="p-6 max-w-lg mx-auto space-y-6 pb-24">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-2xl font-display font-bold text-gray-900 flex items-center gap-2">
                    <DollarSign className="w-7 h-7 text-primary" /> Fee Details
                </h1>
                <p className="text-sm text-muted-foreground mt-1">Anu Nair — LKG A</p>
            </motion.div>

            {/* Summary */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-5 rounded-2xl">
                <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-green-50 rounded-xl">
                        <p className="text-xs text-muted-foreground mb-1">Total Paid</p>
                        <p className="text-xl font-bold text-green-600">₹7,500</p>
                    </div>
                    <div className="text-center p-3 bg-red-50 rounded-xl">
                        <p className="text-xs text-muted-foreground mb-1">Pending</p>
                        <p className="text-xl font-bold text-red-500">₹2,500</p>
                    </div>
                </div>
            </motion.div>

            {/* Fee List */}
            <div className="space-y-3">
                {mockFees.map((fee, i) => {
                    const isPaid = fee.status === "paid" || paidId === fee.id;
                    const isPaying = payingId === fee.id;

                    return (
                        <motion.div
                            key={fee.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="glass-card p-4 rounded-2xl"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div>
                                    <h3 className="font-bold text-gray-900">{fee.month}</h3>
                                    <p className="text-xs text-muted-foreground">Due: {new Date(fee.dueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-bold text-gray-900">₹{fee.amount.toLocaleString()}</p>
                                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${isPaid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                        }`}>
                                        {isPaid ? <><CheckCircle className="w-3 h-3" /> Paid</> : <><Clock className="w-3 h-3" /> Pending</>}
                                    </span>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                {isPaid ? (
                                    <button
                                        onClick={() => setShowReceipt(showReceipt === fee.id ? null : fee.id)}
                                        className="flex-1 py-2 bg-green-100 text-green-700 rounded-xl text-sm font-semibold hover:bg-green-200 transition-colors flex items-center justify-center gap-1"
                                    >
                                        <Receipt className="w-3.5 h-3.5" /> {showReceipt === fee.id ? 'Hide Receipt' : 'View Receipt'}
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handlePay(fee.id)}
                                        disabled={isPaying}
                                        className="flex-1 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-1 disabled:opacity-50"
                                    >
                                        {isPaying ? (
                                            <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Processing...</>
                                        ) : (
                                            <><CreditCard className="w-3.5 h-3.5" /> Pay Now</>
                                        )}
                                    </button>
                                )}
                            </div>

                            {/* Receipt */}
                            {showReceipt === fee.id && (
                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                                    <div className="text-center mb-3">
                                        <h4 className="font-bold text-gray-900">Light International School</h4>
                                        <p className="text-xs text-muted-foreground">Payment Receipt</p>
                                    </div>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between"><span className="text-gray-500">Student:</span><span className="font-medium">Anu Nair</span></div>
                                        <div className="flex justify-between"><span className="text-gray-500">Class:</span><span className="font-medium">LKG A</span></div>
                                        <div className="flex justify-between"><span className="text-gray-500">Month:</span><span className="font-medium">{fee.month}</span></div>
                                        <div className="flex justify-between"><span className="text-gray-500">Amount:</span><span className="font-bold text-green-600">₹{fee.amount}</span></div>
                                        <div className="flex justify-between"><span className="text-gray-500">Paid On:</span><span className="font-medium">{fee.paidDate ? new Date(fee.paidDate).toLocaleDateString('en-IN') : 'Just now'}</span></div>
                                        <div className="flex justify-between"><span className="text-gray-500">Receipt #:</span><span className="font-medium">LIS-{fee.id.toString().padStart(4, '0')}</span></div>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
