import { useState, useEffect } from 'react';
import { Sidebar } from '../components/Sidebar';
import { motion } from 'motion/react';
import { Bell, CheckCheck, Info, CheckCircle, AlertTriangle, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getNotifications, markNotificationAsRead, Notification } from '../utils/storage';

export const Notifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    loadNotifications();
  }, [user]);

  const loadNotifications = () => {
    const userNotifications = getNotifications(user?.id || '');
    setNotifications(userNotifications.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ));
  };

  const handleMarkAsRead = (id: string) => {
    markNotificationAsRead(id);
    loadNotifications();
  };

  const handleMarkAllAsRead = () => {
    notifications.forEach(n => {
      if (!n.read) {
        markNotificationAsRead(n.id);
      }
    });
    loadNotifications();
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-6 h-6 text-yellow-500" />;
      default:
        return <Info className="w-6 h-6 text-blue-500" />;
    }
  };

  const getNotificationBg = (type: string, read: boolean) => {
    const opacity = read ? 'opacity-70' : '';
    switch (type) {
      case 'success':
        return `bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 ${opacity}`;
      case 'warning':
        return `bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 ${opacity}`;
      default:
        return `bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 ${opacity}`;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar />
      
      <div className="flex-1 ml-72">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-2 flex items-center gap-3">
                  Notifications
                  {unreadCount > 0 && (
                    <span className="px-3 py-1 bg-red-500 text-white rounded-full text-sm">
                      {unreadCount} new
                    </span>
                  )}
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                  Stay updated with your complaint status
                </p>
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllAsRead}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors flex items-center gap-2"
                >
                  <CheckCheck className="w-5 h-5" />
                  Mark all as read
                </button>
              )}
            </div>
          </div>

          {/* Notifications List */}
          {notifications.length > 0 ? (
            <div className="space-y-4">
              {notifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`rounded-2xl p-6 border-2 ${getNotificationBg(notification.type, notification.read)} shadow-lg`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-slate-800 dark:text-white mb-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                        <span>
                          {new Date(notification.createdAt).toLocaleString()}
                        </span>
                        {!notification.read && (
                          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-full text-xs font-semibold">
                            New
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex-shrink-0 flex gap-2">
                      {!notification.read && (
                        <button
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="p-2 hover:bg-white/50 dark:hover:bg-slate-800/50 rounded-lg transition-colors"
                          title="Mark as read"
                        >
                          <CheckCheck className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Bell className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                No notifications yet
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                You'll receive notifications when your complaints are updated
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
