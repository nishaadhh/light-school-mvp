import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { ShieldCheck, GraduationCap, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function Login() {
  const { login } = useAuth();
  const [, setLocation] = useLocation();

  const handleLogin = (role: 'admin' | 'teacher' | 'parent') => {
    login(role);
    if (role === 'admin') setLocation('/admin/dashboard');
    else if (role === 'teacher') setLocation('/teacher/attendance');
    else setLocation('/parent/home');
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/50">
        <div className="p-8 text-center">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
             <GraduationCap className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">Little Gems</h1>
          <p className="text-muted-foreground mb-8">Kindergarten Management System</p>
          
          <div className="space-y-4">
            <p className="text-sm font-medium text-gray-500 mb-4 uppercase tracking-wider">Select Role to Demo</p>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleLogin('admin')}
              className="w-full p-4 rounded-2xl border-2 border-transparent bg-blue-50 hover:bg-blue-100 hover:border-blue-200 text-left flex items-center gap-4 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/30">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Admin</h3>
                <p className="text-sm text-gray-500">Manage students, fees & staff</p>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleLogin('teacher')}
              className="w-full p-4 rounded-2xl border-2 border-transparent bg-green-50 hover:bg-green-100 hover:border-green-200 text-left flex items-center gap-4 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-green-500 text-white flex items-center justify-center shadow-lg shadow-green-500/30">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Teacher</h3>
                <p className="text-sm text-gray-500">Mark attendance & homework</p>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleLogin('parent')}
              className="w-full p-4 rounded-2xl border-2 border-transparent bg-pink-50 hover:bg-pink-100 hover:border-pink-200 text-left flex items-center gap-4 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-pink-500 text-white flex items-center justify-center shadow-lg shadow-pink-500/30">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Parent</h3>
                <p className="text-sm text-gray-500">Check notices & pay fees</p>
              </div>
            </motion.button>
          </div>
        </div>
        <div className="bg-gray-50 p-4 text-center border-t border-gray-100">
          <p className="text-xs text-gray-400">© 2024 Little Gems Demo</p>
        </div>
      </div>
    </div>
  );
}
