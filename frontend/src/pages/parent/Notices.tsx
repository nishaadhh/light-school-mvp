import { useNotices } from "@/hooks/use-notices";
import { formatDistanceToNow } from "date-fns";
import { Megaphone, Calendar, Filter } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ParentNotices() {
  const { data: notices, isLoading } = useNotices();
  const [filter, setFilter] = useState<string>("all");

  const filteredNotices = notices?.filter((n: any) =>
    filter === "all" || n.type === filter
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 pb-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-primary via-purple-600 to-pink-500 p-6 pb-16 rounded-b-[2.5rem] shadow-2xl"
      >
        <h1 className="text-3xl font-bold font-display text-white mb-2">School Notices</h1>
        <p className="text-white/80">Stay updated with school announcements</p>
      </motion.div>

      <div className="px-6 -mt-10 space-y-5">
        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-4 rounded-2xl shadow-xl"
        >
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-semibold text-gray-700">Filter by Type</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {["all", "event", "general"].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${filter === type
                    ? "bg-primary text-white shadow-lg shadow-primary/30"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Notices List */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="glass-card p-6 rounded-2xl shadow-xl text-center text-gray-500">
              Loading notices...
            </div>
          ) : (
            filteredNotices?.map((notice: any, idx: number) => (
              <motion.div
                key={notice.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + idx * 0.05 }}
                className="glass-card p-5 rounded-2xl shadow-xl border-l-4 border-purple-500"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${notice.type === "event"
                      ? "bg-purple-100 text-purple-600"
                      : "bg-blue-100 text-blue-600"
                    }`}>
                    <Megaphone className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${notice.type === "event"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-blue-100 text-blue-700"
                        }`}>
                        {notice.type}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDistanceToNow(new Date(notice.date), { addSuffix: true })}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">{notice.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{notice.content}</p>
                  </div>
                </div>
              </motion.div>
            ))
          )}

          {filteredNotices?.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-card p-10 rounded-2xl shadow-xl text-center"
            >
              <Megaphone className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500 font-medium">No notices found for this filter.</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
