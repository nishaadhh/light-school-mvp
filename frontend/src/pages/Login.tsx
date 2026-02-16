import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { ShieldCheck, GraduationCap, Users, Crown } from "lucide-react";
import { motion } from "framer-motion";

export default function Login() {
  const { login } = useAuth();
  const [, setLocation] = useLocation();

  const handleLogin = (role: 'superadmin' | 'admin' | 'teacher' | 'parent') => {
    login(role);
    if (role === 'superadmin') setLocation('/superadmin/dashboard');
    else if (role === 'admin') setLocation('/admin/dashboard');
    else if (role === 'teacher') setLocation('/teacher/attendance');
    else setLocation('/parent/home');
  };

  const roles = [
    {
      id: 'superadmin',
      title: 'Super Admin',
      description: 'Full system control & configuration',
      icon: Crown,
      bgColor: 'bg-purple-50',
      hoverBg: 'hover:bg-purple-100',
      borderColor: 'hover:border-purple-300',
      iconBg: 'bg-gradient-to-br from-purple-500 to-purple-600',
      iconShadow: 'shadow-purple-500/40'
    },
    {
      id: 'admin',
      title: 'Admin',
      description: 'Manage students, fees & staff',
      icon: ShieldCheck,
      bgColor: 'bg-blue-50',
      hoverBg: 'hover:bg-blue-100',
      borderColor: 'hover:border-blue-300',
      iconBg: 'bg-gradient-to-br from-blue-500 to-blue-600',
      iconShadow: 'shadow-blue-500/40'
    },
    {
      id: 'teacher',
      title: 'Teacher',
      description: 'Mark attendance & manage class',
      icon: GraduationCap,
      bgColor: 'bg-green-50',
      hoverBg: 'hover:bg-green-100',
      borderColor: 'hover:border-green-300',
      iconBg: 'bg-gradient-to-br from-green-500 to-green-600',
      iconShadow: 'shadow-green-500/40'
    },
    {
      id: 'parent',
      title: 'Parent',
      description: 'Track child progress & notices',
      icon: Users,
      bgColor: 'bg-pink-50',
      hoverBg: 'hover:bg-pink-100',
      borderColor: 'hover:border-pink-300',
      iconBg: 'bg-gradient-to-br from-pink-500 to-pink-600',
      iconShadow: 'shadow-pink-500/40'
    }
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl glass-card p-10"
      >
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 bg-gradient-to-br from-primary to-purple-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-primary/30"
          >
            <GraduationCap className="w-12 h-12 text-white" />
          </motion.div>
          <h1 className="text-4xl font-display font-bold bg-gradient-to-r from-primary via-purple-600 to-pink-500 bg-clip-text text-transparent mb-3">
            Light International School
          </h1>
          <p className="text-muted-foreground text-lg">School Management System</p>
          <p className="text-sm font-semibold text-gray-500 mt-6 mb-8 uppercase tracking-wider">
            Select Your Role
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {roles.map((role, index) => {
            const Icon = role.icon;
            return (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.03, y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleLogin(role.id as any)}
                className={`p-6 rounded-2xl border-2 border-transparent ${role.bgColor} ${role.hoverBg} ${role.borderColor} text-left flex flex-col items-center gap-4 transition-all duration-300 group`}
              >
                <div className={`w-16 h-16 rounded-2xl ${role.iconBg} text-white flex items-center justify-center shadow-xl ${role.iconShadow} group-hover:shadow-2xl transition-shadow duration-300`}>
                  <Icon className="w-8 h-8" />
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{role.title}</h3>
                  <p className="text-sm text-gray-600">{role.description}</p>
                </div>
              </motion.button>
            );
          })}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200/50 text-center">
          <p className="text-xs text-gray-400">© 2026 Light International School • Premium Management System</p>
        </div>
      </motion.div>
    </div>
  );
}
