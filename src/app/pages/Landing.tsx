import { Link } from 'react-router';
import { motion } from 'motion/react';
import { 
  MessageSquare, 
  TrendingUp, 
  Shield, 
  Mail, 
  CheckCircle, 
  Clock, 
  Users,
  Phone,
  MapPin,
  Github,
  Twitter,
  Linkedin
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export const Landing = () => {
  const features = [
    {
      icon: MessageSquare,
      title: 'Submit Complaints',
      description: 'Easily submit your complaints with detailed descriptions and attachments',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: TrendingUp,
      title: 'Track Status',
      description: 'Real-time tracking of your complaint status from submission to resolution',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Shield,
      title: 'Admin Review',
      description: 'Quick administrative review and assignment to relevant departments',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: Mail,
      title: 'Auto Email Alerts',
      description: 'Get instant email notifications on every status update',
      color: 'from-green-500 to-emerald-500',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CS Student',
      text: 'This system made it so easy to report and track my hostel maintenance issues. Got resolved in just 2 days!',
      image: 'https://images.unsplash.com/photo-1701760172039-a66ab54a5eaf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHByb2Zlc3Npb25hbCUyMHdvbWFuJTIwbGFwdG9wfGVufDF8fHx8MTc3MjU0NDM0OHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      name: 'Michael Chen',
      role: 'Engineering Student',
      text: 'The transparency and quick response time is amazing. I always know the status of my complaints.',
      image: 'https://images.unsplash.com/photo-1758270705518-b61b40527e76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwc3R1ZGVudHMlMjBzdHVkeSUyMGdyb3VwfGVufDF8fHx8MTc3MjU0NDM0OXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      name: 'Emily Rodriguez',
      role: 'MBA Student',
      text: 'Finally, a system that actually works! The admin team is very responsive and professional.',
      image: 'https://images.unsplash.com/photo-1708578200684-3aa944b73237?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwc3R1ZGVudHMlMjBkaXNjdXNzaW5nJTIwY2FtcHVzfGVufDF8fHx8MTc3MjU0NDM0N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  const stats = [
    { value: '5000+', label: 'Students Registered' },
    { value: '12000+', label: 'Complaints Resolved' },
    { value: '95%', label: 'Satisfaction Rate' },
    { value: '24h', label: 'Avg Response Time' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-white/70 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-700">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              CMS Portal
            </h1>
          </motion.div>
          
          <div className="flex gap-4">
            <Link to="/student/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 rounded-lg font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                Login
              </motion.button>
            </Link>
            <Link to="/student/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 rounded-lg font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
              >
                Register
              </motion.button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Your Voice <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Matters</span>
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
                Submit, track, and resolve college complaints with our modern, efficient management system. 
                Get real-time updates and quick resolutions.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link to="/student/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                  >
                    <Users className="w-5 h-5" />
                    Login as Student
                  </motion.button>
                </Link>
                <Link to="/admin/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-white dark:bg-slate-800 text-slate-800 dark:text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all border-2 border-slate-200 dark:border-slate-700 flex items-center gap-2"
                  >
                    <Shield className="w-5 h-5" />
                    Login as Admin
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1645559946960-c002b6e9d559?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB1bml2ZXJzaXR5JTIwYnVpbGRpbmclMjBlZHVjYXRpb258ZW58MXx8fHwxNzcyNTQ0MzQ4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="College Campus"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent"></div>
              </div>
              
              {/* Floating stats cards */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute -left-6 top-20 bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-800 dark:text-white">95%</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Resolved</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute -right-6 bottom-20 bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-800 dark:text-white">24h</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Response</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-600 dark:text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl lg:text-5xl font-bold mb-4">
              Powerful <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Features</span>
            </h3>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Everything you need to manage and resolve complaints efficiently
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity"></div>
                  <div className="relative bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-slate-200 dark:border-slate-700">
                    <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h4 className="text-xl font-bold mb-3 text-slate-800 dark:text-white">
                      {feature.title}
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl lg:text-5xl font-bold mb-4">
              What Students Say
            </h3>
            <p className="text-xl text-blue-100">
              Hear from our satisfied students
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20"
              >
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-white/30"
                  />
                  <div>
                    <div className="font-bold text-lg">{testimonial.name}</div>
                    <div className="text-blue-100">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-blue-50 leading-relaxed">
                  "{testimonial.text}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-slate-900 text-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-xl font-bold">CMS Portal</h1>
              </div>
              <p className="text-slate-400">
                Making college complaint management simple and efficient.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link to="/student/login" className="hover:text-white transition-colors">Student Login</Link></li>
                <li><Link to="/admin/login" className="hover:text-white transition-colors">Admin Login</Link></li>
                <li><Link to="/student/register" className="hover:text-white transition-colors">Register</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-slate-400">
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  support@college.edu
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  +1 (555) 123-4567
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  College Campus, Building A
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors">
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 text-center text-slate-400">
            <p>&copy; 2026 College Complaint Management System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
