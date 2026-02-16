import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import {
  LayoutDashboard, Users, Banknote, Megaphone, CalendarCheck,
  LogOut, School, Shield, Settings, ClipboardList, Database,
  BookOpen, GraduationCap, BarChart3
} from "lucide-react";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const [location] = useLocation();
  const { logout, user } = useAuth();

  const superadminLinks = [
    { href: "/superadmin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/superadmin/settings", label: "School Settings", icon: Settings },
    { href: "/superadmin/roles", label: "Roles & Permissions", icon: Shield },
    { href: "/superadmin/admins", label: "Manage Users", icon: Users },
    { href: "/superadmin/audit", label: "Audit Logs", icon: ClipboardList },
    { href: "/superadmin/backup", label: "Backup & Restore", icon: Database },
  ];

  const adminLinks = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/students", label: "Students", icon: Users },
    { href: "/admin/fees", label: "Fees", icon: Banknote },
    { href: "/admin/staff", label: "Staff", icon: GraduationCap },
    { href: "/admin/notices", label: "Notices", icon: Megaphone },
    { href: "/admin/reports", label: "Reports", icon: BarChart3 },
  ];

  const teacherLinks = [
    { href: "/teacher/attendance", label: "Attendance", icon: CalendarCheck },
    { href: "/teacher/class", label: "My Class", icon: Users },
    { href: "/teacher/activities", label: "Activities", icon: BookOpen },
    { href: "/teacher/notices", label: "Notices", icon: Megaphone },
  ];

  const links = user?.role === "superadmin"
    ? superadminLinks
    : user?.role === "admin"
      ? adminLinks
      : teacherLinks;

  const isSuperAdmin = user?.role === "superadmin";

  return (
    <div className={cn(
      "w-64 h-screen border-r hidden md:flex flex-col sticky top-0 rounded-none",
      isSuperAdmin
        ? "bg-gray-900 border-gray-800"
        : "glass-card border-white/20"
    )}>
      <div className={cn("p-6 border-b", isSuperAdmin ? "border-gray-800" : "border-border/50")}>
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center",
            isSuperAdmin ? "bg-purple-600" : "bg-primary/10 text-primary"
          )}>
            <School className={cn("w-6 h-6", isSuperAdmin ? "text-white" : "")} />
          </div>
          <div>
            <h1 className={cn(
              "font-bold text-lg font-display tracking-tight",
              isSuperAdmin ? "text-white" : "text-primary"
            )}>
              Light International
            </h1>
            <p className={cn("text-xs", isSuperAdmin ? "text-gray-400" : "text-muted-foreground")}>
              {isSuperAdmin ? "System Control" : user?.role === "admin" ? "Management" : "Teacher Panel"}
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location === link.href;

          return (
            <Link key={link.href} href={link.href} className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
              isActive
                ? isSuperAdmin
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-600/20"
                  : "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                : isSuperAdmin
                  ? "text-gray-400 hover:bg-gray-800 hover:text-white"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}>
              <Icon className={cn("w-5 h-5", isActive
                ? isSuperAdmin ? "text-white" : "text-primary-foreground"
                : isSuperAdmin ? "text-gray-500 group-hover:text-white" : "text-muted-foreground group-hover:text-foreground"
              )} />
              <span className="font-medium text-sm">{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className={cn("p-4 border-t", isSuperAdmin ? "border-gray-800" : "border-border/50")}>
        <div className="flex items-center gap-3 px-4 py-3 mb-2">
          <div className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center font-bold",
            isSuperAdmin ? "bg-purple-600 text-white" : "bg-accent text-accent-foreground"
          )}>
            {user?.name.charAt(0)}
          </div>
          <div className="overflow-hidden">
            <p className={cn("text-sm font-semibold truncate", isSuperAdmin ? "text-white" : "")}>{user?.name}</p>
            <p className={cn("text-xs capitalize", isSuperAdmin ? "text-gray-400" : "text-muted-foreground")}>{user?.role === 'superadmin' ? 'Super Admin' : user?.role}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className={cn(
            "w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors",
            isSuperAdmin
              ? "text-red-400 hover:bg-red-500/10"
              : "text-destructive hover:bg-destructive/10"
          )}
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm font-medium">Log out</span>
        </button>
      </div>
    </div>
  );
}
