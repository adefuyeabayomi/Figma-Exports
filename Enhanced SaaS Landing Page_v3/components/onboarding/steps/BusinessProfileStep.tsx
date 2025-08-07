import { useState } from 'react';
import { motion } from 'motion/react';
import { Building, ChevronDown, Calendar } from 'lucide-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';

interface BusinessProfileStepProps {
  onNext: () => void;
  data?: any;
  onDataChange?: (data: any) => void;
}

export function BusinessProfileStep({ onNext, data = {}, onDataChange }: BusinessProfileStepProps) {
  const [formData, setFormData] = useState({
    businessName: data.businessName || '',
    businessType: data.businessType || '',
    industry: data.industry || '',
    taxId: data.taxId || '',
    cacNumber: data.cacNumber || '',
    incorporationDate: data.incorporationDate || '',
    description: data.description || '',
    ...data
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const businessTypes = [
    'Sole Proprietorship',
    'Partnership',
    'Limited Liability Company (LLC)',
    'Corporation',
    'Cooperative',
    'Non-Profit Organization'
  ];

  const industries = [
    'Financial Services',
    'Technology',
    'Healthcare',
    'Education',
    'Retail',
    'Manufacturing',
    'Agriculture',
    'Construction',
    'Transportation',
    'Entertainment',
    'Other'
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.businessName.trim()) {
      newErrors.businessName = 'Business name is required';
    }

    if (!formData.businessType) {
      newErrors.businessType = 'Business type is required';
    }

    if (!formData.industry) {
      newErrors.industry = 'Industry is required';
    }

    if (!formData.taxId.trim()) {
      newErrors.taxId = 'Tax identification number is required';
    }

    if (!formData.cacNumber.trim()) {
      newErrors.cacNumber = 'CAC registration number is required';
    }

    if (!formData.incorporationDate) {
      newErrors.incorporationDate = 'Date of incorporation is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    onDataChange?.(formData);
    onNext();
  };

  const updateFormData = (field: string, value: string) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onDataChange?.(newData);
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Business Name */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-2"
      >
        <Label htmlFor="businessName" className="text-[#001360] font-medium">Business Name</Label>
        <div className="relative">
          <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            id="businessName"
            type="text"
            placeholder="Enter your business name"
            value={formData.businessName}
            onChange={(e) => updateFormData('businessName', e.target.value)}
            className={`pl-10 h-12 border-2 rounded-xl transition-all ${
              errors.businessName ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-[#143ad0]'
            }`}
          />
        </div>
        {errors.businessName && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-sm"
          >
            {errors.businessName}
          </motion.p>
        )}
      </motion.div>

      {/* Business Type */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-2"
      >
        <Label htmlFor="businessType" className="text-[#001360] font-medium">Business Type</Label>
        <Select value={formData.businessType} onValueChange={(value) => updateFormData('businessType', value)}>
          <SelectTrigger className={`h-12 border-2 rounded-xl transition-all ${
            errors.businessType ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-[#143ad0]'
          }`}>
            <SelectValue placeholder="Select business type" />
          </SelectTrigger>
          <SelectContent>
            {businessTypes.map((type) => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.businessType && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-sm"
          >
            {errors.businessType}
          </motion.p>
        )}
      </motion.div>

      {/* Industry */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-2"
      >
        <Label htmlFor="industry" className="text-[#001360] font-medium">Industry / Sector</Label>
        <Select value={formData.industry} onValueChange={(value) => updateFormData('industry', value)}>
          <SelectTrigger className={`h-12 border-2 rounded-xl transition-all ${
            errors.industry ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-[#143ad0]'
          }`}>
            <SelectValue placeholder="Select industry" />
          </SelectTrigger>
          <SelectContent>
            {industries.map((industry) => (
              <SelectItem key={industry} value={industry}>{industry}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.industry && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-sm"
          >
            {errors.industry}
          </motion.p>
        )}
      </motion.div>

      {/* Tax ID and CAC Number */}
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-2"
        >
          <Label htmlFor="taxId" className="text-[#001360] font-medium">Tax Identification Number</Label>
          <Input
            id="taxId"
            type="text"
            placeholder="Enter tax ID"
            value={formData.taxId}
            onChange={(e) => updateFormData('taxId', e.target.value)}
            className={`h-12 border-2 rounded-xl transition-all ${
              errors.taxId ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-[#143ad0]'
            }`}
          />
          {errors.taxId && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm"
            >
              {errors.taxId}
            </motion.p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-2"
        >
          <Label htmlFor="cacNumber" className="text-[#001360] font-medium">CAC Registration Number</Label>
          <Input
            id="cacNumber"
            type="text"
            placeholder="Enter CAC number"
            value={formData.cacNumber}
            onChange={(e) => updateFormData('cacNumber', e.target.value)}
            className={`h-12 border-2 rounded-xl transition-all ${
              errors.cacNumber ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-[#143ad0]'
            }`}
          />
          {errors.cacNumber && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm"
            >
              {errors.cacNumber}
            </motion.p>
          )}
        </motion.div>
      </div>

      {/* Date of Incorporation */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
        className="space-y-2"
      >
        <Label htmlFor="incorporationDate" className="text-[#001360] font-medium">Date of Incorporation</Label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            id="incorporationDate"
            type="date"
            value={formData.incorporationDate}
            onChange={(e) => updateFormData('incorporationDate', e.target.value)}
            className={`pl-10 h-12 border-2 rounded-xl transition-all ${
              errors.incorporationDate ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-[#143ad0]'
            }`}
          />
        </div>
        {errors.incorporationDate && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-sm"
          >
            {errors.incorporationDate}
          </motion.p>
        )}
      </motion.div>

      {/* Business Description */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7 }}
        className="space-y-2"
      >
        <Label htmlFor="description" className="text-[#001360] font-medium">Description of Business</Label>
        <Textarea
          id="description"
          placeholder="Describe your business activities, products, or services"
          value={formData.description}
          onChange={(e) => updateFormData('description', e.target.value)}
          className="min-h-[120px] border-2 rounded-xl transition-all border-gray-200 focus:border-[#143ad0] resize-none"
        />
      </motion.div>

      {/* Submit Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex justify-end pt-6"
      >
        <Button
          type="submit"
          className="px-8 py-3 bg-gradient-to-r from-[#020c2f] to-[#143ad0] hover:from-[#143ad0] hover:to-[#002bd9] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center"
        >
          Next Section
          <motion.div
            whileHover={{ x: 5 }}
            className="ml-2"
          >
            →
          </motion.div>
        </Button>
      </motion.div>
    </motion.form>
  );
}