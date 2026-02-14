import { useAuth } from "@/hooks/use-auth";
import { useNotices } from "@/hooks/use-notices";
import { CalendarCheck, AlertCircle, CreditCard, ChevronRight } from "lucide-react";
import { Link } from "wouter";

export default function ParentHome() {
  const { user } = useAuth();
  const { data: notices } = useNotices();
  
  // Get latest notice
  const latestNotice = notices?.[0];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-primary p-6 pb-12 rounded-b-[2.5rem] shadow-xl shadow-primary/20">
        <div className="flex justify-between items-center text-white mb-6">
          <div>
            <p className="text-blue-100 text-sm">Welcome back,</p>
            <h1 className="text-2xl font-bold font-display">{user?.name}</h1>
          </div>
          <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
            <span className="font-bold text-lg">A</span>
          </div>
        </div>

        {/* Student Card */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-white">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-full p-1">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aarav" alt="Student" className="w-full h-full rounded-full" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Aarav Kumar</h3>
              <p className="text-blue-100 text-sm">Class LKG A • Roll No. 12</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-8 space-y-6">
        {/* Attendance Status */}
        <div className="bg-white p-5 rounded-2xl shadow-lg shadow-gray-200/50 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
              <CalendarCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Today's Status</p>
              <h3 className="text-lg font-bold text-green-600">Present</h3>
            </div>
          </div>
          <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-md border border-green-100">9:05 AM</span>
        </div>

        {/* Latest Notice */}
        {latestNotice && (
          <div className="bg-white p-5 rounded-2xl shadow-lg shadow-gray-200/50 border-l-4 border-orange-400">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-gray-900">Latest Notice</h3>
              <Link href="/parent/notices" className="text-xs text-primary font-medium flex items-center">
                View All <ChevronRight className="w-3 h-3 ml-1" />
              </Link>
            </div>
            <p className="text-sm font-medium text-gray-800 mb-1">{latestNotice.title}</p>
            <p className="text-xs text-gray-500 line-clamp-2">{latestNotice.content}</p>
          </div>
        )}

        {/* Quick Actions */}
        <h3 className="font-bold text-gray-900 pt-2">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-4">
          <button className="bg-blue-500 text-white p-4 rounded-2xl shadow-lg shadow-blue-500/20 text-left hover:scale-[1.02] transition-transform">
            <CreditCard className="w-6 h-6 mb-3" />
            <p className="font-bold">Pay Fees</p>
            <p className="text-xs text-blue-100 mt-1">Due: ₹2,500</p>
          </button>
          
          <button className="bg-pink-500 text-white p-4 rounded-2xl shadow-lg shadow-pink-500/20 text-left hover:scale-[1.02] transition-transform">
            <AlertCircle className="w-6 h-6 mb-3" />
            <p className="font-bold">Support</p>
            <p className="text-xs text-pink-100 mt-1">Contact Teacher</p>
          </button>
        </div>
      </div>
    </div>
  );
}
