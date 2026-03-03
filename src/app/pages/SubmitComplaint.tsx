import { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { motion } from 'motion/react';
import { FileText, Upload, Send, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { addComplaint, addNotification } from '../utils/storage';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';

export const SubmitComplaint = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    type: '',
    priority: 'Medium' as 'Low' | 'Medium' | 'High',
    description: '',
  });

  const departments = [
    'Infrastructure',
    'IT',
    'Academics',
    'Administration',
    'Hostel',
    'Library',
    'Canteen',
    'Transport',
  ];

  const complaintTypes = [
    'Maintenance',
    'Technical',
    'Academic',
    'Facility',
    'Administrative',
    'Harassment',
    'Other',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newComplaint = {
      id: `complaint-${Date.now()}`,
      title: formData.title,
      description: formData.description,
      department: formData.department,
      type: formData.type,
      status: 'Pending' as const,
      priority: formData.priority,
      studentId: user?.id || '',
      studentName: user?.name || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      assignedTo: '',
    };

    addComplaint(newComplaint);

    // Add notification for student
    const notification = {
      id: `notif-${Date.now()}`,
      userId: user?.id || '',
      message: `Your complaint "${formData.title}" has been submitted successfully.`,
      type: 'success' as const,
      read: false,
      createdAt: new Date().toISOString(),
    };
    addNotification(notification);

    setShowSuccess(true);
    toast.success('Complaint submitted successfully!');

    setTimeout(() => {
      navigate('/student/track-complaints');
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (showSuccess) {
    return (
      <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
        <Sidebar />
        <div className="flex-1 ml-72 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-center"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">
              Complaint Submitted!
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-2">
              Your complaint has been submitted successfully.
            </p>
            <p className="text-slate-500 dark:text-slate-500 text-sm">
              Redirecting to track complaints...
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar />
      
      <div className="flex-1 ml-72">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-2">
              Submit Complaint
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Fill out the form below to submit your complaint
            </p>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-800"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-2">
                  Complaint Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Brief title of your complaint"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Department and Type */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-2">
                    Department *
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-2">
                    Complaint Type *
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Type</option>
                    {complaintTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Priority */}
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-2">
                  Priority Level *
                </label>
                <div className="flex gap-4">
                  {(['Low', 'Medium', 'High'] as const).map((priority) => (
                    <label
                      key={priority}
                      className="flex-1 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="priority"
                        value={priority}
                        checked={formData.priority === priority}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className={`px-4 py-3 rounded-xl border-2 text-center font-semibold transition-all ${
                        formData.priority === priority
                          ? priority === 'High' 
                            ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                            : priority === 'Medium'
                            ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400'
                            : 'border-slate-500 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                          : 'border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                      }`}>
                        {priority}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-2">
                  Detailed Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Provide a detailed description of your complaint..."
                  rows={6}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  required
                />
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-2">
                  Attach Files (Optional)
                </label>
                <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-8 text-center hover:border-blue-500 dark:hover:border-blue-400 transition-colors cursor-pointer">
                  <Upload className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                  <p className="text-slate-600 dark:text-slate-400 mb-1">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-500">
                    PNG, JPG, PDF up to 10MB
                  </p>
                  <input type="file" className="hidden" multiple />
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
              >
                <Send className="w-5 h-5" />
                Submit Complaint
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
