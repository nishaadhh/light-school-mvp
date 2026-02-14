import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";
import { useAuth } from "@/hooks/use-auth";

// Pages
import Login from "@/pages/Login";
import AdminDashboard from "@/pages/admin/Dashboard";
import StudentList from "@/pages/admin/StudentList";
import AttendancePage from "@/pages/teacher/Attendance";
import ParentHome from "@/pages/parent/Home";
import ParentNotices from "@/pages/parent/Notices";
import Profile from "@/pages/parent/Profile";
import NotFound from "@/pages/not-found";

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
    <div className="flex min-h-screen bg-gray-50">
      {/* Show Sidebar only for Admin & Teacher */}
      {user.role !== 'parent' && <Sidebar />}
      
      <main className="flex-1 overflow-y-auto">
        <Component />
      </main>

      {/* Show Mobile Nav only for Parent */}
      {user.role === 'parent' && <MobileNav />}
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      
      {/* Root redirect logic */}
      <Route path="/">
        {(_params) => {
          const { user } = useAuth();
          if (!user) return <Redirect to="/login" />;
          if (user.role === 'admin') return <Redirect to="/admin/dashboard" />;
          if (user.role === 'teacher') return <Redirect to="/teacher/attendance" />;
          return <Redirect to="/parent/home" />;
        }}
      </Route>

      {/* Admin Routes */}
      <Route path="/admin/dashboard">
        {() => <ProtectedRoute component={AdminDashboard} allowedRoles={['admin']} />}
      </Route>
      <Route path="/admin/students">
        {() => <ProtectedRoute component={StudentList} allowedRoles={['admin']} />}
      </Route>
      <Route path="/admin/fees">
        {/* Placeholder for Fees Page - reusing dashboard structure */}
        {() => <ProtectedRoute component={() => <div className="p-8 font-bold text-2xl text-gray-400">Fees Module Coming Soon</div>} allowedRoles={['admin']} />}
      </Route>
      <Route path="/admin/notices">
        {() => <ProtectedRoute component={() => <div className="p-8 font-bold text-2xl text-gray-400">Notices Module Coming Soon</div>} allowedRoles={['admin']} />}
      </Route>

      {/* Teacher Routes */}
      <Route path="/teacher/attendance">
        {() => <ProtectedRoute component={AttendancePage} allowedRoles={['teacher', 'admin']} />}
      </Route>
      <Route path="/teacher/students">
        {() => <ProtectedRoute component={StudentList} allowedRoles={['teacher']} />}
      </Route>

      {/* Parent Routes */}
      <Route path="/parent/home">
        {() => <ProtectedRoute component={ParentHome} allowedRoles={['parent']} />}
      </Route>
      <Route path="/parent/notices">
        {() => <ProtectedRoute component={ParentNotices} allowedRoles={['parent']} />}
      </Route>
      <Route path="/parent/profile">
        {() => <ProtectedRoute component={Profile} allowedRoles={['parent']} />}
      </Route>

      <Route component={NotFound} />
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
