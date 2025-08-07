import { motion } from 'motion/react';
import { Lendericonsvg1, Lendertexticon1 } from '../brand/Logo';

interface OnboardingLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  stepTitle: string;
  stepDescription: string;
}

export function OnboardingLayout({ 
  children, 
  currentStep, 
  totalSteps, 
  stepTitle, 
  stepDescription 
}: OnboardingLayoutProps) {
  const steps = [
    'Business Profile',
    'Business Address & Location', 
    'Primary Contact Person',
    'Bank And Financial Details',
    'Regulatory Document Upload'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
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
            
            <div className="flex items-center space-x-6">
              <div className="hidden md:flex items-center space-x-4">
                <div className="w-8 h-8 bg-gradient-to-br from-[#143ad0] to-[#002bd9] rounded-full flex items-center justify-center text-white text-sm font-bold">
                  JD
                </div>
                <span className="text-gray-700 font-medium">John Doe</span>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Progress Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-b border-gray-100 py-6"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => {
              const stepNumber = index + 1;
              const isActive = stepNumber === currentStep;
              const isCompleted = stepNumber < currentStep;
              
              return (
                <div key={step} className="flex flex-col items-center flex-1">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold mb-2 transition-all duration-300 ${
                      isActive
                        ? 'bg-[#001360] text-white shadow-lg'
                        : isCompleted
                        ? 'bg-[#001360] text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {isCompleted ? '✓' : stepNumber}
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                    className={`text-sm text-center max-w-[120px] leading-tight ${
                      isActive ? 'text-[#001360] font-medium' : 'text-gray-600'
                    }`}
                  >
                    {step}
                  </motion.p>
                </div>
              );
            })}
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="bg-gradient-to-r from-[#001360] to-[#143ad0] h-2 rounded-full"
            />
          </div>
        </div>
      </motion.div>

      {/* Step Content */}
      <div className="flex-1 py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Step Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center px-4 py-2 bg-blue-100 text-[#143ad0] rounded-full text-sm font-medium mb-4"
            >
              Step {currentStep} - Required Verification
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl font-bold text-[#001360] mb-2"
            >
              {stepTitle}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 leading-relaxed max-w-2xl mx-auto"
            >
              {stepDescription}
            </motion.p>
          </motion.div>

          {/* Form Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            {children}
          </motion.div>
        </div>
      </div>
    </div>
  );
}