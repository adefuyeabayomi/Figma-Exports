import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { toast } from 'sonner@2.0.3';
import { 
  Search,
  Filter,
  Eye,
  MoreHorizontal,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CreditCard,
  TrendingUp,
  TrendingDown,
  Users,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  FileText,
  Download,
  UserX,
  UserCheck
} from 'lucide-react';

interface Borrower {
  id: string;
  name: string;
  email: string;
  phone: string;
  customerId: string;
  kycStatus: 'approved' | 'pending' | 'rejected';
  accountStatus: 'active' | 'blocked' | 'dormant';
  dateJoined: string;
  lastActive: string;
  personalInfo: {
    fullName: string;
    dateOfBirth: string;
    address: string;
    occupation: string;
  };
  loanHistory: {
    totalLoans: number;
    activeLoans: number;
    totalBorrowed: number;
    totalRepaid: number;
    currentOutstanding: number;
  };
  repaymentBehavior: {
    onTimePayments: number;
    latePayments: number;
    missedPayments: number;
    onTimePercentage: number;
  };
  riskScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  loans: Array<{
    id: string;
    amount: number;
    product: string;
    status: 'active' | 'completed' | 'defaulted';
    disbursedDate: string;
    dueDate: string;
    repaidAmount: number;
  }>;
  notes?: string;
}

// Mock data for borrowers
const mockBorrowers: Borrower[] = [
  {
    id: '1',
    name: 'Jane Doe',
    email: 'jane@example.com',
    phone: '08023456789',
    customerId: 'CU001',
    kycStatus: 'approved',
    accountStatus: 'active',
    dateJoined: '2024-03-15',
    lastActive: '2024-07-23',
    personalInfo: {
      fullName: 'Jane Chioma Doe',
      dateOfBirth: '1992-08-15',
      address: '123 Victoria Island, Lagos',
      occupation: 'Software Engineer'
    },
    loanHistory: {
      totalLoans: 2,
      activeLoans: 1,
      totalBorrowed: 320000,
      totalRepaid: 280000,
      currentOutstanding: 40000
    },
    repaymentBehavior: {
      onTimePayments: 18,
      latePayments: 2,
      missedPayments: 0,
      onTimePercentage: 90
    },
    riskScore: 750,
    riskLevel: 'low',
    loans: [
      {
        id: 'L001',
        amount: 150000,
        product: 'SME Boost Loan',
        status: 'completed',
        disbursedDate: '2024-03-20',
        dueDate: '2024-05-20',
        repaidAmount: 150000
      },
      {
        id: 'L002',
        amount: 170000,
        product: 'Business Growth',
        status: 'active',
        disbursedDate: '2024-06-15',
        dueDate: '2024-08-15',
        repaidAmount: 130000
      }
    ]
  },
  {
    id: '2',
    name: 'John Smith',
    email: 'john@example.com',
    phone: '08034567890',
    customerId: 'CU002',
    kycStatus: 'approved',
    accountStatus: 'active',
    dateJoined: '2024-01-10',
    lastActive: '2024-07-20',
    personalInfo: {
      fullName: 'John Emeka Smith',
      dateOfBirth: '1988-05-22',
      address: '456 Ikeja, Lagos',
      occupation: 'Trader'
    },
    loanHistory: {
      totalLoans: 4,
      activeLoans: 2,
      totalBorrowed: 580000,
      totalRepaid: 520000,
      currentOutstanding: 60000
    },
    repaymentBehavior: {
      onTimePayments: 32,
      latePayments: 8,
      missedPayments: 2,
      onTimePercentage: 76
    },
    riskScore: 620,
    riskLevel: 'medium',
    loans: [
      {
        id: 'L003',
        amount: 100000,
        product: 'Quick Cash',
        status: 'completed',
        disbursedDate: '2024-01-15',
        dueDate: '2024-02-15',
        repaidAmount: 100000
      },
      {
        id: 'L004',
        amount: 200000,
        product: 'SME Boost Loan',
        status: 'active',
        disbursedDate: '2024-06-01',
        dueDate: '2024-08-01',
        repaidAmount: 150000
      }
    ]
  },
  {
    id: '3',
    name: 'Mary Johnson',
    email: 'mary@example.com',
    phone: '08045678901',
    customerId: 'CU003',
    kycStatus: 'pending',
    accountStatus: 'active',
    dateJoined: '2024-07-01',
    lastActive: '2024-07-24',
    personalInfo: {
      fullName: 'Mary Adaeze Johnson',
      dateOfBirth: '1995-12-03',
      address: '789 Abuja',
      occupation: 'Teacher'
    },
    loanHistory: {
      totalLoans: 0,
      activeLoans: 0,
      totalBorrowed: 0,
      totalRepaid: 0,
      currentOutstanding: 0
    },
    repaymentBehavior: {
      onTimePayments: 0,
      latePayments: 0,
      missedPayments: 0,
      onTimePercentage: 0
    },
    riskScore: 0,
    riskLevel: 'low',
    loans: []
  },
  {
    id: '4',
    name: 'David Wilson',
    email: 'david@example.com',
    phone: '08056789012',
    customerId: 'CU004',
    kycStatus: 'approved',
    accountStatus: 'blocked',
    dateJoined: '2023-11-20',
    lastActive: '2024-06-15',
    personalInfo: {
      fullName: 'David Chinedu Wilson',
      dateOfBirth: '1990-03-18',
      address: '321 Port Harcourt',
      occupation: 'Businessman'
    },
    loanHistory: {
      totalLoans: 3,
      activeLoans: 1,
      totalBorrowed: 450000,
      totalRepaid: 300000,
      currentOutstanding: 150000
    },
    repaymentBehavior: {
      onTimePayments: 15,
      latePayments: 12,
      missedPayments: 8,
      onTimePercentage: 43
    },
    riskScore: 420,
    riskLevel: 'high',
    loans: [
      {
        id: 'L005',
        amount: 180000,
        product: 'Business Growth',
        status: 'defaulted',
        disbursedDate: '2024-02-10',
        dueDate: '2024-05-10',
        repaidAmount: 90000
      }
    ],
    notes: 'Account blocked due to repeated late payments and missed due dates.'
  }
];

