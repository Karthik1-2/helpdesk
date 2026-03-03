import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Mail, Lock, User, Building2, ArrowRight, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

export const StudentRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    department: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters!');
      return;
    }

    setLoading(true);

    setTimeout(async () => {
      const success = await register(
        formData.name,
        formData.email,
        formData.password,
        formData.department
      );

      if (success) {
        toast.success('Registration successful! Welcome aboard!');
        navigate('/student/dashboard');
      } else {
        toast.error('Email already exists!');
      }
      setLoading(false);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        {/* Back to Home */}
        <Link to="/" className="inline-flex items-center gap-2 text-white mb-6 hover:underline">
          ← Back to Home
        </Link>

        {/* Register Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-20 h-20 bg-gradient-to-br from-pink-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4"
            >
              <CheckCircle className="w-12 h-12 text-white" />
            </motion.div>
            <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
            <p className="text-pink-100">Join us and start managing complaints</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field */}
            <div>
              <label className="block text-white mb-2 font-medium">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-200" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full pl-12 pr-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-pink-200 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-white mb-2 font-medium">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-200" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@student.edu"
                  className="w-full pl-12 pr-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-pink-200 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                  required
                />
              </div>
            </div>

            {/* Department Field */}
            <div>
              <label className="block text-white mb-2 font-medium">Department</label>
              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-200" />
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all appearance-none"
                  required
                >
                  <option value="" className="text-slate-800">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept} className="text-slate-800">
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-white mb-2 font-medium">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-200" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create password (min 6 chars)"
                  className="w-full pl-12 pr-12 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-pink-200 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-pink-200 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-white mb-2 font-medium">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-200" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className="w-full pl-12 pr-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-pink-200 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-white text-pink-600 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-pink-50 transition-all disabled:opacity-50"
            >
              {loading ? (
                <div className="w-6 h-6 border-3 border-pink-600 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  Register Now
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center text-white">
            Already have an account?{' '}
            <Link to="/student/login" className="font-bold underline hover:text-pink-100 transition-colors">
              Login Here
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
