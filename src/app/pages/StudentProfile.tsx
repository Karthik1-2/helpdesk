import { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { motion } from 'motion/react';
import { User, Mail, Building2, Camera, Save } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

export const StudentProfile = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    department: user?.department || '',
  });

  const handleSave = () => {
    updateProfile({
      name: formData.name,
      department: formData.department,
    });
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const departments = [
    'Computer Science',
    'Electronics',
    'Mechanical',
    'Civil',
    'Information Technology',
    'Electrical',
    'MBA',
    'BBA',
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar />
      
      <div className="flex-1 ml-72">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-2">
              My Profile
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Manage your account information
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-800 text-center">
                <div className="relative inline-block mb-6">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-5xl">
                    {user?.name.charAt(0)}
                  </div>
                  <button className="absolute bottom-0 right-0 w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center text-white shadow-lg transition-colors">
                    <Camera className="w-5 h-5" />
                  </button>
                </div>
                
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
                  {user?.name}
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mb-1">
                  {user?.email}
                </p>
                <p className="text-slate-500 dark:text-slate-500 text-sm mb-6">
                  {user?.department}
                </p>

                <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                  <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                    Account Status
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full font-semibold">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Active
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Profile Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2"
            >
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
                    Profile Information
                  </h3>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors"
                    >
                      Edit Profile
                    </button>
                  ) : (
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setIsEditing(false);
                          setFormData({
                            name: user?.name || '',
                            email: user?.email || '',
                            department: user?.department || '',
                          });
                        }}
                        className="px-6 py-2 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white rounded-xl font-semibold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-colors flex items-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          !isEditing ? 'cursor-not-allowed opacity-70' : ''
                        }`}
                      />
                    </div>
                  </div>

                  {/* Email (Read-only) */}
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        disabled
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white cursor-not-allowed opacity-70"
                      />
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                      Email cannot be changed
                    </p>
                  </div>

                  {/* Department */}
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-2">
                      Department
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <select
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none ${
                          !isEditing ? 'cursor-not-allowed opacity-70' : ''
                        }`}
                      >
                        {departments.map((dept) => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Account Created */}
                  <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-2">
                          Account Created
                        </label>
                        <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white">
                          {new Date().toLocaleDateString()}
                        </div>
                      </div>
                      <div>
                        <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-2">
                          Role
                        </label>
                        <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white capitalize">
                          {user?.role}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
