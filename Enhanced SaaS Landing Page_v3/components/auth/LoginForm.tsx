import { useState } from 'react';
import { motion } from 'motion/react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import imgGoogleLogo98081 from "figma:asset/f88184c68dee88f348660b174d22c163e0848498.png";

interface LoginFormProps {
  onSuccess: () => void;
  onSwitchToSignUp: () => void;
  onForgotPassword: () => void;
}

export function LoginForm({ onSuccess, onSwitchToSignUp, onForgotPassword }: LoginFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    onSuccess();
  };

  const handleGoogleLogin = () => {
    // Handle Google login
    console.log('Google login');
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
    >
      {/* Email */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-2"
      >
        <Label htmlFor="email" className="text-[#001360] font-medium">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            id="email"
            type="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`pl-10 h-12 border-2 rounded-xl transition-all ${
              errors.email ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-[#143ad0]'
            }`}
          />
        </div>
        {errors.email && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-sm"
          >
            {errors.email}
          </motion.p>
        )}
      </motion.div>

      {/* Password */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-2"
      >
        <div className="flex items-center justify-between">
          <Label htmlFor="password" className="text-[#001360] font-medium">Password</Label>
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-sm text-[#143ad0] hover:text-[#002bd9] transition-colors hover:underline"
          >
            Forgot password?
          </button>
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className={`pl-10 pr-12 h-12 border-2 rounded-xl transition-all ${
              errors.password ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-[#143ad0]'
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {errors.password && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-sm"
          >
            {errors.password}
          </motion.p>
        )}
      </motion.div>

      {/* Submit Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
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
            'Login'
          )}
        </Button>
      </motion.div>

      {/* Divider */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="relative flex items-center justify-center"
      >
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative bg-white px-4 text-sm text-gray-500">Or continue with</div>
      </motion.div>

      {/* Google Login */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Button
          type="button"
          onClick={handleGoogleLogin}
          variant="outline"
          className="w-full h-12 border-2 border-gray-200 hover:border-[#143ad0] rounded-xl font-medium transition-all duration-300 hover:shadow-md"
        >
          <img src={imgGoogleLogo98081} alt="Google" className="w-5 h-5 mr-3" />
          Sign in with Google
        </Button>
      </motion.div>

      {/* Switch to Sign Up */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-center"
      >
        <p className="text-gray-600">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToSignUp}
            className="text-[#143ad0] hover:text-[#002bd9] font-medium transition-colors hover:underline"
          >
            Create New Account Here
          </button>
        </p>
      </motion.div>
    </motion.form>
  );
}