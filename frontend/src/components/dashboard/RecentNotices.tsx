import { Megaphone, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";

export function RecentNotices() {
    const { data: notices } = useQuery({
        queryKey: ["/api/notices"],
    });

    const recentNotices = notices?.slice(0, 4) || [];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-6 rounded-2xl"
        >
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-100">
                        <Megaphone className="w-5 h-5 text-purple-600" />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900">Recent Notices</h3>
                </div>
                <button className="text-sm text-primary font-semibold hover:underline">
                    View All
                </button>
            </div>

            <div className="space-y-4">
                {recentNotices.map((notice: any, idx: number) => (
                    <motion.div
                        key={notice.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + idx * 0.1 }}
                        className="relative pl-6 pb-4 border-l-2 border-gray-200 last:border-l-0 last:pb-0"
                    >
                        <div className="absolute left-0 top-1 -translate-x-1/2 w-3 h-3 rounded-full bg-primary border-2 border-white" />

                        <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                                <h4 className="font-semibold text-gray-900 mb-1">
                                    {notice.title}
                                </h4>
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                    {notice.content}
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                    <Calendar className="w-3 h-3 text-muted-foreground" />
                                    <span className="text-xs text-muted-foreground">
                                        {formatDistanceToNow(new Date(notice.date), { addSuffix: true })}
                                    </span>
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${notice.type === 'event'
                                            ? 'bg-purple-100 text-purple-700'
                                            : 'bg-blue-100 text-blue-700'
                                        }`}>
                                        {notice.type}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {recentNotices.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                    <Megaphone className="w-12 h-12 mx-auto mb-2 opacity-20" />
                    <p className="text-sm">No notices yet</p>
                </div>
            )}
        </motion.div>
    );
}
