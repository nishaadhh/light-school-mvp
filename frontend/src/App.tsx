import { Switch, Route, Redirect, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";
import { useAuth } from "@/hooks/use-auth";

// Pages
import Login from "@/pages/Login";
import NotFound from "@/pages/not-found";

// Super Admin
import SADashboard from "@/pages/superadmin/Dashboard";
import SASettings from "@/pages/superadmin/Settings";
import SARoles from "@/pages/superadmin/Roles";
import SAAdmins from "@/pages/superadmin/Admins";
import SAAuditLogs from "@/pages/superadmin/AuditLogs";
import SABackup from "@/pages/superadmin/Backup";

// Admin
import AdminDashboard from "@/pages/admin/Dashboard";
import StudentList from "@/pages/admin/StudentList";
import FeesPage from "@/pages/admin/Fees";
import NoticesPage from "@/pages/admin/Notices";
import StaffPage from "@/pages/admin/Staff";
import ReportsPage from "@/pages/admin/Reports";

// Teacher
import AttendancePage from "@/pages/teacher/Attendance";
import TeacherClass from "@/pages/teacher/Class";
import ActivitiesPage from "@/pages/teacher/Activities";
import TeacherNotices from "@/pages/teacher/Notices";

// Parent
import ParentHome from "@/pages/parent/Home";
import ParentNotices from "@/pages/parent/Notices";
import Profile from "@/pages/parent/Profile";
import ParentFees from "@/pages/parent/Fees";
import Gallery from "@/pages/parent/Gallery";

function ProtectedRoute({
  component: Component,
  allowedRoles
}: {
  component: React.ComponentType<any>,
  allowedRoles: string[]
}) {
  const { user } = useAuth();

  if (!user) return <Redirect to="/login" />;
  if (!allowedRoles.includes(user.role)) return <Redirect to="/login" />;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {user.role !== 'parent' ? <Sidebar /> : null}
      <main className="flex-1 overflow-y-auto">
        <Component />
      </main>
      {user.role === 'parent' ? <MobileNav /> : null}
    </div>
  );
}

function RootLogic() {
  const [location] = useLocation();
  const { user } = useAuth();

  if (location === '/') {
    if (!user) return <Redirect to="/login" />;
    if (user.role === 'superadmin') return <Redirect to="/superadmin/dashboard" />;
    if (user.role === 'admin') return <Redirect to="/admin/dashboard" />;
    if (user.role === 'teacher') return <Redirect to="/teacher/attendance" />;
    return <Redirect to="/parent/home" />;
  }

  return <NotFound />;
}

function Router() {
  return (
    <Switch>
      <Route path="/login" component={Login} />

      {/* Super Admin Routes */}
      <Route path="/superadmin/dashboard">
        {() => <ProtectedRoute component={SADashboard} allowedRoles={['superadmin']} />}
      </Route>
      <Route path="/superadmin/settings">
        {() => <ProtectedRoute component={SASettings} allowedRoles={['superadmin']} />}
      </Route>
      <Route path="/superadmin/roles">
        {() => <ProtectedRoute component={SARoles} allowedRoles={['superadmin']} />}
      </Route>
      <Route path="/superadmin/admins">
        {() => <ProtectedRoute component={SAAdmins} allowedRoles={['superadmin']} />}
      </Route>
      <Route path="/superadmin/audit">
        {() => <ProtectedRoute component={SAAuditLogs} allowedRoles={['superadmin']} />}
      </Route>
      <Route path="/superadmin/backup">
        {() => <ProtectedRoute component={SABackup} allowedRoles={['superadmin']} />}
      </Route>

      {/* Admin Routes */}
      <Route path="/admin/dashboard">
        {() => <ProtectedRoute component={AdminDashboard} allowedRoles={['admin']} />}
      </Route>
      <Route path="/admin/students">
        {() => <ProtectedRoute component={StudentList} allowedRoles={['admin']} />}
      </Route>
      <Route path="/admin/fees">
        {() => <ProtectedRoute component={FeesPage} allowedRoles={['admin']} />}
      </Route>
      <Route path="/admin/notices">
        {() => <ProtectedRoute component={NoticesPage} allowedRoles={['admin']} />}
      </Route>
      <Route path="/admin/staff">
        {() => <ProtectedRoute component={StaffPage} allowedRoles={['admin']} />}
      </Route>
      <Route path="/admin/reports">
        {() => <ProtectedRoute component={ReportsPage} allowedRoles={['admin']} />}
      </Route>

      {/* Teacher Routes */}
      <Route path="/teacher/attendance">
        {() => <ProtectedRoute component={AttendancePage} allowedRoles={['teacher', 'admin']} />}
      </Route>
      <Route path="/teacher/class">
        {() => <ProtectedRoute component={TeacherClass} allowedRoles={['teacher']} />}
      </Route>
      <Route path="/teacher/activities">
        {() => <ProtectedRoute component={ActivitiesPage} allowedRoles={['teacher']} />}
      </Route>
      <Route path="/teacher/notices">
        {() => <ProtectedRoute component={TeacherNotices} allowedRoles={['teacher']} />}
      </Route>

      {/* Parent Routes */}
      <Route path="/parent/home">
        {() => <ProtectedRoute component={ParentHome} allowedRoles={['parent']} />}
      </Route>
      <Route path="/parent/notices">
        {() => <ProtectedRoute component={ParentNotices} allowedRoles={['parent']} />}
      </Route>
      <Route path="/parent/fees">
        {() => <ProtectedRoute component={ParentFees} allowedRoles={['parent']} />}
      </Route>
      <Route path="/parent/gallery">
        {() => <ProtectedRoute component={Gallery} allowedRoles={['parent']} />}
      </Route>
      <Route path="/parent/profile">
        {() => <ProtectedRoute component={Profile} allowedRoles={['parent']} />}
      </Route>

      {/* Fallback for root and 404 */}
      <Route path="/" component={RootLogic} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
