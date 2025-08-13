import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { toast } from 'sonner@2.0.3';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Search,
  Filter,
  Eye,
  FileText,
  Calendar,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  PiggyBank,
  TrendingUp,
  Download,
  Forward,
  MessageSquare,
  Home,
  Car,
  GraduationCap,
  ShoppingCart
} from 'lucide-react';

interface LoanApplication {
  id: string;
  applicantName: string;
  phone: string;
  email: string;
  applicationId: string;
  loanAmount: number;
  purpose: string;
  dateApplied: string;
  status: 'new' | 'under-review' | 'approved' | 'rejected';
  riskLevel: 'low' | 'medium' | 'high';
  docsStatus: 'complete' | 'missing' | 'uploading';
  kycLevel: 'basic' | 'tier1' | 'tier2';
  employmentStatus: 'employed' | 'self-employed' | 'unemployed';
  personalInfo: {
    fullName: string;
    dateOfBirth: string;
    address: string;
    occupation: string;
    monthlyIncome: number;
    accountBalance: number;
  };
  loanDetails: {
    requestedAmount: number;
    duration: number;
    collateral?: string;
    guarantor?: string;
  };
  riskScore: number;
  documents: Array<{
    type: string;
    status: 'verified' | 'pending' | 'rejected';
    url: string;
  }>;
  notes?: string;
  reviewedBy?: string;
  reviewedAt?: string;
}

const purposeIcons = {
  'Business': <Briefcase className="h-4 w-4" />,
  'Rent': <Home className="h-4 w-4" />,
  'School': <GraduationCap className="h-4 w-4" />,
  'Vehicle': <Car className="h-4 w-4" />,
  'Personal': <ShoppingCart className="h-4 w-4" />
};

