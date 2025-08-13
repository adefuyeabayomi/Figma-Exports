import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { Progress } from './ui/progress';
import { toast } from 'sonner@2.0.3';
import { 
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Edit,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  User,
  PiggyBank,
  Home,
  Shield,
  Clock,
  FileText,
  AlertTriangle,
  Download,
  BarChart3
} from 'lucide-react';

interface UnderwritingApplication {
  id: string;
  applicantName: string;
  phone: string;
  email: string;
  applicationId: string;
  loanAmount: number;
  purpose: string;
  dateSubmitted: string;
  riskScore: number;
  riskBand: 'low' | 'medium' | 'high';
  dti: number; // Debt-to-income ratio
  kycStatus: 'passed' | 'failed' | 'partial';
  collateral: string;
  decisionStatus: 'awaiting' | 'approved' | 'declined' | 'modified';
  assignedUnderwriter?: string;
  personalInfo: {
    fullName: string;
    monthlyIncome: number;
    monthlyExpenses: number;
    netSurplus: number;
    avgBankBalance: number;
    creditInflow: number;
  };
  otherDebts: {
    totalDebts: number;
    monthlyDebtPayments: number;
  };
  loanRecommendation: {
    approvalLimit: number;
    suggestedTenure: number;
    requiresGuarantor: boolean;
    interestRate: number;
  };
  decisionHistory: Array<{
    underwriter: string;
    date: string;
    action: string;
    comment: string;
  }>;
  notes?: string;
}