export function BorrowerDirectory() {
  const [borrowers, setBorrowers] = useState<Borrower[]>(mockBorrowers);
  const [searchTerm, setSearchTerm] = useState('');
  const [kycFilter, setKycFilter] = useState<string>('all');
  const [accountStatusFilter, setAccountStatusFilter] = useState<string>('all');
  const [loanActivityFilter, setLoanActivityFilter] = useState<string>('all');
  const [selectedBorrower, setSelectedBorrower] = useState<Borrower | null>(null);

  // Filter borrowers
  const filteredBorrowers = borrowers.filter(borrower => {
    const matchesSearch = 
      borrower.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      borrower.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      borrower.phone.includes(searchTerm) ||
      borrower.customerId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesKyc = kycFilter === 'all' || borrower.kycStatus === kycFilter;
    const matchesAccountStatus = accountStatusFilter === 'all' || borrower.accountStatus === accountStatusFilter;
    const matchesLoanActivity = 
      loanActivityFilter === 'all' ||
      (loanActivityFilter === 'has-loan' && borrower.loanHistory.totalLoans > 0) ||
      (loanActivityFilter === 'never-borrowed' && borrower.loanHistory.totalLoans === 0);
    
    return matchesSearch && matchesKyc && matchesAccountStatus && matchesLoanActivity;
  });

  const getKycStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">✅ Approved</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">🟡 Pending</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">❌ Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getAccountStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
      case 'blocked':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Blocked</Badge>;
      case 'dormant':
        return <Badge variant="outline">Dormant</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getRiskLevelBadge = (level: string) => {
    switch (level) {
      case 'low':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Low Risk</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Medium Risk</Badge>;
      case 'high':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">High Risk</Badge>;
      default:
        return <Badge variant="secondary">{level}</Badge>;
    }
  };

  const getLoanStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Active</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>;
      case 'defaulted':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Defaulted</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  const handleAccountAction = (borrowerId: string, action: 'suspend' | 'reactivate') => {
    setBorrowers(prev => prev.map(borrower => 
      borrower.id === borrowerId 
        ? { 
            ...borrower, 
            accountStatus: action === 'suspend' ? 'blocked' : 'active'
          }
        : borrower
    ));
    
    toast.success(`Account ${action === 'suspend' ? 'suspended' : 'reactivated'} successfully`);
  };

  // Calculate stats
  const totalBorrowers = borrowers.length;
  const activeLoans = borrowers.reduce((sum, b) => sum + b.loanHistory.activeLoans, 0);
  const delinquentBorrowers = borrowers.filter(b => 
    b.repaymentBehavior.onTimePercentage < 80 && b.loanHistory.activeLoans > 0
  ).length;
  const delinquentPercentage = activeLoans > 0 ? Math.round((delinquentBorrowers / activeLoans) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Borrower Directory</h1>
          <p className="text-sm text-gray-600">Manage and monitor all your borrowers</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Directory
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{totalBorrowers}</div>
                <div className="text-sm text-gray-600">Total Borrowers</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CreditCard className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{activeLoans}</div>
                <div className="text-sm text-gray-600">Active Loans</div>
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
                <div className="text-2xl font-bold text-gray-900">{delinquentPercentage}%</div>
                <div className="text-sm text-gray-600">Delinquent Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-1 gap-4 items-center">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search borrowers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={kycFilter} onValueChange={setKycFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="KYC Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All KYC</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={accountStatusFilter} onValueChange={setAccountStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Account Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Accounts</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="blocked">Blocked</SelectItem>
                  <SelectItem value="dormant">Dormant</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={loanActivityFilter} onValueChange={setLoanActivityFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Loan Activity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Activity</SelectItem>
                  <SelectItem value="has-loan">Has Loans</SelectItem>
                  <SelectItem value="never-borrowed">Never Borrowed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Borrowers Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>KYC Status</TableHead>
                <TableHead>Account Status</TableHead>
                <TableHead>Loans</TableHead>
                <TableHead>Total Repaid</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead className="w-20">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBorrowers.map((borrower) => (
                <TableRow key={borrower.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${borrower.name}`} />
                        <AvatarFallback>{borrower.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{borrower.name}</div>
                        <div className="text-sm text-gray-600">ID: {borrower.customerId}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="text-sm">{borrower.email}</div>
                      <div className="text-xs text-gray-600">{borrower.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell>{getKycStatusBadge(borrower.kycStatus)}</TableCell>
                  <TableCell>{getAccountStatusBadge(borrower.accountStatus)}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{borrower.loanHistory.totalLoans}</div>
                      <div className="text-sm text-gray-600">
                        {borrower.loanHistory.activeLoans} active
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">
                      ₦{borrower.loanHistory.totalRepaid.toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell>{getTimeAgo(borrower.lastActive)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setSelectedBorrower(borrower)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Borrower Profile - {borrower.name}</DialogTitle>
                          </DialogHeader>
                          
                          {selectedBorrower && (
                            <Tabs defaultValue="overview" className="w-full">
                              <TabsList className="grid w-full grid-cols-4">
                                <TabsTrigger value="overview">Overview</TabsTrigger>
                                <TabsTrigger value="loans">Loan History</TabsTrigger>
                                <TabsTrigger value="kyc">KYC Documents</TabsTrigger>
                                <TabsTrigger value="notes">Notes</TabsTrigger>
                              </TabsList>
                              
                              <TabsContent value="overview" className="space-y-6">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                  {/* Personal Information */}
                                  <Card>
                                    <CardHeader>
                                      <CardTitle className="text-lg">Personal Information</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                      <div className="flex items-center space-x-2">
                                        <User className="h-4 w-4 text-gray-400" />
                                        <span>{selectedBorrower.personalInfo.fullName}</span>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <Calendar className="h-4 w-4 text-gray-400" />
                                        <span>{selectedBorrower.personalInfo.dateOfBirth}</span>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <MapPin className="h-4 w-4 text-gray-400" />
                                        <span>{selectedBorrower.personalInfo.address}</span>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <Phone className="h-4 w-4 text-gray-400" />
                                        <span>{selectedBorrower.phone}</span>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <Mail className="h-4 w-4 text-gray-400" />
                                        <span>{selectedBorrower.email}</span>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <FileText className="h-4 w-4 text-gray-400" />
                                        <span>{selectedBorrower.personalInfo.occupation}</span>
                                      </div>
                                    </CardContent>
                                  </Card>

                                  {/* Loan Summary */}
                                  <Card>
                                    <CardHeader>
                                      <CardTitle className="text-lg">Loan Summary</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <div className="text-sm text-gray-600">Total Loans</div>
                                          <div className="text-xl font-bold">{selectedBorrower.loanHistory.totalLoans}</div>
                                        </div>
                                        <div>
                                          <div className="text-sm text-gray-600">Active Loans</div>
                                          <div className="text-xl font-bold">{selectedBorrower.loanHistory.activeLoans}</div>
                                        </div>
                                        <div>
                                          <div className="text-sm text-gray-600">Total Borrowed</div>
                                          <div className="text-xl font-bold">₦{selectedBorrower.loanHistory.totalBorrowed.toLocaleString()}</div>
                                        </div>
                                        <div>
                                          <div className="text-sm text-gray-600">Total Repaid</div>
                                          <div className="text-xl font-bold">₦{selectedBorrower.loanHistory.totalRepaid.toLocaleString()}</div>
                                        </div>
                                      </div>
                                      {selectedBorrower.loanHistory.currentOutstanding > 0 && (
                                        <div>
                                          <div className="text-sm text-gray-600">Current Outstanding</div>
                                          <div className="text-xl font-bold text-orange-600">
                                            ₦{selectedBorrower.loanHistory.currentOutstanding.toLocaleString()}
                                          </div>
                                        </div>
                                      )}
                                    </CardContent>
                                  </Card>

                                  {/* Repayment Behavior */}
                                  <Card>
                                    <CardHeader>
                                      <CardTitle className="text-lg">Repayment Behavior</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                      <div>
                                        <div className="flex justify-between text-sm mb-1">
                                          <span>On-time Payment Rate</span>
                                          <span>{selectedBorrower.repaymentBehavior.onTimePercentage}%</span>
                                        </div>
                                        <Progress value={selectedBorrower.repaymentBehavior.onTimePercentage} />
                                      </div>
                                      <div className="grid grid-cols-3 gap-4 text-center">
                                        <div>
                                          <div className="text-lg font-bold text-green-600">
                                            {selectedBorrower.repaymentBehavior.onTimePayments}
                                          </div>
                                          <div className="text-xs text-gray-600">On Time</div>
                                        </div>
                                        <div>
                                          <div className="text-lg font-bold text-yellow-600">
                                            {selectedBorrower.repaymentBehavior.latePayments}
                                          </div>
                                          <div className="text-xs text-gray-600">Late</div>
                                        </div>
                                        <div>
                                          <div className="text-lg font-bold text-red-600">
                                            {selectedBorrower.repaymentBehavior.missedPayments}
                                          </div>
                                          <div className="text-xs text-gray-600">Missed</div>
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>

                                  {/* Risk Score */}
                                  <Card>
                                    <CardHeader>
                                      <CardTitle className="text-lg">Risk Assessment</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                      <div className="text-center">
                                        <div className="text-3xl font-bold">{selectedBorrower.riskScore || 'N/A'}</div>
                                        <div className="text-sm text-gray-600">Risk Score</div>
                                        <div className="mt-2">
                                          {getRiskLevelBadge(selectedBorrower.riskLevel)}
                                        </div>
                                      </div>
                                      <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                          <span className="text-sm">KYC Status</span>
                                          {getKycStatusBadge(selectedBorrower.kycStatus)}
                                        </div>
                                        <div className="flex items-center justify-between">
                                          <span className="text-sm">Account Status</span>
                                          {getAccountStatusBadge(selectedBorrower.accountStatus)}
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>
                                </div>
                              </TabsContent>

                              <TabsContent value="loans" className="space-y-4">
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">Loan History</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    {selectedBorrower.loans.length > 0 ? (
                                      <Table>
                                        <TableHeader>
                                          <TableRow>
                                            <TableHead>Loan ID</TableHead>
                                            <TableHead>Product</TableHead>
                                            <TableHead>Amount</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Disbursed</TableHead>
                                            <TableHead>Due Date</TableHead>
                                            <TableHead>Repaid</TableHead>
                                          </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                          {selectedBorrower.loans.map((loan) => (
                                            <TableRow key={loan.id}>
                                              <TableCell className="font-medium">{loan.id}</TableCell>
                                              <TableCell>{loan.product}</TableCell>
                                              <TableCell>₦{loan.amount.toLocaleString()}</TableCell>
                                              <TableCell>{getLoanStatusBadge(loan.status)}</TableCell>
                                              <TableCell>{formatDate(loan.disbursedDate)}</TableCell>
                                              <TableCell>{formatDate(loan.dueDate)}</TableCell>
                                              <TableCell>₦{loan.repaidAmount.toLocaleString()}</TableCell>
                                            </TableRow>
                                          ))}
                                        </TableBody>
                                      </Table>
                                    ) : (
                                      <div className="text-center py-8 text-gray-500">
                                        <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                                        <p>No loan history available</p>
                                      </div>
                                    )}
                                  </CardContent>
                                </Card>
                              </TabsContent>

                              <TabsContent value="kyc">
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">KYC Documents</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="text-center py-8 text-gray-500">
                                      <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                                      <p>KYC documents would be displayed here</p>
                                      <p className="text-sm">Status: {selectedBorrower.kycStatus}</p>
                                    </div>
                                  </CardContent>
                                </Card>
                              </TabsContent>

                              <TabsContent value="notes">
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">Admin Notes</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    {selectedBorrower.notes ? (
                                      <div className="p-4 bg-gray-50 rounded border">
                                        <p>{selectedBorrower.notes}</p>
                                      </div>
                                    ) : (
                                      <div className="text-center py-8 text-gray-500">
                                        <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                                        <p>No notes available for this borrower</p>
                                      </div>
                                    )}
                                  </CardContent>
                                </Card>
                              </TabsContent>
                            </Tabs>
                          )}
                        </DialogContent>
                      </Dialog>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setSelectedBorrower(borrower)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {borrower.accountStatus === 'active' ? (
                            <DropdownMenuItem 
                              onClick={() => handleAccountAction(borrower.id, 'suspend')}
                              className="text-red-600"
                            >
                              <UserX className="h-4 w-4 mr-2" />
                              Suspend Account
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem 
                              onClick={() => handleAccountAction(borrower.id, 'reactivate')}
                              className="text-green-600"
                            >
                              <UserCheck className="h-4 w-4 mr-2" />
                              Reactivate Account
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {filteredBorrowers.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium mb-2">No borrowers found</h3>
              <p className="text-sm">
                {searchTerm || kycFilter !== 'all' || accountStatusFilter !== 'all' || loanActivityFilter !== 'all'
                  ? 'Try adjusting your search or filter criteria.'
                  : 'No borrowers registered yet.'
                }
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}