// Mock data for new applications
const mockApplications: LoanApplication[] = [
  {
    id: '1',
    applicantName: 'Jane Doe',
    phone: '08023456789',
    email: 'jane@example.com',
    applicationId: 'APP001',
    loanAmount: 80000,
    purpose: 'Business',
    dateApplied: '2024-07-25',
    status: 'new',
    riskLevel: 'high',
    docsStatus: 'complete',
    kycLevel: 'tier1',
    employmentStatus: 'self-employed',
    personalInfo: {
      fullName: 'Jane Chioma Doe',
      dateOfBirth: '1990-03-15',
      address: '123 Victoria Island, Lagos',
      occupation: 'Small Business Owner',
      monthlyIncome: 150000,
      accountBalance: 45000
    },
    loanDetails: {
      requestedAmount: 80000,
      duration: 6,
      collateral: 'Business Equipment'
    },
    riskScore: 650,
    documents: [
      { type: 'ID Card', status: 'verified', url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400' },
      { type: 'Bank Statement', status: 'verified', url: 'https://images.unsplash.com/photo-1554224154-26032fced90b?w=400' },
      { type: 'Business Registration', status: 'pending', url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400' }
    ]
  },
  {
    id: '2',
    applicantName: 'Michael Johnson',
    phone: '08034567890',
    email: 'michael@example.com',
    applicationId: 'APP002',
    loanAmount: 120000,
    purpose: 'Rent',
    dateApplied: '2024-07-24',
    status: 'new',
    riskLevel: 'medium',
    docsStatus: 'complete',
    kycLevel: 'tier2',
    employmentStatus: 'employed',
    personalInfo: {
      fullName: 'Michael Emeka Johnson',
      dateOfBirth: '1987-11-22',
      address: '456 Ikeja, Lagos',
      occupation: 'Software Engineer',
      monthlyIncome: 280000,
      accountBalance: 180000
    },
    loanDetails: {
      requestedAmount: 120000,
      duration: 12,
      guarantor: 'Available'
    },
    riskScore: 720,
    documents: [
      { type: 'ID Card', status: 'verified', url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400' },
      { type: 'Salary Certificate', status: 'verified', url: 'https://images.unsplash.com/photo-1554224154-26032fced90b?w=400' },
      { type: 'Bank Statement', status: 'verified', url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400' }
    ]
  },
  {
    id: '3',
    applicantName: 'Sarah Williams',
    phone: '08045678901',
    email: 'sarah@example.com',
    applicationId: 'APP003',
    loanAmount: 200000,
    purpose: 'School',
    dateApplied: '2024-07-23',
    status: 'new',
    riskLevel: 'low',
    docsStatus: 'complete',
    kycLevel: 'tier2',
    employmentStatus: 'employed',
    personalInfo: {
      fullName: 'Sarah Adaeze Williams',
      dateOfBirth: '1995-06-10',
      address: '789 Abuja',
      occupation: 'Bank Manager',
      monthlyIncome: 450000,
      accountBalance: 320000
    },
    loanDetails: {
      requestedAmount: 200000,
      duration: 24,
      guarantor: 'Available',
      collateral: 'Fixed Deposit'
    },
    riskScore: 820,
    documents: [
      { type: 'ID Card', status: 'verified', url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400' },
      { type: 'Employment Letter', status: 'verified', url: 'https://images.unsplash.com/photo-1554224154-26032fced90b?w=400' },
      { type: 'School Admission', status: 'verified', url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400' }
    ]
  },
  {
    id: '4',
    applicantName: 'David Chen',
    phone: '08056789012',
    email: 'david@example.com',
    applicationId: 'APP004',
    loanAmount: 50000,
    purpose: 'Personal',
    dateApplied: '2024-07-22',
    status: 'new',
    riskLevel: 'medium',
    docsStatus: 'missing',
    kycLevel: 'basic',
    employmentStatus: 'employed',
    personalInfo: {
      fullName: 'David Chinedu Chen',
      dateOfBirth: '1992-08-30',
      address: '321 Port Harcourt',
      occupation: 'Sales Representative',
      monthlyIncome: 120000,
      accountBalance: 25000
    },
    loanDetails: {
      requestedAmount: 50000,
      duration: 3
    },
    riskScore: 580,
    documents: [
      { type: 'ID Card', status: 'verified', url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400' },
      { type: 'Bank Statement', status: 'pending', url: 'https://images.unsplash.com/photo-1554224154-26032fced90b?w=400' }
    ]
  },
  {
    id: '5',
    applicantName: 'Amina Hassan',
    phone: '08067890123',
    email: 'amina@example.com',
    applicationId: 'APP005',
    loanAmount: 300000,
    purpose: 'Vehicle',
    dateApplied: '2024-07-21',
    status: 'new',
    riskLevel: 'high',
    docsStatus: 'uploading',
    kycLevel: 'tier1',
    employmentStatus: 'self-employed',
    personalInfo: {
      fullName: 'Amina Hassan Mohammed',
      dateOfBirth: '1989-12-05',
      address: '654 Kano',
      occupation: 'Trader',
      monthlyIncome: 200000,
      accountBalance: 80000
    },
    loanDetails: {
      requestedAmount: 300000,
      duration: 36,
      collateral: 'Vehicle Documentation'
    },
    riskScore: 620,
    documents: [
      { type: 'ID Card', status: 'verified', url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400' },
      { type: 'Business Documents', status: 'pending', url: 'https://images.unsplash.com/photo-1554224154-26032fced90b?w=400' }
    ]
  }
];

export function NewApplications() {
  const [applications, setApplications] = useState<LoanApplication[]>(mockApplications);
  const [searchTerm, setSearchTerm] = useState('');
  const [purposeFilter, setPurposeFilter] = useState<string>('all');
  const [riskFilter, setRiskFilter] = useState<string>('all');
  const [employmentFilter, setEmploymentFilter] = useState<string>('all');
  const [selectedApplication, setSelectedApplication] = useState<LoanApplication | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // Filter applications
  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.phone.includes(searchTerm) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.applicationId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPurpose = purposeFilter === 'all' || app.purpose === purposeFilter;
    const matchesRisk = riskFilter === 'all' || app.riskLevel === riskFilter;
    const matchesEmployment = employmentFilter === 'all' || app.employmentStatus === employmentFilter;
    
    return matchesSearch && matchesPurpose && matchesRisk && matchesEmployment;
  });

  const getRiskBadge = (level: string) => {
    switch (level) {
      case 'low':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">🟢 Low</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">🟡 Medium</Badge>;
      case 'high':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">🔴 High</Badge>;
      default:
        return <Badge variant="secondary">{level}</Badge>;
    }
  };

  const getDocsStatusBadge = (status: string) => {
    switch (status) {
      case 'complete':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">✅</Badge>;
      case 'missing':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">⚠️</Badge>;
      case 'uploading':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">⏳</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const formatted = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
    
    if (diffDays === 1) return `${formatted} (Yesterday)`;
    if (diffDays < 7) return `${formatted} (${diffDays} days ago)`;
    return formatted;
  };

  const handleDecision = (applicationId: string, decision: 'forward' | 'info' | 'reject') => {
    setApplications(prev => prev.map(app => 
      app.id === applicationId 
        ? { 
            ...app, 
            status: decision === 'forward' ? 'under-review' : decision === 'reject' ? 'rejected' : app.status,
            notes: reviewNotes,
            reviewedBy: 'Current User',
            reviewedAt: new Date().toISOString()
          }
        : app
    ));
    
    const actionText = decision === 'forward' ? 'forwarded to underwriting' : 
                     decision === 'info' ? 'marked for more info' : 'rejected';
    toast.success(`Application ${actionText} successfully`);
    setSelectedApplication(null);
    setReviewNotes('');
  };

  const handleBulkAction = (action: 'reviewed' | 'reject' | 'export') => {
    if (action === 'export') {
      toast.success(`${selectedItems.length} applications exported to CSV`);
    } else {
      setApplications(prev => prev.map(app => 
        selectedItems.includes(app.id)
          ? { 
              ...app, 
              status: action === 'reject' ? 'rejected' : 'under-review',
              reviewedBy: 'Current User',
              reviewedAt: new Date().toISOString()
            }
          : app
      ));
      
      toast.success(`${selectedItems.length} applications ${action === 'reject' ? 'rejected' : 'marked as reviewed'}`);
    }
    setSelectedItems([]);
  };

  const toggleSelection = (applicationId: string) => {
    setSelectedItems(prev => 
      prev.includes(applicationId)
        ? prev.filter(id => id !== applicationId)
        : [...prev, applicationId]
    );
  };

  const selectAll = () => {
    const newIds = filteredApplications
      .filter(app => app.status === 'new')
      .map(app => app.id);
    setSelectedItems(selectedItems.length === newIds.length ? [] : newIds);
  };

  // Calculate stats
  const totalApplications = applications.length;
  const averageAmount = Math.round(applications.reduce((sum, app) => sum + app.loanAmount, 0) / applications.length);
  const highRiskCount = applications.filter(app => app.riskLevel === 'high').length;
  const awaitingDocsCount = applications.filter(app => app.docsStatus === 'missing' || app.docsStatus === 'uploading').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">📥 New Loan Applications</h1>
          <p className="text-sm text-gray-600">Review and process newly submitted loan applications. Applications here haven't been approved or rejected yet.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
        </div>
      </div>

      {/* Statistics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{totalApplications}</div>
                <div className="text-sm text-gray-600">Total Applications</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">₦{averageAmount.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Average Amount</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{highRiskCount}</div>
                <div className="text-sm text-gray-600">High Risk</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{awaitingDocsCount}</div>
                <div className="text-sm text-gray-600">Awaiting Docs</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search & Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-1 gap-4 items-center">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name, phone, email, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={purposeFilter} onValueChange={setPurposeFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Purpose" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Purposes</SelectItem>
                  <SelectItem value="Business">Business</SelectItem>
                  <SelectItem value="Rent">Rent</SelectItem>
                  <SelectItem value="School">School</SelectItem>
                  <SelectItem value="Vehicle">Vehicle</SelectItem>
                  <SelectItem value="Personal">Personal</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={riskFilter} onValueChange={setRiskFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Risk Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Risk Levels</SelectItem>
                  <SelectItem value="low">Low Risk</SelectItem>
                  <SelectItem value="medium">Medium Risk</SelectItem>
                  <SelectItem value="high">High Risk</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={employmentFilter} onValueChange={setEmploymentFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Employment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Employment</SelectItem>
                  <SelectItem value="employed">Employed</SelectItem>
                  <SelectItem value="self-employed">Self-employed</SelectItem>
                  <SelectItem value="unemployed">Unemployed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedItems.length > 0 && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-blue-900">
                {selectedItems.length} item(s) selected
              </div>
              <div className="flex items-center space-x-2">
                <Button size="sm" onClick={() => handleBulkAction('reviewed')}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark as Reviewed
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleBulkAction('reject')}>
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject in Bulk
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('export')}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Applications Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">
                  <Checkbox
                    checked={selectedItems.length === filteredApplications.filter(app => app.status === 'new').length}
                    onCheckedChange={selectAll}
                  />
                </TableHead>
                <TableHead>Applicant</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Loan Amount</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead>Date Applied</TableHead>
                <TableHead>Risk Level</TableHead>
                <TableHead>Docs</TableHead>
                <TableHead className="w-20">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedItems.includes(application.id)}
                      onCheckedChange={() => toggleSelection(application.id)}
                      disabled={application.status !== 'new'}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${application.applicantName}`} />
                        <AvatarFallback>{application.applicantName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{application.applicantName}</div>
                        <div className="text-sm text-gray-600">ID: {application.applicationId}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{application.phone}</TableCell>
                  <TableCell className="font-medium">₦{application.loanAmount.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {purposeIcons[application.purpose as keyof typeof purposeIcons]}
                      <span>{application.purpose}</span>
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(application.dateApplied)}</TableCell>
                  <TableCell>{getRiskBadge(application.riskLevel)}</TableCell>
                  <TableCell>{getDocsStatusBadge(application.docsStatus)}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            setSelectedApplication(application);
                            setReviewNotes('');
                          }}
                        >
                          Review →
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Review Application - {application.applicantName}</DialogTitle>
                        </DialogHeader>
                        
                        {selectedApplication && (
                          <Tabs defaultValue="summary" className="w-full">
                            <TabsList className="grid w-full grid-cols-4">
                              <TabsTrigger value="summary">Summary</TabsTrigger>
                              <TabsTrigger value="financial">Financial</TabsTrigger>
                              <TabsTrigger value="kyc">KYC Documents</TabsTrigger>
                              <TabsTrigger value="decision">Decision</TabsTrigger>
                            </TabsList>
                            
                            <TabsContent value="summary" className="space-y-6">
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Applicant Summary */}
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">Applicant Information</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-3">
                                    <div className="flex items-center space-x-2">
                                      <User className="h-4 w-4 text-gray-400" />
                                      <span>{selectedApplication.personalInfo.fullName}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <Calendar className="h-4 w-4 text-gray-400" />
                                      <span>{selectedApplication.personalInfo.dateOfBirth}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <Mail className="h-4 w-4 text-gray-400" />
                                      <span>{selectedApplication.email}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <Phone className="h-4 w-4 text-gray-400" />
                                      <span>{selectedApplication.phone}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <MapPin className="h-4 w-4 text-gray-400" />
                                      <span>{selectedApplication.personalInfo.address}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <Briefcase className="h-4 w-4 text-gray-400" />
                                      <span>{selectedApplication.personalInfo.occupation}</span>
                                    </div>
                                    <div className="flex items-center justify-between pt-2 border-t">
                                      <span className="text-sm text-gray-600">Employment Status</span>
                                      <Badge variant="outline">{selectedApplication.employmentStatus}</Badge>
                                    </div>
                                  </CardContent>
                                </Card>

                                {/* Loan Request Summary */}
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">Loan Request</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <div className="text-sm text-gray-600">Amount Requested</div>
                                        <div className="text-xl font-bold">₦{selectedApplication.loanDetails.requestedAmount.toLocaleString()}</div>
                                      </div>
                                      <div>
                                        <div className="text-sm text-gray-600">Duration</div>
                                        <div className="text-xl font-bold">{selectedApplication.loanDetails.duration} months</div>
                                      </div>
                                      <div>
                                        <div className="text-sm text-gray-600">Purpose</div>
                                        <div className="flex items-center space-x-2">
                                          {purposeIcons[selectedApplication.purpose as keyof typeof purposeIcons]}
                                          <span>{selectedApplication.purpose}</span>
                                        </div>
                                      </div>
                                      <div>
                                        <div className="text-sm text-gray-600">Risk Score</div>
                                        <div className="flex items-center space-x-2">
                                          <span className="text-lg font-bold">{selectedApplication.riskScore}</span>
                                          {getRiskBadge(selectedApplication.riskLevel)}
                                        </div>
                                      </div>
                                    </div>
                                    {selectedApplication.loanDetails.collateral && (
                                      <div>
                                        <div className="text-sm text-gray-600">Collateral</div>
                                        <div>{selectedApplication.loanDetails.collateral}</div>
                                      </div>
                                    )}
                                    {selectedApplication.loanDetails.guarantor && (
                                      <div>
                                        <div className="text-sm text-gray-600">Guarantor</div>
                                        <div>{selectedApplication.loanDetails.guarantor}</div>
                                      </div>
                                    )}
                                  </CardContent>
                                </Card>
                              </div>
                            </TabsContent>

                            <TabsContent value="financial" className="space-y-4">
                              <Card>
                                <CardHeader>
                                  <CardTitle className="text-lg">Financial Information</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="text-center">
                                      <div className="text-2xl font-bold text-green-600">₦{selectedApplication.personalInfo.monthlyIncome.toLocaleString()}</div>
                                      <div className="text-sm text-gray-600">Monthly Income</div>
                                    </div>
                                    <div className="text-center">
                                      <div className="text-2xl font-bold text-blue-600">₦{selectedApplication.personalInfo.accountBalance.toLocaleString()}</div>
                                      <div className="text-sm text-gray-600">Account Balance</div>
                                    </div>
                                    <div className="text-center">
                                      <div className="text-2xl font-bold text-purple-600">{selectedApplication.riskScore}</div>
                                      <div className="text-sm text-gray-600">Credit Score</div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </TabsContent>

                            <TabsContent value="kyc" className="space-y-4">
                              <Card>
                                <CardHeader>
                                  <CardTitle className="text-lg">KYC Documents</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {selectedApplication.documents.map((doc, index) => (
                                      <div key={index} className="border rounded-lg p-3">
                                        <div className="flex items-center justify-between mb-2">
                                          <span className="font-medium text-sm">{doc.type}</span>
                                          <Badge 
                                            className={
                                              doc.status === 'verified' ? 'bg-green-100 text-green-800' :
                                              doc.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                              'bg-yellow-100 text-yellow-800'
                                            }
                                          >
                                            {doc.status}
                                          </Badge>
                                        </div>
                                        <div className="aspect-video bg-gray-100 rounded overflow-hidden">
                                          <ImageWithFallback
                                            src={doc.url}
                                            alt={doc.type}
                                            className="w-full h-full object-cover"
                                          />
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </CardContent>
                              </Card>
                            </TabsContent>

                            <TabsContent value="decision" className="space-y-6">
                              <Card>
                                <CardHeader>
                                  <CardTitle className="text-lg">Underwriter Notes</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <Textarea
                                    placeholder="Add your review notes and recommendations..."
                                    value={reviewNotes}
                                    onChange={(e) => setReviewNotes(e.target.value)}
                                    rows={4}
                                  />
                                </CardContent>
                              </Card>

                              {/* Decision Buttons */}
                              {selectedApplication.status === 'new' && (
                                <div className="flex space-x-3">
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button className="flex-1 bg-green-600 hover:bg-green-700">
                                        <Forward className="h-4 w-4 mr-2" />
                                        Forward to Underwriting
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>Forward to Underwriting</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          Are you sure you want to forward this application to the underwriting team for final decision?
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => handleDecision(selectedApplication.id, 'forward')}>
                                          Forward
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>

                                  <Button 
                                    variant="outline" 
                                    className="flex-1"
                                    onClick={() => handleDecision(selectedApplication.id, 'info')}
                                  >
                                    <MessageSquare className="h-4 w-4 mr-2" />
                                    Request More Info
                                  </Button>

                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button variant="destructive" className="flex-1">
                                        <XCircle className="h-4 w-4 mr-2" />
                                        Reject Application
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>Reject Application</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          Are you sure you want to reject this loan application? This action cannot be undone.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => handleDecision(selectedApplication.id, 'reject')}>
                                          Reject
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </div>
                              )}
                            </TabsContent>
                          </Tabs>
                        )}
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {filteredApplications.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium mb-2">No applications found</h3>
              <p className="text-sm">
                {searchTerm || purposeFilter !== 'all' || riskFilter !== 'all' || employmentFilter !== 'all'
                  ? 'Try adjusting your search or filter criteria.'
                  : 'No new loan applications at this time.'
                }
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}