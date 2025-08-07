import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface ForgotPasswordFormProps {
  onBack: () => void;
  onSuccess: () => void;
}

export function ForgotPasswordForm({ onBack, onSuccess }: ForgotPasswordFormProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setError('');
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    onSuccess();
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
    >
      {/* Back Button */}
      <motion.button
        type="button"
        onClick={onBack}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ x: -5 }}
        className="flex items-center text-[#143ad0] hover:text-[#002bd9] transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Login
      </motion.button>

      {/* Email */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-2"
      >
        <Label htmlFor="email" className="text-[#001360] font-medium">Email / User ID</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            id="email"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
            className={`pl-10 h-12 border-2 rounded-xl transition-all ${
              error ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-[#143ad0]'
            }`}
          />
        </div>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-sm"
          >
            {error}
          </motion.p>
        )}
      </motion.div>

      {/* Submit Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 bg-gradient-to-r from-[#020c2f] to-[#143ad0] hover:from-[#143ad0] hover:to-[#002bd9] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {isLoading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
            />
          ) : (
            'Send Me The Recovery Mail'
          )}
        </Button>
      </motion.div>

      {/* Info Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-blue-50 border border-blue-200 rounded-xl p-4"
      >
        <p className="text-sm text-blue-700 leading-relaxed">
          <strong>Need help?</strong> If you don't receive the email within 5 minutes, check your spam folder or contact support.
        </p>
      </motion.div>
    </motion.form>
  );
}