import { Link, useLocation } from 'react-router';
import { motion } from 'motion/react';
import {
  LayoutDashboard,
  FileText,
  TrendingUp,
  User,
  Bell,
  LogOut,
  MessageSquare,
  Moon,
  Sun,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router';

interface MenuItem {
  path: string;
  icon: any;
  label: string;
}

export const Sidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const studentMenuItems: MenuItem[] = [
    { path: '/student/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/student/submit-complaint', icon: FileText, label: 'Submit Complaint' },
    { path: '/student/track-complaints', icon: TrendingUp, label: 'Track Status' },
    { path: '/student/profile', icon: User, label: 'Profile' },
    { path: '/student/notifications', icon: Bell, label: 'Notifications' },
  ];

  const adminMenuItems: MenuItem[] = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  ];

  const menuItems = user?.role === 'admin' ? adminMenuItems : studentMenuItems;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="w-72 bg-white dark:bg-slate-900 h-screen fixed left-0 top-0 border-r border-slate-200 dark:border-slate-800 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-200 dark:border-slate-800">
        <Link to={user?.role === 'admin' ? '/admin/dashboard' : '/student/dashboard'} className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800 dark:text-white">CMS Portal</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">{user?.role}</p>
          </div>
        </Link>
      </div>

      {/* User Info */}
      <div className="p-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
            {user?.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-slate-800 dark:text-white truncate">{user?.name}</div>
            <div className="text-sm text-slate-500 dark:text-slate-400 truncate">{user?.email}</div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link to={item.path}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </motion.div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          <span className="font-medium">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};
