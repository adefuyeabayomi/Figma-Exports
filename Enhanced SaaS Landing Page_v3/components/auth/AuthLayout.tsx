import { motion } from 'motion/react';
import { Lendericonsvg1, Lendertexticon1 } from '../brand/Logo';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  showBackButton?: boolean;
  onBack?: () => void;
}

export function AuthLayout({ children, title, subtitle, showBackButton, onBack }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
      {/* Header */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-gray-100 bg-white/80 backdrop-blur-md"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Lendericonsvg1 />
              <Lendertexticon1 />
            </motion.div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-[#143ad0] transition-colors">Pricing</a>
              <a href="#" className="text-gray-700 hover:text-[#143ad0] transition-colors">About Us</a>
              <a href="#" className="text-gray-700 hover:text-[#143ad0] transition-colors">Help Center</a>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="text-gray-700 hover:text-[#143ad0] transition-colors">Sign In</button>
              <button className="bg-gradient-to-r from-[#020c2f] to-[#143ad0] text-white px-4 py-2 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            {showBackButton && (
              <motion.button
                whileHover={{ x: -5 }}
                onClick={onBack}
                className="flex items-center text-[#143ad0] hover:text-[#002bd9] mb-6 transition-colors"
              >
                ← Back
              </motion.button>
            )}
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl font-bold text-[#001360] mb-2"
            >
              {title}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 text-base leading-relaxed"
            >
              {subtitle}
            </motion.p>
          </motion.div>

          {/* Form Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-xl p-8 space-y-6"
          >
            {children}
          </motion.div>
        </div>
      </div>
    </div>
  );
}