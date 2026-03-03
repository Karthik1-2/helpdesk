import { useState, useEffect } from 'react';
import { Sidebar } from '../components/Sidebar';
import { motion } from 'motion/react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  TrendingUp,
  AlertCircle,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getComplaints, getNotifications, Complaint } from '../utils/storage';
import { Link } from 'react-router';

export const StudentDashboard = () => {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  useEffect(() => {
    const allComplaints = getComplaints();
    const myComplaints = allComplaints.filter(c => c.studentId === user?.id);
    setComplaints(myComplaints);

    const notifications = getNotifications(user?.id || '');
    setUnreadNotifications(notifications.filter(n => !n.read).length);
  }, [user]);

  const stats = [
    {
      label: 'Total Complaints',
      value: complaints.length,
      icon: FileText,
      color: 'from-blue-500 to-cyan-500',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      label: 'Pending',
      value: complaints.filter(c => c.status === 'Pending').length,
      icon: Clock,
      color: 'from-yellow-500 to-orange-500',
      textColor: 'text-yellow-600',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
    },
    {
      label: 'Resolved',
      value: complaints.filter(c => c.status === 'Resolved').length,
      icon: CheckCircle,
      color: 'from-green-500 to-emerald-500',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      label: 'Rejected',
      value: complaints.filter(c => c.status === 'Rejected').length,
      icon: XCircle,
      color: 'from-red-500 to-pink-500',
      textColor: 'text-red-600',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
    },
  ];

  const statusData = [
    { name: 'Pending', value: complaints.filter(c => c.status === 'Pending').length, color: '#f59e0b' },
    { name: 'In Review', value: complaints.filter(c => c.status === 'In Review').length, color: '#3b82f6' },
    { name: 'Resolved', value: complaints.filter(c => c.status === 'Resolved').length, color: '#10b981' },
    { name: 'Rejected', value: complaints.filter(c => c.status === 'Rejected').length, color: '#ef4444' },
  ];

  const typeData = complaints.reduce((acc, complaint) => {
    const existing = acc.find(item => item.type === complaint.type);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ type: complaint.type, count: 1 });
    }
    return acc;
  }, [] as { type: string; count: number }[]);

  const recentComplaints = complaints.slice(0, 5);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'In Review':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'Resolved':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'Rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300';
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar />
      
      <div className="flex-1 ml-72">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-2">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Here's an overview of your complaints
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-800"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <TrendingUp className={`w-5 h-5 ${stat.textColor}`} />
                  </div>
                  <div className="text-3xl font-bold text-slate-800 dark:text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Pie Chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-800"
            >
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6">
                Complaints by Status
              </h3>
              {statusData.some(d => d.value > 0) ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-slate-400">
                  No complaints yet
                </div>
              )}
            </motion.div>

            {/* Bar Chart */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-800"
            >
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6">
                Complaints by Type
              </h3>
              {typeData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={typeData}>
                    <XAxis dataKey="type" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1e293b', 
                        border: 'none', 
                        borderRadius: '8px',
                        color: '#fff'
                      }} 
                    />
                    <Bar dataKey="count" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-slate-400">
                  No complaints yet
                </div>
              )}
            </motion.div>
          </div>

          {/* Recent Complaints Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-800"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                Recent Complaints
              </h3>
              <Link 
                to="/student/track-complaints"
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
              >
                View All →
              </Link>
            </div>

            {recentComplaints.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800">
                      <th className="text-left py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">Title</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">Department</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">Type</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">Priority</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentComplaints.map((complaint) => (
                      <tr key={complaint.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="py-4 px-4 text-slate-800 dark:text-white font-medium">
                          {complaint.title}
                        </td>
                        <td className="py-4 px-4 text-slate-600 dark:text-slate-400">
                          {complaint.department}
                        </td>
                        <td className="py-4 px-4 text-slate-600 dark:text-slate-400">
                          {complaint.type}
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(complaint.status)}`}>
                            {complaint.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            complaint.priority === 'High' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                            complaint.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                            'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300'
                          }`}>
                            {complaint.priority}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-slate-600 dark:text-slate-400">
                          {new Date(complaint.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600 dark:text-slate-400 mb-4">No complaints submitted yet</p>
                <Link 
                  to="/student/submit-complaint"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
                >
                  <FileText className="w-5 h-5" />
                  Submit Your First Complaint
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
