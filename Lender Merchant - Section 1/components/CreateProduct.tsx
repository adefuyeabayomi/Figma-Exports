import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { toast } from 'sonner@2.0.3';
import { 
  ArrowLeft,
  Save,
  FileText,
  DollarSign,
  Calendar,
  Users,
  Settings,
  AlertCircle
} from 'lucide-react';

interface CreateProductProps {
  onBack: () => void;
}

interface LoanProduct {
  productName: string;
  description: string;
  minAmount: string;
  maxAmount: string;
  interestType: string;
  interestRate: string;
  tenureOptions: string[];
  repaymentFrequency: string;
  gracePeriod: string;
  processingFeeType: string;
  processingFeeValue: string;
  lateFeeType: string;
  lateFeeValue: string;
  earlyRepaymentPenalty: boolean;
  autoApproval: boolean;
  creditScoreThreshold: string;
  borrowerSegments: string[];
  disbursementMethod: string;
  visibleToBorrowers: boolean;
  collateralRequired: boolean;
  collateralType: string;
  status: string;
}

export function CreateProduct({ onBack }: CreateProductProps) {
  const [formData, setFormData] = useState<LoanProduct>({
    productName: '',
    description: '',
    minAmount: '',
    maxAmount: '',
    interestType: '',
    interestRate: '',
    tenureOptions: [],
    repaymentFrequency: '',
    gracePeriod: '3',
    processingFeeType: 'percentage',
    processingFeeValue: '',
    lateFeeType: 'flat',
    lateFeeValue: '',
    earlyRepaymentPenalty: false,
    autoApproval: false,
    creditScoreThreshold: '600',
    borrowerSegments: [],
    disbursementMethod: '',
    visibleToBorrowers: true,
    collateralRequired: false,
    collateralType: '',
    status: 'active'
  });

  const [selectedTenures, setSelectedTenures] = useState<string[]>([]);
  const [selectedSegments, setSelectedSegments] = useState<string[]>([]);

  const tenureOptions = ['7', '14', '30', '60', '90', '180', '365'];
  const segmentOptions = ['SMEs', 'Employees', 'Students', 'Traders', 'Professionals'];

  const handleInputChange = (field: keyof LoanProduct, value: string | boolean | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleTenure = (tenure: string) => {
    const updated = selectedTenures.includes(tenure)
      ? selectedTenures.filter(t => t !== tenure)
      : [...selectedTenures, tenure];
    setSelectedTenures(updated);
    handleInputChange('tenureOptions', updated);
  };

  const toggleSegment = (segment: string) => {
    const updated = selectedSegments.includes(segment)
      ? selectedSegments.filter(s => s !== segment)
      : [...selectedSegments, segment];
    setSelectedSegments(updated);
    handleInputChange('borrowerSegments', updated);
  };

  const handleSubmit = (isDraft: boolean = false) => {
    // Basic validation
    if (!formData.productName || !formData.minAmount || !formData.maxAmount || !formData.interestRate) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (parseFloat(formData.minAmount) >= parseFloat(formData.maxAmount)) {
      toast.error('Maximum amount must be greater than minimum amount');
      return;
    }

    // Simulate API call
    const action = isDraft ? 'draft saved' : 'product created';
    toast.success(`Loan product ${action} successfully!`);
    
    // In a real app, you would save to backend here
    console.log('Saving product:', formData);
    
    // Go back to manage products page
    onBack();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onBack} className="p-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Create New Loan Product</h1>
            <p className="text-sm text-gray-600">Set up a new loan product with custom terms and conditions</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={() => handleSubmit(true)}>
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button onClick={() => handleSubmit(false)}>
            Create Product
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Basic Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="productName">Product Name *</Label>
                  <Input
                    id="productName"
                    placeholder="e.g., SME Boost Loan"
                    value={formData.productName}
                    onChange={(e) => handleInputChange('productName', e.target.value)}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Brief description of the loan product..."
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Loan Terms */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5" />
                <span>Loan Terms</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="minAmount">Minimum Amount (₦) *</Label>
                  <Input
                    id="minAmount"
                    type="number"
                    placeholder="10,000"
                    value={formData.minAmount}
                    onChange={(e) => handleInputChange('minAmount', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="maxAmount">Maximum Amount (₦) *</Label>
                  <Input
                    id="maxAmount"
                    type="number"
                    placeholder="500,000"
                    value={formData.maxAmount}
                    onChange={(e) => handleInputChange('maxAmount', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="interestType">Interest Type *</Label>
                  <Select value={formData.interestType} onValueChange={(value) => handleInputChange('interestType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select interest type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="flat">Flat Rate</SelectItem>
                      <SelectItem value="reducing">Reducing Balance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="interestRate">Interest Rate (%) *</Label>
                  <Input
                    id="interestRate"
                    type="number"
                    step="0.1"
                    placeholder="5.0"
                    value={formData.interestRate}
                    onChange={(e) => handleInputChange('interestRate', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="repaymentFrequency">Repayment Frequency</Label>
                  <Select value={formData.repaymentFrequency} onValueChange={(value) => handleInputChange('repaymentFrequency', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="gracePeriod">Grace Period (Days)</Label>
                  <Input
                    id="gracePeriod"
                    type="number"
                    placeholder="3"
                    value={formData.gracePeriod}
                    onChange={(e) => handleInputChange('gracePeriod', e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <Label>Tenure Options (Days)</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {tenureOptions.map((tenure) => (
                    <Button
                      key={tenure}
                      variant={selectedTenures.includes(tenure) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleTenure(tenure)}
                    >
                      {tenure} days
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fees & Penalties */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Fees & Penalties</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="processingFeeType">Processing Fee Type</Label>
                  <Select value={formData.processingFeeType} onValueChange={(value) => handleInputChange('processingFeeType', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage (%)</SelectItem>
                      <SelectItem value="fixed">Fixed Amount (₦)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="processingFeeValue">Processing Fee Value</Label>
                  <Input
                    id="processingFeeValue"
                    type="number"
                    step="0.1"
                    placeholder={formData.processingFeeType === 'percentage' ? '2.5' : '1000'}
                    value={formData.processingFeeValue}
                    onChange={(e) => handleInputChange('processingFeeValue', e.target.value)}
                  />
                </div>
                <div></div>
                <div>
                  <Label htmlFor="lateFeeType">Late Fee Type</Label>
                  <Select value={formData.lateFeeType} onValueChange={(value) => handleInputChange('lateFeeType', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="flat">Flat Amount</SelectItem>
                      <SelectItem value="daily">Per Day</SelectItem>
                      <SelectItem value="percentage">Percentage of Overdue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="lateFeeValue">Late Fee Value</Label>
                  <Input
                    id="lateFeeValue"
                    type="number"
                    step="0.1"
                    placeholder="500"
                    value={formData.lateFeeValue}
                    onChange={(e) => handleInputChange('lateFeeValue', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="earlyRepayment"
                  checked={formData.earlyRepaymentPenalty}
                  onCheckedChange={(checked) => handleInputChange('earlyRepaymentPenalty', !!checked)}
                />
                <Label htmlFor="earlyRepayment">Apply early repayment penalty</Label>
              </div>
            </CardContent>
          </Card>

          {/* Eligibility & Rules */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Eligibility & Rules</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="autoApproval">Auto-approval</Label>
                  <p className="text-sm text-gray-600">Enable automatic approval based on rules</p>
                </div>
                <Switch
                  id="autoApproval"
                  checked={formData.autoApproval}
                  onCheckedChange={(checked) => handleInputChange('autoApproval', checked)}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="creditScore">Minimum Credit Score</Label>
                  <Input
                    id="creditScore"
                    type="number"
                    placeholder="600"
                    value={formData.creditScoreThreshold}
                    onChange={(e) => handleInputChange('creditScoreThreshold', e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <Label>Target Borrower Segments</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {segmentOptions.map((segment) => (
                    <Button
                      key={segment}
                      variant={selectedSegments.includes(segment) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleSegment(segment)}
                    >
                      {segment}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Advanced Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Advanced Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="disbursementMethod">Disbursement Method</Label>
                  <Select value={formData.disbursementMethod} onValueChange={(value) => handleInputChange('disbursementMethod', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bank">Bank Transfer</SelectItem>
                      <SelectItem value="wallet">Digital Wallet</SelectItem>
                      <SelectItem value="cash">Cash Pickup</SelectItem>
                      <SelectItem value="check">Bank Check</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="status">Product Status</Label>
                  <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="visibleToBorrowers">Visible to Borrowers</Label>
                  <p className="text-sm text-gray-600">Show this product in borrower application</p>
                </div>
                <Switch
                  id="visibleToBorrowers"
                  checked={formData.visibleToBorrowers}
                  onCheckedChange={(checked) => handleInputChange('visibleToBorrowers', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="collateralRequired">Collateral Required</Label>
                  <p className="text-sm text-gray-600">Require collateral for this loan product</p>
                </div>
                <Switch
                  id="collateralRequired"
                  checked={formData.collateralRequired}
                  onCheckedChange={(checked) => handleInputChange('collateralRequired', checked)}
                />
              </div>
              
              {formData.collateralRequired && (
                <div>
                  <Label htmlFor="collateralType">Collateral Type</Label>
                  <Input
                    id="collateralType"
                    placeholder="e.g., Vehicle, Property, Bank Guarantee"
                    value={formData.collateralType}
                    onChange={(e) => handleInputChange('collateralType', e.target.value)}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Product Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-600">Product Name:</span>
                  <p className="font-medium">{formData.productName || 'Not specified'}</p>
                </div>
                <div>
                  <span className="text-gray-600">Amount Range:</span>
                  <p className="font-medium">
                    {formData.minAmount && formData.maxAmount 
                      ? `₦${parseInt(formData.minAmount).toLocaleString()} - ₦${parseInt(formData.maxAmount).toLocaleString()}`
                      : 'Not specified'
                    }
                  </p>
                </div>
                <div>
                  <span className="text-gray-600">Interest Rate:</span>
                  <p className="font-medium">
                    {formData.interestRate ? `${formData.interestRate}% ${formData.interestType}` : 'Not specified'}
                  </p>
                </div>
                <div>
                  <span className="text-gray-600">Tenure Options:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedTenures.length > 0 
                      ? selectedTenures.map(tenure => (
                          <Badge key={tenure} variant="outline" className="text-xs">{tenure} days</Badge>
                        ))
                      : <span className="text-gray-500 text-xs">None selected</span>
                    }
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center space-x-2">
                <AlertCircle className="h-4 w-4" />
                <span>Validation</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${formData.productName ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span>Product name</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${formData.minAmount && formData.maxAmount ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span>Amount range</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${formData.interestRate && formData.interestType ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span>Interest settings</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${selectedTenures.length > 0 ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                  <span>Tenure options</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}