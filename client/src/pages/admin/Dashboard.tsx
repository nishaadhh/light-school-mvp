import { useStats } from "@/hooks/use-stats";
import { Users, Banknote, CalendarCheck, Megaphone } from "lucide-react";
import { motion } from "framer-motion";

function StatCard({ title, value, icon: Icon, color, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white p-6 rounded-2xl shadow-sm border border-border/50 hover:shadow-lg transition-all"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-muted-foreground font-medium mb-1">{title}</p>
          <h3 className="text-3xl font-display font-bold">{value}</h3>
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

  if (isLoading) return <div className="p-8">Loading stats...</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-gray-900">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, Principal Lakshmi</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Students" 
          value={stats?.totalStudents || 0} 
          icon={Users} 
          color="bg-blue-500 shadow-blue-500/30 shadow-lg"
          delay={0.1}
        />
        <StatCard 
          title="Present Today" 
          value={stats?.presentToday || 0} 
          icon={CalendarCheck} 
          color="bg-green-500 shadow-green-500/30 shadow-lg"
          delay={0.2}
        />
        <StatCard 
          title="Teachers" 
          value={stats?.totalTeachers || 0} 
          icon={Users} 
          color="bg-purple-500 shadow-purple-500/30 shadow-lg"
          delay={0.3}
        />
        <StatCard 
          title="Fees Pending" 
          value={`₹${(stats?.pendingFees || 0).toLocaleString()}`} 
          icon={Banknote} 
          color="bg-orange-500 shadow-orange-500/30 shadow-lg"
          delay={0.4}
        />
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-border/50">
          <h3 className="font-bold text-lg mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-left border border-gray-100">
              <Megaphone className="w-6 h-6 text-primary mb-2" />
              <span className="font-medium text-sm">Post New Notice</span>
            </button>
            <button className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-left border border-gray-100">
              <Users className="w-6 h-6 text-green-600 mb-2" />
              <span className="font-medium text-sm">Add Student</span>
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-br from-primary to-primary/80 p-6 rounded-2xl shadow-lg text-white">
          <h3 className="font-bold text-lg mb-2">School Announcement</h3>
          <p className="text-blue-100 mb-4">Annual Day preparations start next week! Make sure to inform all parents about costume requirements.</p>
          <button className="bg-white text-primary px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-50 transition-colors">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
