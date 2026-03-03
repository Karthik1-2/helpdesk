import { useState, useEffect } from 'react';
import { Sidebar } from '../components/Sidebar';
import { motion } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  FileText,
  Clock,
  CheckCircle,
  Users,
  TrendingUp,
  AlertCircle,
  Edit,
  UserCheck,
} from 'lucide-react';
import { getComplaints, updateComplaint, addNotification, Complaint } from '../utils/storage';
import { toast } from 'sonner';

export const AdminDashboard = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    loadComplaints();
  }, []);

  const loadComplaints = () => {
    const allComplaints = getComplaints();
    setComplaints(allComplaints);
  };

  const stats = [
    {
      label: 'Total Complaints',
      value: complaints.length,
      icon: FileText,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      label: 'Pending',
      value: complaints.filter(c => c.status === 'Pending').length,
      icon: Clock,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
    },
    {
      label: 'Resolved',
      value: complaints.filter(c => c.status === 'Resolved').length,
      icon: CheckCircle,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      label: 'Total Students',
      value: new Set(complaints.map(c => c.studentId)).size,
      icon: Users,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    },
  ];

  const departmentData = complaints.reduce((acc, complaint) => {
    const existing = acc.find(item => item.department === complaint.department);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ department: complaint.department, count: 1 });
    }
    return acc;
  }, [] as { department: string; count: number }[]);

  const statusData = [
    { name: 'Pending', value: complaints.filter(c => c.status === 'Pending').length, color: '#f59e0b' },
    { name: 'In Review', value: complaints.filter(c => c.status === 'In Review').length, color: '#3b82f6' },
    { name: 'Resolved', value: complaints.filter(c => c.status === 'Resolved').length, color: '#10b981' },
    { name: 'Rejected', value: complaints.filter(c => c.status === 'Rejected').length, color: '#ef4444' },
  ];

  const handleUpdateStatus = (complaintId: string, newStatus: 'Pending' | 'In Review' | 'Resolved' | 'Rejected') => {
    const complaint = complaints.find(c => c.id === complaintId);
    if (!complaint) return;

    updateComplaint(complaintId, { status: newStatus });
    
    // Add notification for student
    const notification = {
      id: `notif-${Date.now()}`,
      userId: complaint.studentId,
      message: `Your complaint "${complaint.title}" status has been updated to ${newStatus}.`,
      type: newStatus === 'Resolved' ? 'success' as const : newStatus === 'Rejected' ? 'warning' as const : 'info' as const,
      read: false,
      createdAt: new Date().toISOString(),
    };
    addNotification(notification);

    loadComplaints();
    setSelectedComplaint(null);
    toast.success('Complaint status updated!');
  };

  const filteredComplaints = filterStatus === 'All' 
    ? complaints 
    : complaints.filter(c => c.status === filterStatus);

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
              Admin Dashboard
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Manage and review all student complaints
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
                    <TrendingUp className="w-5 h-5 text-green-500" />
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
            {/* Department Chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-800"
            >
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6">
                Complaints by Department
              </h3>
              {departmentData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={departmentData}>
                    <XAxis dataKey="department" stroke="#94a3b8" angle={-45} textAnchor="end" height={100} />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1e293b', 
                        border: 'none', 
                        borderRadius: '8px',
                        color: '#fff'
                      }} 
                    />
                    <Bar dataKey="count" fill="url(#adminGradient)" radius={[8, 8, 0, 0]} />
                    <defs>
                      <linearGradient id="adminGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#ec4899" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-slate-400">
                  No data available
                </div>
              )}
            </motion.div>

            {/* Status Pie Chart */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-800"
            >
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6">
                Status Distribution
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
                  No data available
                </div>
              )}
            </motion.div>
          </div>

          {/* Complaints Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-800"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                All Complaints
              </h3>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="In Review">In Review</option>
                <option value="Resolved">Resolved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            {filteredComplaints.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800">
                      <th className="text-left py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">Student</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">Title</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">Department</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">Type</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">Priority</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">Date</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredComplaints.map((complaint) => (
                      <tr key={complaint.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="py-4 px-4 text-slate-800 dark:text-white">
                          {complaint.studentName}
                        </td>
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
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            complaint.priority === 'High' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                            complaint.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                            'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300'
                          }`}>
                            {complaint.priority}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(complaint.status)}`}>
                            {complaint.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-slate-600 dark:text-slate-400">
                          {new Date(complaint.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-4">
                          <button
                            onClick={() => setSelectedComplaint(complaint)}
                            className="p-2 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors"
                            title="Update status"
                          >
                            <Edit className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 text-slate-400">
                No complaints found
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Update Status Modal */}
      {selectedComplaint && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-slate-900 rounded-2xl p-8 max-w-2xl w-full shadow-2xl border border-slate-200 dark:border-slate-800"
          >
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
              Update Complaint Status
            </h3>
            
            <div className="mb-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
              <h4 className="font-bold text-slate-800 dark:text-white mb-2">
                {selectedComplaint.title}
              </h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">
                {selectedComplaint.description}
              </p>
              <div className="flex gap-4 text-sm text-slate-600 dark:text-slate-400">
                <span>Student: {selectedComplaint.studentName}</span>
                <span>Department: {selectedComplaint.department}</span>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {(['Pending', 'In Review', 'Resolved', 'Rejected'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => handleUpdateStatus(selectedComplaint.id, status)}
                  className={`w-full px-6 py-4 rounded-xl font-semibold transition-all ${
                    selectedComplaint.status === status
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {status}
                  {selectedComplaint.status === status && ' (Current)'}
                </button>
              ))}
            </div>

            <button
              onClick={() => setSelectedComplaint(null)}
              className="w-full px-6 py-3 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white rounded-xl font-semibold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
            >
              Cancel
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};
