import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import { BarChart3, Users, ClipboardCheck, ShoppingCart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const adminLinks = [
  { to: '/admin/sales', label: 'Sales Report', icon: BarChart3 },
  { to: '/admin/attendance', label: 'Employee Attendance', icon: Users },
];

const employeeLinks = [
  { to: '/employee/attendance', label: 'Mark Attendance', icon: ClipboardCheck },
  { to: '/employee/sales', label: 'Post Daily Sales', icon: ShoppingCart },
];

const DashboardSidebar = () => {
  const { isAdmin } = useAuth();
  const links = isAdmin ? adminLinks : employeeLinks;
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const sidebar = (
    <nav className="flex flex-col gap-1 p-3">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">
        {isAdmin ? 'Admin Panel' : 'Employee Panel'}
      </p>
      {links.map(link => {
        const active = location.pathname === link.to;
        return (
          <NavLink
            key={link.to}
            to={link.to}
            onClick={() => setOpen(false)}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
              active
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
          >
            <link.icon className="w-4 h-4" />
            {link.label}
          </NavLink>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-4 right-4 z-50 lg:hidden bg-primary text-primary-foreground p-3 rounded-full shadow-lg"
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={cn(
        'fixed lg:static inset-y-0 left-0 z-40 w-60 bg-card border-r border-border transition-transform lg:translate-x-0 pt-14 lg:pt-0',
        open ? 'translate-x-0' : '-translate-x-full'
      )}>
        {sidebar}
      </aside>
    </>
  );
};

export default DashboardSidebar;
