import { useState } from 'react';
import { motion } from 'motion/react';
import { Eye, EyeOff, Lock, Check } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface PasswordResetFormProps {
  onSuccess: () => void;
}

export function PasswordResetForm({ onSuccess }: PasswordResetFormProps) {
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const passwordRequirements = [
    { text: 'At least 8 characters', met: formData.newPassword.length >= 8 },
    { text: 'Contains uppercase letter', met: /[A-Z]/.test(formData.newPassword) },
    { text: 'Contains lowercase letter', met: /[a-z]/.test(formData.newPassword) },
    { text: 'Contains number', met: /\d/.test(formData.newPassword) },
    { text: 'Contains special character', met: /[!@#$%^&*(),.?":{}|<>]/.test(formData.newPassword) }
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (!passwordRequirements.every(req => req.met)) {
      newErrors.newPassword = 'Password does not meet all requirements';
    }

    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
    >
      {/* New Password */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-2"
      >
        <Label htmlFor="newPassword" className="text-[#001360] font-medium">New Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            id="newPassword"
            type={showNewPassword ? 'text' : 'password'}
            placeholder="Enter your new password"
            value={formData.newPassword}
            onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
            className={`pl-10 pr-12 h-12 border-2 rounded-xl transition-all ${
              errors.newPassword ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-[#143ad0]'
            }`}
          />
          <button
            type="button"
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        
        {/* Password Requirements */}
        {formData.newPassword && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-gray-50 rounded-lg p-3 space-y-2"
          >
            <p className="text-sm font-medium text-gray-700 mb-2">Password Requirements:</p>
            {passwordRequirements.map((req, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-2"
              >
                <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                  req.met ? 'bg-green-500' : 'bg-gray-300'
                }`}>
                  {req.met && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className={`text-sm ${req.met ? 'text-green-700' : 'text-gray-600'}`}>
                  {req.text}
                </span>
              </motion.div>
            ))}
          </motion.div>
        )}
        
        {errors.newPassword && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-sm"
          >
            {errors.newPassword}
          </motion.p>
        )}
      </motion.div>

      {/* Confirm Password */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-2"
      >
        <Label htmlFor="confirmPassword" className="text-[#001360] font-medium">Confirm Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm your new password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            className={`pl-10 pr-12 h-12 border-2 rounded-xl transition-all ${
              errors.confirmPassword ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-[#143ad0]'
            }`}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {errors.confirmPassword && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-sm"
          >
            {errors.confirmPassword}
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
            'Reset Password'
          )}
        </Button>
      </motion.div>
    </motion.form>
  );
}