// Mock data for underwriting decisions
const mockUnderwritingApplications: UnderwritingApplication[] = [
  {
    id: '1',
    applicantName: 'Yusuf Ahmed',
    phone: '08134567890',
    email: 'yusuf@example.com',
    applicationId: 'UW001',
    loanAmount: 120000,
    purpose: 'Business',
    dateSubmitted: '2024-07-23',
    riskScore: 720,
    riskBand: 'medium',
    dti: 37,
    kycStatus: 'passed',
    collateral: '🏠 House Documents',
    decisionStatus: 'awaiting',
    assignedUnderwriter: 'Tolu Adebayo',
    personalInfo: {
      fullName: 'Yusuf Musa Ahmed',
      monthlyIncome: 250000,
      monthlyExpenses: 180000,
      netSurplus: 70000,
      avgBankBalance: 150000,
      creditInflow: 320000
    },
    otherDebts: {
      totalDebts: 80000,
      monthlyDebtPayments: 15000
    },
    loanRecommendation: {
      approvalLimit: 100000,
      suggestedTenure: 12,
      requiresGuarantor: false,
      interestRate: 18
    },
    decisionHistory: [
      {
        underwriter: 'Sarah Johnson',
        date: '2024-07-23',
        action: 'Sent to Underwriting',
        comment: 'Good financial profile but needs collateral verification'
      }
    ]
  },
  {
    id: '2',
    applicantName: 'Grace Okafor',
    phone: '08045678901',
    email: 'grace@example.com',
    applicationId: 'UW002',
    loanAmount: 200000,
    purpose: 'Education',
    dateSubmitted: '2024-07-22',
    riskScore: 850,
    riskBand: 'low',
    dti: 25,
    kycStatus: 'passed',
    collateral: '💰 Fixed Deposit',
    decisionStatus: 'approved',
    assignedUnderwriter: 'Mike Chen',
    personalInfo: {
      fullName: 'Grace Chioma Okafor',
      monthlyIncome: 400000,
      monthlyExpenses: 220000,
      netSurplus: 180000,
      avgBankBalance: 280000,
      creditInflow: 450000
    },
    otherDebts: {
      totalDebts: 0,
      monthlyDebtPayments: 0
    },
    loanRecommendation: {
      approvalLimit: 200000,
      suggestedTenure: 24,
      requiresGuarantor: false,
      interestRate: 15
    },
    decisionHistory: [
      {
        underwriter: 'Mike Chen',
        date: '2024-07-22',
        action: 'Approved',
        comment: 'Excellent credit profile with strong collateral. Approved full amount.'
      }
    ]
  },
  {
    id: '3',
    applicantName: 'David Wilson',
    phone: '08056789012',
    email: 'david@example.com',
    applicationId: 'UW003',
    loanAmount: 150000,
    purpose: 'Personal',
    dateSubmitted: '2024-07-21',
    riskScore: 580,
    riskBand: 'high',
    dti: 65,
    kycStatus: 'partial',
    collateral: 'None',
    decisionStatus: 'declined',
    assignedUnderwriter: 'Tolu Adebayo',
    personalInfo: {
      fullName: 'David Chinedu Wilson',
      monthlyIncome: 180000,
      monthlyExpenses: 160000,
      netSurplus: 20000,
      avgBankBalance: 25000,
      creditInflow: 180000
    },
    otherDebts: {
      totalDebts: 120000,
      monthlyDebtPayments: 35000
    },
    loanRecommendation: {
      approvalLimit: 0,
      suggestedTenure: 0,
      requiresGuarantor: true,
      interestRate: 25
    },
    decisionHistory: [
      {
        underwriter: 'Tolu Adebayo',
        date: '2024-07-21',
        action: 'Declined',
        comment: 'High DTI ratio (65%) and insufficient collateral. Risk too high for approval.'
      }
    ]
  },
  {
    id: '4',
    applicantName: 'Amina Hassan',
    phone: '08067890123',
    email: 'amina@example.com',
    applicationId: 'UW004',
    loanAmount: 80000,
    purpose: 'Business',
    dateSubmitted: '2024-07-20',
    riskScore: 680,
    riskBand: 'medium',
    dti: 42,
    kycStatus: 'passed',
    collateral: '🚗 Vehicle Registration',
    decisionStatus: 'modified',
    assignedUnderwriter: 'Sarah Johnson',
    personalInfo: {
      fullName: 'Amina Hassan Mohammed',
      monthlyIncome: 200000,
      monthlyExpenses: 140000,
      netSurplus: 60000,
      avgBankBalance: 90000,
      creditInflow: 250000
    },
    otherDebts: {
      totalDebts: 40000,
      monthlyDebtPayments: 12000
    },
    loanRecommendation: {
      approvalLimit: 60000,
      suggestedTenure: 8,
      requiresGuarantor: true,
      interestRate: 20
    },
    decisionHistory: [
      {
        underwriter: 'Sarah Johnson',
        date: '2024-07-20',
        action: 'Modified Terms',
        comment: 'Reduced amount to ₦60,000 with 8-month tenure and guarantor requirement.'
      }
    ]
  },
  {
    id: '5',
    applicantName: 'John Okoro',
    phone: '08078901234',
    email: 'john@example.com',
    applicationId: 'UW005',
    loanAmount: 300000,
    purpose: 'Real Estate',
    dateSubmitted: '2024-07-19',
    riskScore: 750,
    riskBand: 'low',
    dti: 30,
    kycStatus: 'passed',
    collateral: '🏠 Property Title',
    decisionStatus: 'awaiting',
    assignedUnderwriter: 'Mike Chen',
    personalInfo: {
      fullName: 'John Emeka Okoro',
      monthlyIncome: 500000,
      monthlyExpenses: 280000,
      netSurplus: 220000,
      avgBankBalance: 400000,
      creditInflow: 550000
    },
    otherDebts: {
      totalDebts: 50000,
      monthlyDebtPayments: 20000
    },
    loanRecommendation: {
      approvalLimit: 280000,
      suggestedTenure: 36,
      requiresGuarantor: false,
      interestRate: 16
    },
    decisionHistory: [
      {
        underwriter: 'Mike Chen',
        date: '2024-07-19',
        action: 'Under Review',
        comment: 'Excellent profile. Verifying property title documentation.'
      }
    ]
  }
];

