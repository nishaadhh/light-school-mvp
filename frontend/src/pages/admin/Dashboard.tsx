import { useStats } from "@/hooks/use-stats";
import { useAuth } from "@/hooks/use-auth";
import { Users, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import { RevenueCard } from "@/components/dashboard/RevenueCard";
import { AttendanceOverview } from "@/components/dashboard/AttendanceOverview";
import { PendingFeesCard } from "@/components/dashboard/PendingFeesCard";
import { RecentNotices } from "@/components/dashboard/RecentNotices";

function StatCard({ title, value, icon: Icon, color, delay, trend }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="glass-card p-6 rounded-2xl hover:shadow-2xl transition-all"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-muted-foreground text-sm font-medium mb-1">{title}</p>
          <h3 className="text-3xl font-display font-bold text-gray-900">{value}</h3>
          {trend && (
            <p className="text-xs text-green-600 font-semibold mt-1">{trend}</p>
          )}
        </div>
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </motion.div>
  );
}

export default function AdminDashboard() {
  const { data: stats, isLoading } = useStats();
  const { user } = useAuth();

  if (isLoading) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-2xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-display font-bold bg-gradient-to-r from-primary via-purple-600 to-pink-500 bg-clip-text text-transparent mb-2">
          Light International School
        </h1>
        <p className="text-muted-foreground text-lg">Welcome back, {user?.name}</p>
      </motion.div>

      {/* Top Row - Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <RevenueCard />
        <AttendanceOverview
          present={stats?.presentToday || 0}
          total={stats?.totalStudents || 0}
        />
        <StatCard
          title="Total Students"
          value={stats?.totalStudents || 0}
          icon={Users}
          color="bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg shadow-purple-500/30"
          delay={0.3}
          trend="+3 this month"
        />
        <StatCard
          title="Teachers"
          value={stats?.totalTeachers || 0}
          icon={GraduationCap}
          color="bg-gradient-to-br from-pink-500 to-pink-600 shadow-lg shadow-pink-500/30"
          delay={0.4}
        />
      </div>

      {/* Second Row - Fees & Notices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PendingFeesCard />
        <RecentNotices />
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-card p-6 rounded-2xl"
      >
        <h3 className="font-bold text-lg mb-4 text-gray-900">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl hover:shadow-lg transition-all text-left border border-blue-200 group">
            <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-sm text-gray-900">Add Student</span>
          </button>

          <button className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl hover:shadow-lg transition-all text-left border border-green-200 group">
            <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-sm text-gray-900">Mark Attendance</span>
          </button>

          <button className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl hover:shadow-lg transition-all text-left border border-purple-200 group">
            <div className="w-10 h-10 rounded-lg bg-purple-500 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-sm text-gray-900">Post Notice</span>
          </button>

          <button className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl hover:shadow-lg transition-all text-left border border-orange-200 group">
            <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-sm text-gray-900">Collect Fees</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
