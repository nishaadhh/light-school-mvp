import { useAuth } from "@/hooks/use-auth";
import { LogOut, Phone, Mail, MapPin, ChevronRight, HelpCircle, FileText, AlertCircle } from "lucide-react";
import { useLocation } from "wouter";

export default function Profile() {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    logout();
    setLocation("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-white p-6 pb-8 rounded-b-[2rem] shadow-sm">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-gray-200 mb-4 overflow-hidden border-4 border-white shadow-lg">
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'Rajesh'}`} alt="Student" className="w-full h-full" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{user?.name === 'Mr. Rajesh Kumar' ? 'Anu Nair' : 'Student Profile'}</h2>
          <p className="text-gray-500">Class LKG A • Roll No. 1</p>
          <p className="text-sm text-gray-400 mt-1">DOB: 15 May 2020</p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-2">Medical Notes</h3>
          <div className="bg-white rounded-2xl p-4 shadow-sm border-l-4 border-red-400">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-500">
                <AlertCircle className="w-4 h-4" />
              </div>
              <p className="font-medium text-gray-900">No known allergies</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-2">Contact Info</h3>
          <div className="bg-white rounded-2xl p-4 space-y-4 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                <Phone className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-400">Phone</p>
                <p className="font-medium text-gray-900">+91 98765 43210</p>
              </div>
            </div>
            <div className="h-px bg-gray-100" />
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-500">
                <Mail className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-400">Email</p>
                <p className="font-medium text-gray-900">parent@example.com</p>
              </div>
            </div>
            <div className="h-px bg-gray-100" />
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-400">Address</p>
                <p className="font-medium text-gray-900">Kochi, Kerala</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-2">Support</h3>
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors border-b border-gray-100">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-gray-400" />
                <span className="font-medium text-gray-700">Fee Policy</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
            <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-gray-400" />
                <span className="font-medium text-gray-700">Help & Support</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>

        <button 
          onClick={handleLogout}
          className="w-full p-4 rounded-2xl bg-red-50 text-red-600 font-bold hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          Log Out
        </button>
      </div>
    </div>
  );
}
