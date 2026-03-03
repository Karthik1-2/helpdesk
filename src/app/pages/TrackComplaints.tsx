import { useState, useEffect } from 'react';
import { Sidebar } from '../components/Sidebar';
import { motion } from 'motion/react';
import { Search, Filter, Clock, CheckCircle, XCircle, AlertCircle, Calendar } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getComplaints, Complaint } from '../utils/storage';

export const TrackComplaints = () => {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [filteredComplaints, setFilteredComplaints] = useState<Complaint[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    const allComplaints = getComplaints();
    const myComplaints = allComplaints.filter(c => c.studentId === user?.id);
    setComplaints(myComplaints);
    setFilteredComplaints(myComplaints);
  }, [user]);

  useEffect(() => {
    let filtered = complaints;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(c => 
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.department.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== 'All') {
      filtered = filtered.filter(c => c.status === statusFilter);
    }

    setFilteredComplaints(filtered);
  }, [searchQuery, statusFilter, complaints]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending':
        return <Clock className="w-5 h-5" />;
      case 'In Review':
        return <AlertCircle className="w-5 h-5" />;
      case 'Resolved':
        return <CheckCircle className="w-5 h-5" />;
      case 'Rejected':
        return <XCircle className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'from-yellow-500 to-orange-500';
      case 'In Review':
        return 'from-blue-500 to-cyan-500';
      case 'Resolved':
        return 'from-green-500 to-emerald-500';
      case 'Rejected':
        return 'from-red-500 to-pink-500';
      default:
        return 'from-slate-500 to-slate-600';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
      case 'In Review':
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
      case 'Resolved':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case 'Rejected':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      default:
        return 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700';
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
              Track Complaints
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Monitor the status of all your submitted complaints
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search complaints..."
                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-12 pr-8 py-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="In Review">In Review</option>
                <option value="Resolved">Resolved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          {/* Complaints Grid */}
          {filteredComplaints.length > 0 ? (
            <div className="grid gap-6">
              {filteredComplaints.map((complaint, index) => (
                <motion.div
                  key={complaint.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`rounded-2xl p-6 border-2 ${getStatusBg(complaint.status)} shadow-lg`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                          {complaint.title}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          complaint.priority === 'High' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                          complaint.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                          'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300'
                        }`}>
                          {complaint.priority}
                        </span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 mb-4">
                        {complaint.description}
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                          <span className="font-semibold">Department:</span>
                          {complaint.department}
                        </div>
                        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                          <span className="font-semibold">Type:</span>
                          {complaint.type}
                        </div>
                        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                          <Calendar className="w-4 h-4" />
                          {new Date(complaint.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className={`flex flex-col items-center gap-2 px-6 py-4 bg-gradient-to-br ${getStatusColor(complaint.status)} rounded-xl text-white min-w-[140px]`}>
                      {getStatusIcon(complaint.status)}
                      <span className="font-bold text-sm">{complaint.status}</span>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <div className={`w-2 h-2 rounded-full ${
                          complaint.status === 'Pending' ? 'bg-yellow-500' :
                          complaint.status === 'In Review' ? 'bg-blue-500' :
                          complaint.status === 'Resolved' ? 'bg-green-500' :
                          'bg-red-500'
                        }`}></div>
                        <span className="font-semibold">Created:</span>
                        {new Date(complaint.createdAt).toLocaleString()}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <div className={`w-2 h-2 rounded-full ${
                          complaint.status === 'Pending' ? 'bg-yellow-500' :
                          complaint.status === 'In Review' ? 'bg-blue-500' :
                          complaint.status === 'Resolved' ? 'bg-green-500' :
                          'bg-red-500'
                        }`}></div>
                        <span className="font-semibold">Updated:</span>
                        {new Date(complaint.updatedAt).toLocaleString()}
                      </div>
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
              <AlertCircle className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                No complaints found
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                {searchQuery || statusFilter !== 'All' 
                  ? 'Try adjusting your search or filters'
                  : 'Submit your first complaint to get started'}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
