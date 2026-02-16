import { useFees } from "@/hooks/use-fees";
import { useState } from "react";
import { Banknote, Download, Eye, Filter, Search } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Fee {
    id: number;
    studentName: string;
    amount: number;
    status: "paid" | "pending" | "overdue";
    dueDate: string;
    month: string;
}

function InvoiceModal({ fee, open, onClose }: { fee: Fee | null; open: boolean; onClose: () => void }) {
    if (!fee) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Fee Invoice</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                    <div className="glass-card p-6 rounded-xl">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-bold text-lg">{fee.studentName}</h3>
                                <p className="text-sm text-muted-foreground">Month: {fee.month}</p>
                            </div>
                            <span className={cn(
                                "px-3 py-1 rounded-full text-xs font-semibold",
                                fee.status === "paid" ? "bg-green-100 text-green-700" :
                                    fee.status === "pending" ? "bg-orange-100 text-orange-700" :
                                        "bg-red-100 text-red-700"
                            )}>
                                {fee.status.toUpperCase()}
                            </span>
                        </div>

                        <div className="space-y-2 border-t border-gray-200 pt-4">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Tuition Fee</span>
                                <span className="font-semibold">₹{fee.amount}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Transport Fee</span>
                                <span className="font-semibold">₹500</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Activity Fee</span>
                                <span className="font-semibold">₹300</span>
                            </div>
                            <div className="flex justify-between pt-2 border-t border-gray-200">
                                <span className="font-bold">Total Amount</span>
                                <span className="font-bold text-lg text-primary">₹{fee.amount + 800}</span>
                            </div>
                        </div>

                        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                            <p className="text-xs text-blue-700">
                                <strong>Due Date:</strong> {new Date(fee.dueDate).toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Button className="flex-1" variant="outline">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                        </Button>
                        {fee.status !== "paid" && (
                            <Button className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                                Mark as Paid
                            </Button>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default function FeesPage() {
    const { data: fees, isLoading } = useFees();
    const [search, setSearch] = useState("");
    const [selectedFee, setSelectedFee] = useState<Fee | null>(null);
    const [invoiceOpen, setInvoiceOpen] = useState(false);

    const filteredFees = fees?.filter((f: Fee) =>
        f.studentName.toLowerCase().includes(search.toLowerCase())
    );

    const totalPending = fees?.filter((f: Fee) => f.status === "pending").reduce((sum: number, f: Fee) => sum + f.amount, 0) || 0;
    const totalPaid = fees?.filter((f: Fee) => f.status === "paid").reduce((sum: number, f: Fee) => sum + f.amount, 0) || 0;

    const handleViewInvoice = (fee: Fee) => {
        setSelectedFee(fee);
        setInvoiceOpen(true);
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-4xl font-display font-bold bg-gradient-to-r from-primary via-purple-600 to-pink-500 bg-clip-text text-transparent mb-2">
                    Fees Management
                </h1>
                <p className="text-muted-foreground text-lg">Track and manage student fees</p>
            </motion.div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="glass-card p-6 rounded-2xl"
                >
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground mb-1">Total Collected</p>
                            <h3 className="text-3xl font-bold text-green-600">₹{totalPaid.toLocaleString()}</h3>
                        </div>
                        <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-green-600 shadow-lg shadow-green-500/30">
                            <Banknote className="w-6 h-6 text-white" />
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass-card p-6 rounded-2xl"
                >
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground mb-1">Pending Amount</p>
                            <h3 className="text-3xl font-bold text-orange-600">₹{totalPending.toLocaleString()}</h3>
                        </div>
                        <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg shadow-orange-500/30">
                            <Banknote className="w-6 h-6 text-white" />
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="glass-card p-6 rounded-2xl"
                >
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground mb-1">Collection Rate</p>
                            <h3 className="text-3xl font-bold text-primary">
                                {fees && fees.length > 0 ? Math.round((totalPaid / (totalPaid + totalPending)) * 100) : 0}%
                            </h3>
                        </div>
                        <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-purple-600 shadow-lg shadow-primary/30">
                            <Banknote className="w-6 h-6 text-white" />
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Fees Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="glass-card rounded-2xl overflow-hidden"
            >
                <div className="p-4 border-b border-gray-200 flex gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search students..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-10 border-none bg-gray-50 rounded-xl"
                        />
                    </div>
                    <Button variant="outline" size="icon" className="shrink-0 rounded-xl">
                        <Filter className="w-4 h-4" />
                    </Button>
                </div>

                {isLoading ? (
                    <div className="p-8 text-center text-muted-foreground">Loading fees...</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-500 font-medium">
                                <tr>
                                    <th className="px-6 py-4">Student Name</th>
                                    <th className="px-6 py-4">Month</th>
                                    <th className="px-6 py-4">Amount</th>
                                    <th className="px-6 py-4">Due Date</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredFees?.map((fee: Fee, idx: number) => (
                                    <motion.tr
                                        key={fee.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="px-6 py-4 font-medium text-gray-900">{fee.studentName}</td>
                                        <td className="px-6 py-4 text-gray-600">{fee.month}</td>
                                        <td className="px-6 py-4 font-semibold text-gray-900">₹{fee.amount}</td>
                                        <td className="px-6 py-4 text-gray-600">
                                            {new Date(fee.dueDate).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={cn(
                                                "px-3 py-1 rounded-full text-xs font-semibold",
                                                fee.status === "paid" ? "bg-green-100 text-green-700" :
                                                    fee.status === "pending" ? "bg-orange-100 text-orange-700" :
                                                        "bg-red-100 text-red-700"
                                            )}>
                                                {fee.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleViewInvoice(fee)}
                                                className="rounded-lg"
                                            >
                                                <Eye className="w-4 h-4 mr-1" />
                                                View
                                            </Button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </motion.div>

            <InvoiceModal fee={selectedFee} open={invoiceOpen} onClose={() => setInvoiceOpen(false)} />
        </div>
    );
}
