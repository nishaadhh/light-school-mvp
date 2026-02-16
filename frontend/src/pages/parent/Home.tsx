import { useAuth } from "@/hooks/use-auth";
import { useNotices } from "@/hooks/use-notices";
import { CalendarCheck, CreditCard, ChevronRight, TrendingUp, Image, User } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

export default function ParentHome() {
  const { user } = useAuth();
  const { data: notices } = useNotices();

  // Get latest notice
  const latestNotice = notices?.[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 pb-24">
      {/* Header with Gradient */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-primary via-purple-600 to-pink-500 p-6 pb-16 rounded-b-[2.5rem] shadow-2xl"
      >
        <div className="flex justify-between items-center text-white mb-6">
          <div>
            <p className="text-white/80 text-sm mb-1">Welcome back,</p>
            <h1 className="text-3xl font-bold font-display">{user?.name}</h1>
          </div>
          <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white/30">
            <User className="w-6 h-6" />
          </div>
        </div>

        {/* Student Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-5 text-white border-2 border-white/30"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-full p-1 shadow-lg">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Anu`}
                alt="Student"
                className="w-full h-full rounded-full"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-xl mb-1">Anu Nair</h3>
              <p className="text-white/80 text-sm">Class LKG A • Roll No. 1</p>
            </div>
            <Link href="/parent/profile">
              <ChevronRight className="w-6 h-6 text-white/60" />
            </Link>
          </div>
        </motion.div>
      </motion.div>

      <div className="px-6 -mt-10 space-y-5">
        {/* Attendance Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6 rounded-2xl shadow-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                <CalendarCheck className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Attendance</p>
                <h3 className="text-lg font-bold text-gray-900">This Month</h3>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-green-600">90%</p>
              <p className="text-xs text-green-700 font-medium flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +5%
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-green-50 p-3 rounded-xl text-center border border-green-100">
              <p className="text-2xl font-bold text-green-600">18</p>
              <p className="text-xs text-green-700 font-medium mt-1">Present</p>
            </div>
            <div className="bg-red-50 p-3 rounded-xl text-center border border-red-100">
              <p className="text-2xl font-bold text-red-600">2</p>
              <p className="text-xs text-red-700 font-medium mt-1">Absent</p>
            </div>
            <div className="bg-orange-50 p-3 rounded-xl text-center border border-orange-100">
              <p className="text-2xl font-bold text-orange-600">0</p>
              <p className="text-xs text-orange-700 font-medium mt-1">Late</p>
            </div>
          </div>
        </motion.div>

        {/* Fee Payment Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6 rounded-2xl shadow-xl border-l-4 border-orange-500"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Fee Payment</p>
                <h3 className="text-lg font-bold text-gray-900">June 2024</h3>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-700">
              Pending
            </span>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tuition Fee</span>
              <span className="font-semibold">₹2,500</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Transport Fee</span>
              <span className="font-semibold">₹500</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Activity Fee</span>
              <span className="font-semibold">₹300</span>
            </div>
            <div className="pt-2 border-t border-gray-200 flex justify-between">
              <span className="font-bold text-gray-900">Total Amount</span>
              <span className="font-bold text-xl text-orange-600">₹3,300</span>
            </div>
          </div>

          <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 rounded-xl font-semibold shadow-lg shadow-orange-500/30 transition-all hover:scale-[1.02]">
            Pay Now
          </button>
          <p className="text-xs text-center text-gray-500 mt-2">Due Date: June 10, 2024</p>
        </motion.div>

        {/* Today's Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-5 rounded-2xl shadow-xl flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
              <CalendarCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Today's Status</p>
              <h3 className="text-lg font-bold text-green-600">Present</h3>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs bg-green-50 text-green-700 px-3 py-1.5 rounded-lg border border-green-200 font-semibold">
              9:05 AM
            </span>
          </div>
        </motion.div>

        {/* Latest Notice */}
        {latestNotice && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card p-5 rounded-2xl shadow-xl border-l-4 border-purple-500"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
                Latest Notice
              </h3>
              <Link href="/parent/notices" className="text-xs text-primary font-semibold flex items-center hover:underline">
                View All <ChevronRight className="w-3 h-3 ml-1" />
              </Link>
            </div>
            <p className="text-sm font-semibold text-gray-800 mb-2">{latestNotice.title}</p>
            <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">{latestNotice.content}</p>
          </motion.div>
        )}

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="font-bold text-gray-900 mb-3 px-1">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <Link href="/parent/profile">
              <button className="w-full bg-gradient-to-br from-blue-500 to-blue-600 text-white p-5 rounded-2xl shadow-lg shadow-blue-500/30 text-left hover:scale-[1.02] transition-transform">
                <User className="w-7 h-7 mb-3" />
                <p className="font-bold text-lg">Profile</p>
                <p className="text-xs text-blue-100 mt-1">View Timeline</p>
              </button>
            </Link>

            <button className="w-full bg-gradient-to-br from-pink-500 to-pink-600 text-white p-5 rounded-2xl shadow-lg shadow-pink-500/30 text-left hover:scale-[1.02] transition-transform">
              <Image className="w-7 h-7 mb-3" />
              <p className="font-bold text-lg">Gallery</p>
              <p className="text-xs text-pink-100 mt-1">View Photos</p>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
