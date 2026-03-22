import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/lib/LanguageContext";
import { AuthProvider } from "@/lib/AuthContext";
import { ThemeProvider } from "@/lib/ThemeContext";
import Index from "./pages/Index";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import AdminSalesReport from "./pages/admin/AdminSalesReport";
import AdminAttendance from "./pages/admin/AdminAttendance";
import EmployeeAttendance from "./pages/employee/EmployeeAttendance";
import EmployeeSales from "./pages/employee/EmployeeSales";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />

                {/* Admin routes */}
                <Route path="/admin" element={<AdminDashboard />}>
                  <Route index element={<Navigate to="/admin/sales" replace />} />
                  <Route path="sales" element={<AdminSalesReport />} />
                  <Route path="attendance" element={<AdminAttendance />} />
                </Route>

                {/* Employee routes */}
                <Route path="/employee" element={<EmployeeDashboard />}>
                  <Route index element={<Navigate to="/employee/attendance" replace />} />
                  <Route path="attendance" element={<EmployeeAttendance />} />
                  <Route path="sales" element={<EmployeeSales />} />
                </Route>

                <Route path="/dashboard" element={<Navigate to="/login" replace />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