export function UnderwritingDecisions() {
  const [applications, setApplications] = useState<UnderwritingApplication[]>(mockUnderwritingApplications);
  const [searchTerm, setSearchTerm] = useState('');
  const [riskBandFilter, setRiskBandFilter] = useState<string>('all');
  const [decisionStatusFilter, setDecisionStatusFilter] = useState<string>('all');
  const [underwriterFilter, setUnderwriterFilter] = useState<string>('all');
  const [selectedApplication, setSelectedApplication] = useState<UnderwritingApplication | null>(null);
  const [decisionNotes, setDecisionNotes] = useState('');
  const [modifiedAmount, setModifiedAmount] = useState<number>(0);
  const [modifiedTenure, setModifiedTenure] = useState<number>(0);

  // Filter applications
  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.phone.includes(searchTerm) ||
      app.applicationId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRiskBand = riskBandFilter === 'all' || app.riskBand === riskBandFilter;
    const matchesDecisionStatus = decisionStatusFilter === 'all' || app.decisionStatus === decisionStatusFilter;
    const matchesUnderwriter = underwriterFilter === 'all' || app.assignedUnderwriter === underwriterFilter;
    
    return matchesSearch && matchesRiskBand && matchesDecisionStatus && matchesUnderwriter;
  });

  const getRiskBandBadge = (band: string) => {
    switch (band) {
      case 'low':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Low</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Medium</Badge>;
      case 'high':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">High</Badge>;
      default:
        return <Badge variant="secondary">{band}</Badge>;
    }
  };

  const getKycStatusBadge = (status: string) => {
    switch (status) {
      case 'passed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">✅ Passed</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">❌ Failed</Badge>;
      case 'partial':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">⚠️ Partial</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getDecisionStatusBadge = (status: string) => {
    switch (status) {
      case 'awaiting':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">⏳ Awaiting</Badge>;
      case 'approved':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">✅ Approved</Badge>;
      case 'declined':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">❌ Declined</Badge>;
      case 'modified':
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">✏️ Modified</Badge>;
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

  const handleDecision = (applicationId: string, decision: 'approve' | 'decline' | 'modify' | 'request-info') => {
    setApplications(prev => prev.map(app => 
      app.id === applicationId 
        ? { 
            ...app, 
            decisionStatus: decision === 'approve' ? 'approved' : 
                           decision === 'decline' ? 'declined' : 
                           decision === 'modify' ? 'modified' : app.decisionStatus,
            notes: decisionNotes,
            decisionHistory: [
              ...app.decisionHistory,
              {
                underwriter: 'Current User',
                date: new Date().toISOString().split('T')[0],
                action: decision === 'approve' ? 'Approved' : 
                       decision === 'decline' ? 'Declined' : 
                       decision === 'modify' ? 'Modified Terms' : 'Requested Info',
                comment: decisionNotes || `${decision} by current user`
              }
            ],
            ...(decision === 'modify' && {
              loanRecommendation: {
                ...app.loanRecommendation,
                approvalLimit: modifiedAmount || app.loanAmount,
                suggestedTenure: modifiedTenure || app.loanRecommendation.suggestedTenure
              }
            })
          }
        : app
    ));
    
    const actionText = {
      approve: 'approved',
      decline: 'declined',
      modify: 'modified',
      'request-info': 'marked for more information'
    }[decision];
    
    toast.success(`Application ${actionText} successfully`);
    setSelectedApplication(null);
    setDecisionNotes('');
    setModifiedAmount(0);
    setModifiedTenure(0);
  };

  // Calculate stats
  const awaitingDecision = applications.filter(app => app.decisionStatus === 'awaiting').length;
  const approved = applications.filter(app => app.decisionStatus === 'approved').length;
  const declined = applications.filter(app => app.decisionStatus === 'declined').length;
  const avgLoanValue = Math.round(applications.reduce((sum, app) => sum + app.loanAmount, 0) / applications.length);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">🔎 Underwriting Decisions</h1>
          <p className="text-sm text-gray-600">Make final decisions on reviewed applications. Verify risk metrics, assess repayment capacity, and approve or reject loans.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Decisions
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{awaitingDecision}</div>
                <div className="text-sm text-gray-600">Awaiting Decision</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{approved}</div>
                <div className="text-sm text-gray-600">Approved</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <XCircle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{declined}</div>
                <div className="text-sm text-gray-600">Declined</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">₦{avgLoanValue.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Avg Loan Value</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter & Search Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-1 gap-4 items-center">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name, app ID, phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={riskBandFilter} onValueChange={setRiskBandFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Risk Band" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Risk Bands</SelectItem>
                  <SelectItem value="low">Low Risk</SelectItem>
                  <SelectItem value="medium">Medium Risk</SelectItem>
                  <SelectItem value="high">High Risk</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={decisionStatusFilter} onValueChange={setDecisionStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Decision Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="awaiting">Awaiting</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="declined">Declined</SelectItem>
                  <SelectItem value="modified">Modified</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={underwriterFilter} onValueChange={setUnderwriterFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Underwriter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Underwriters</SelectItem>
                  <SelectItem value="Tolu Adebayo">Tolu Adebayo</SelectItem>
                  <SelectItem value="Mike Chen">Mike Chen</SelectItem>
                  <SelectItem value="Sarah Johnson">Sarah Johnson</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loan Decision Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Applicant</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Loan Amount</TableHead>
                <TableHead>Risk Score</TableHead>
                <TableHead>DTI</TableHead>
                <TableHead>KYC</TableHead>
                <TableHead>Collateral</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-20">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.map((application) => (
                <TableRow key={application.id}>
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
                      <span className="font-medium">{application.riskScore}</span>
                      {getRiskBandBadge(application.riskBand)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span className={`font-medium ${application.dti > 50 ? 'text-red-600' : application.dti > 35 ? 'text-yellow-600' : 'text-green-600'}`}>
                        {application.dti}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{getKycStatusBadge(application.kycStatus)}</TableCell>
                  <TableCell className="text-sm">{application.collateral}</TableCell>
                  <TableCell>{getDecisionStatusBadge(application.decisionStatus)}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            setSelectedApplication(application);
                            setDecisionNotes('');
                            setModifiedAmount(application.loanAmount);
                            setModifiedTenure(application.loanRecommendation.suggestedTenure);
                          }}
                        >
                          Decide
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Underwriting Decision - {application.applicantName}</DialogTitle>
                        </DialogHeader>
                        
                        {selectedApplication && (
                          <Tabs defaultValue="financial" className="w-full">
                            <TabsList className="grid w-full grid-cols-4">
                              <TabsTrigger value="financial">Financial Snapshot</TabsTrigger>
                              <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
                              <TabsTrigger value="decision">Make Decision</TabsTrigger>
                              <TabsTrigger value="history">Decision History</TabsTrigger>
                            </TabsList>
                            
                            <TabsContent value="financial" className="space-y-6">
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Financial Overview */}
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">Financial Overview</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <div className="text-sm text-gray-600">Monthly Income</div>
                                        <div className="text-xl font-bold text-green-600">₦{selectedApplication.personalInfo.monthlyIncome.toLocaleString()}</div>
                                      </div>
                                      <div>
                                        <div className="text-sm text-gray-600">Monthly Expenses</div>
                                        <div className="text-xl font-bold text-red-600">₦{selectedApplication.personalInfo.monthlyExpenses.toLocaleString()}</div>
                                      </div>
                                      <div>
                                        <div className="text-sm text-gray-600">Net Monthly Surplus</div>
                                        <div className="text-xl font-bold text-blue-600">₦{selectedApplication.personalInfo.netSurplus.toLocaleString()}</div>
                                      </div>
                                      <div>
                                        <div className="text-sm text-gray-600">Avg Bank Balance</div>
                                        <div className="text-xl font-bold text-purple-600">₦{selectedApplication.personalInfo.avgBankBalance.toLocaleString()}</div>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="text-sm text-gray-600 mb-2">Credit Inflow (Last 3 months)</div>
                                      <div className="text-2xl font-bold text-green-600">₦{selectedApplication.personalInfo.creditInflow.toLocaleString()}</div>
                                    </div>
                                  </CardContent>
                                </Card>

                                {/* Debt Information */}
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">Debt Information</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <div className="text-sm text-gray-600">Total Other Debts</div>
                                        <div className="text-xl font-bold text-orange-600">₦{selectedApplication.otherDebts.totalDebts.toLocaleString()}</div>
                                      </div>
                                      <div>
                                        <div className="text-sm text-gray-600">Monthly Debt Payments</div>
                                        <div className="text-xl font-bold text-red-600">₦{selectedApplication.otherDebts.monthlyDebtPayments.toLocaleString()}</div>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="text-sm text-gray-600 mb-2">Debt-to-Income Ratio</div>
                                      <div className="flex items-center space-x-3">
                                        <Progress 
                                          value={selectedApplication.dti} 
                                          className={`flex-1 ${selectedApplication.dti > 50 ? 'bg-red-100' : selectedApplication.dti > 35 ? 'bg-yellow-100' : 'bg-green-100'}`}
                                        />
                                        <span className={`font-bold ${selectedApplication.dti > 50 ? 'text-red-600' : selectedApplication.dti > 35 ? 'text-yellow-600' : 'text-green-600'}`}>
                                          {selectedApplication.dti}%
                                        </span>
                                      </div>
                                      <div className="text-xs text-gray-500 mt-1">
                                        {selectedApplication.dti <= 35 ? 'Good DTI ratio' : selectedApplication.dti <= 50 ? 'Moderate DTI ratio' : 'High DTI ratio - Risk alert'}
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>
                            </TabsContent>

                            <TabsContent value="risk" className="space-y-6">
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Risk Engine Output */}
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">Risk Assessment</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-4">
                                    <div className="text-center">
                                      <div className="text-4xl font-bold mb-2">{selectedApplication.riskScore}/100</div>
                                      <div className="text-sm text-gray-600 mb-3">Risk Score</div>
                                      {getRiskBandBadge(selectedApplication.riskBand)}
                                    </div>
                                    <div className="space-y-3">
                                      <div className="flex justify-between">
                                        <span className="text-sm">Lending Category:</span>
                                        <Badge variant={selectedApplication.riskScore >= 700 ? "default" : selectedApplication.riskScore >= 600 ? "secondary" : "destructive"}>
                                          {selectedApplication.riskScore >= 700 ? 'Safe' : selectedApplication.riskScore >= 600 ? 'Moderate' : 'Risky'}
                                        </Badge>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-sm">KYC Status:</span>
                                        {getKycStatusBadge(selectedApplication.kycStatus)}
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-sm">Collateral:</span>
                                        <span className="text-sm font-medium">{selectedApplication.collateral}</span>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>

                                {/* Loan Recommendation */}
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">AI Recommendation</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <div className="text-sm text-gray-600">Suggested Approval Limit</div>
                                        <div className="text-xl font-bold text-green-600">₦{selectedApplication.loanRecommendation.approvalLimit.toLocaleString()}</div>
                                      </div>
                                      <div>
                                        <div className="text-sm text-gray-600">Suggested Tenure</div>
                                        <div className="text-xl font-bold text-blue-600">{selectedApplication.loanRecommendation.suggestedTenure} months</div>
                                      </div>
                                      <div>
                                        <div className="text-sm text-gray-600">Interest Rate</div>
                                        <div className="text-xl font-bold text-purple-600">{selectedApplication.loanRecommendation.interestRate}%</div>
                                      </div>
                                      <div>
                                        <div className="text-sm text-gray-600">Guarantor Required</div>
                                        <div className="text-xl font-bold">
                                          {selectedApplication.loanRecommendation.requiresGuarantor ? '✅ Yes' : '❌ No'}
                                        </div>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>
                            </TabsContent>

                            <TabsContent value="decision" className="space-y-6">
                              <Card>
                                <CardHeader>
                                  <CardTitle className="text-lg">Decision Notes</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <Textarea
                                    placeholder="Add your decision notes and reasoning..."
                                    value={decisionNotes}
                                    onChange={(e) => setDecisionNotes(e.target.value)}
                                    rows={4}
                                  />
                                </CardContent>
                              </Card>

                              {/* Modify Terms (if applicable) */}
                              <Card>
                                <CardHeader>
                                  <CardTitle className="text-lg">Modify Terms (Optional)</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <label className="text-sm font-medium">Loan Amount</label>
                                      <Input
                                        type="number"
                                        value={modifiedAmount}
                                        onChange={(e) => setModifiedAmount(Number(e.target.value))}
                                        placeholder="Enter modified amount"
                                      />
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Tenure (months)</label>
                                      <Input
                                        type="number"
                                        value={modifiedTenure}
                                        onChange={(e) => setModifiedTenure(Number(e.target.value))}
                                        placeholder="Enter modified tenure"
                                      />
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>

                              {/* Decision Buttons */}
                              {selectedApplication.decisionStatus === 'awaiting' && (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button className="bg-green-600 hover:bg-green-700">
                                        <CheckCircle className="h-4 w-4 mr-2" />
                                        Approve
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>Approve Loan</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          Are you sure you want to approve this loan application for {selectedApplication.applicantName}?
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => handleDecision(selectedApplication.id, 'approve')}>
                                          Approve
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>

                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button variant="destructive">
                                        <XCircle className="h-4 w-4 mr-2" />
                                        Reject
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>Reject Loan</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          Are you sure you want to reject this loan application? This action cannot be undone.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => handleDecision(selectedApplication.id, 'decline')}>
                                          Reject
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>

                                  <Button 
                                    variant="outline" 
                                    className="border-purple-200 text-purple-700 hover:bg-purple-50"
                                    onClick={() => handleDecision(selectedApplication.id, 'modify')}
                                  >
                                    <Edit className="h-4 w-4 mr-2" />
                                    Modify Terms
                                  </Button>

                                  <Button 
                                    variant="outline"
                                    onClick={() => handleDecision(selectedApplication.id, 'request-info')}
                                  >
                                    <MessageSquare className="h-4 w-4 mr-2" />
                                    Request Info
                                  </Button>
                                </div>
                              )}
                            </TabsContent>

                            <TabsContent value="history" className="space-y-4">
                              <Card>
                                <CardHeader>
                                  <CardTitle className="text-lg">Decision History</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="space-y-4">
                                    {selectedApplication.decisionHistory.map((history, index) => (
                                      <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                                        <div className="flex-shrink-0">
                                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                            <User className="h-4 w-4 text-blue-600" />
                                          </div>
                                        </div>
                                        <div className="flex-1">
                                          <div className="flex items-center justify-between">
                                            <div className="font-medium">{history.underwriter}</div>
                                            <div className="text-sm text-gray-500">{formatDate(history.date)}</div>
                                          </div>
                                          <div className="text-sm text-blue-600 font-medium">{history.action}</div>
                                          <div className="text-sm text-gray-600 mt-1">{history.comment}</div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </CardContent>
                              </Card>
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
              <BarChart3 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium mb-2">No applications found</h3>
              <p className="text-sm">
                {searchTerm || riskBandFilter !== 'all' || decisionStatusFilter !== 'all' || underwriterFilter !== 'all'
                  ? 'Try adjusting your search or filter criteria.'
                  : 'No applications awaiting underwriting decisions at this time.'
                }
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}