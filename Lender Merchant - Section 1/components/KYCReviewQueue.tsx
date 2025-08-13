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
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { toast } from 'sonner@2.0.3';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Calendar,
  FileText,
  Download,
  User,
  Phone,
  Mail,
  MapPin,
  Shield,
  AlertTriangle,
  Clock
} from 'lucide-react';

interface KYCSubmission {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  customerId: string;
  idType: string;
  submissionDate: string;
  status: 'pending' | 'approved' | 'rejected';
  kycLevel: 'basic' | 'tier1' | 'tier2';
  documents: {
    type: string;
    url: string;
    status: 'verified' | 'pending' | 'rejected';
  }[];
  personalInfo: {
    fullName: string;
    dateOfBirth: string;
    address: string;
    bvn?: string;
    nin?: string;
  };
  validationResults: {
    bvnVerified: boolean;
    ninVerified: boolean;
    addressVerified: boolean;
  };
  reviewNotes?: string;
  reviewedBy?: string;
  reviewedAt?: string;
}

// Mock data for KYC submissions
const mockKYCSubmissions: KYCSubmission[] = [
  {
    id: '1',
    customerName: 'John Doe',
    phone: '08012345678',
    email: 'john@mail.com',
    customerId: 'CU001',
    idType: 'NIN',
    submissionDate: '2024-07-24',
    status: 'pending',
    kycLevel: 'tier1',
    documents: [
      { type: 'NIN Card', url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400', status: 'verified' },
      { type: 'Utility Bill', url: 'https://images.unsplash.com/photo-1554224154-26032fced90b?w=400', status: 'pending' }
    ],
    personalInfo: {
      fullName: 'John Chukwuma Doe',
      dateOfBirth: '1990-05-15',
      address: '123 Victoria Island, Lagos',
      nin: '12345****'
    },
    validationResults: {
      bvnVerified: true,
      ninVerified: true,
      addressVerified: false
    }
  },
  {
    id: '2',
    customerName: 'Joy Okafor',
    phone: '08023456789',
    email: 'joy@mail.com',
    customerId: 'CU002',
    idType: 'BVN',
    submissionDate: '2024-07-23',
    status: 'pending',
    kycLevel: 'basic',
    documents: [
      { type: 'Bank Statement', url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400', status: 'verified' }
    ],
    personalInfo: {
      fullName: 'Joy Chioma Okafor',
      dateOfBirth: '1988-11-22',
      address: '456 Ikeja, Lagos',
      bvn: '22233****'
    },
    validationResults: {
      bvnVerified: true,
      ninVerified: false,
      addressVerified: true
    }
  },
  {
    id: '3',
    customerName: 'Kunle A.',
    phone: '08034567890',
    email: 'kunle@mail.com',
    customerId: 'CU003',
    idType: 'Driver\'s License',
    submissionDate: '2024-07-23',
    status: 'rejected',
    kycLevel: 'tier2',
    documents: [
      { type: 'Driver\'s License', url: 'https://images.unsplash.com/photo-1554224154-22dec7ec8818?w=400', status: 'rejected' },
      { type: 'Passport Photo', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', status: 'verified' }
    ],
    personalInfo: {
      fullName: 'Kunle Adebayo',
      dateOfBirth: '1992-03-10',
      address: '789 Abuja',
      nin: '33344****'
    },
    validationResults: {
      bvnVerified: false,
      ninVerified: true,
      addressVerified: false
    },
    reviewNotes: 'Driver\'s license image is blurry and unreadable',
    reviewedBy: 'Admin User',
    reviewedAt: '2024-07-23T10:30:00Z'
  },
  {
    id: '4',
    customerName: 'Amina Hassan',
    phone: '08045678901',
    email: 'amina@mail.com',
    customerId: 'CU004',
    idType: 'Voter\'s Card',
    submissionDate: '2024-07-22',
    status: 'approved',
    kycLevel: 'tier1',
    documents: [
      { type: 'Voter\'s Card', url: 'https://images.unsplash.com/photo-1554224154-1696413565d3?w=400', status: 'verified' },
      { type: 'Utility Bill', url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400', status: 'verified' }
    ],
    personalInfo: {
      fullName: 'Amina Hassan Mohammed',
      dateOfBirth: '1995-08-30',
      address: '321 Kano State',
      nin: '55566****'
    },
    validationResults: {
      bvnVerified: true,
      ninVerified: true,
      addressVerified: true
    },
    reviewNotes: 'All documents verified successfully',
    reviewedBy: 'Admin User',
    reviewedAt: '2024-07-22T14:45:00Z'
  }
];

export function KYCReviewQueue() {
  const [submissions, setSubmissions] = useState<KYCSubmission[]>(mockKYCSubmissions);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [kycLevelFilter, setKycLevelFilter] = useState<string>('all');
  const [selectedSubmission, setSelectedSubmission] = useState<KYCSubmission | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // Filter submissions
  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch = 
      submission.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.phone.includes(searchTerm) ||
      submission.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.customerId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || submission.status === statusFilter;
    const matchesKycLevel = kycLevelFilter === 'all' || submission.kycLevel === kycLevelFilter;
    
    return matchesSearch && matchesStatus && matchesKycLevel;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">🟡 Pending</Badge>;
      case 'approved':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">✅ Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">❌ Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getKycLevelBadge = (level: string) => {
    const colors = {
      basic: 'bg-blue-100 text-blue-800',
      tier1: 'bg-purple-100 text-purple-800',
      tier2: 'bg-orange-100 text-orange-800'
    };
    return (
      <Badge className={`${colors[level as keyof typeof colors]} hover:${colors[level as keyof typeof colors]}`}>
        {level.toUpperCase()}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleReview = (submissionId: string, action: 'approve' | 'reject') => {
    setSubmissions(prev => prev.map(submission => 
      submission.id === submissionId 
        ? { 
            ...submission, 
            status: action === 'approve' ? 'approved' : 'rejected',
            reviewNotes,
            reviewedBy: 'Current User',
            reviewedAt: new Date().toISOString()
          }
        : submission
    ));
    
    toast.success(`KYC ${action === 'approve' ? 'approved' : 'rejected'} successfully`);
    setSelectedSubmission(null);
    setReviewNotes('');
  };

  const handleBulkAction = (action: 'approve' | 'reject') => {
    setSubmissions(prev => prev.map(submission => 
      selectedItems.includes(submission.id)
        ? { 
            ...submission, 
            status: action === 'approve' ? 'approved' : 'rejected',
            reviewedBy: 'Current User',
            reviewedAt: new Date().toISOString()
          }
        : submission
    ));
    
    toast.success(`${selectedItems.length} submissions ${action === 'approve' ? 'approved' : 'rejected'}`);
    setSelectedItems([]);
  };

  const toggleSelection = (submissionId: string) => {
    setSelectedItems(prev => 
      prev.includes(submissionId)
        ? prev.filter(id => id !== submissionId)
        : [...prev, submissionId]
    );
  };

  const selectAll = () => {
    const pendingIds = filteredSubmissions
      .filter(s => s.status === 'pending')
      .map(s => s.id);
    setSelectedItems(selectedItems.length === pendingIds.length ? [] : pendingIds);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">KYC Review Queue</h1>
          <p className="text-sm text-gray-600">Review and approve customer identity documents</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Queue
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {submissions.filter(s => s.status === 'pending').length}
            </div>
            <div className="text-sm text-gray-600">Pending Review</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {submissions.filter(s => s.status === 'approved').length}
            </div>
            <div className="text-sm text-gray-600">Approved Today</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">
              {submissions.filter(s => s.status === 'rejected').length}
            </div>
            <div className="text-sm text-gray-600">Rejected</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              {Math.round((submissions.filter(s => s.status === 'approved').length / submissions.length) * 100)}%
            </div>
            <div className="text-sm text-gray-600">Approval Rate</div>
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
                  placeholder="Search by name, phone, email, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={kycLevelFilter} onValueChange={setKycLevelFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="KYC Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="tier1">Tier 1</SelectItem>
                  <SelectItem value="tier2">Tier 2</SelectItem>
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
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Bulk Approve
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Bulk Approve</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to approve {selectedItems.length} KYC submission(s)?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleBulkAction('approve')}>
                        Approve All
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="sm" variant="destructive">
                      <XCircle className="h-4 w-4 mr-2" />
                      Bulk Reject
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Bulk Reject</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to reject {selectedItems.length} KYC submission(s)?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleBulkAction('reject')}>
                        Reject All
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* KYC Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">
                  <Checkbox
                    checked={selectedItems.length === filteredSubmissions.filter(s => s.status === 'pending').length}
                    onCheckedChange={selectAll}
                  />
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>ID Type</TableHead>
                <TableHead>KYC Level</TableHead>
                <TableHead>Submission Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-20">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubmissions.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedItems.includes(submission.id)}
                      onCheckedChange={() => toggleSelection(submission.id)}
                      disabled={submission.status !== 'pending'}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${submission.customerName}`} />
                        <AvatarFallback>{submission.customerName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{submission.customerName}</div>
                        <div className="text-sm text-gray-600">ID: {submission.customerId}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="text-sm">{submission.phone}</div>
                      <div className="text-xs text-gray-600">{submission.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{submission.idType}</TableCell>
                  <TableCell>{getKycLevelBadge(submission.kycLevel)}</TableCell>
                  <TableCell>{formatDate(submission.submissionDate)}</TableCell>
                  <TableCell>{getStatusBadge(submission.status)}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            setSelectedSubmission(submission);
                            setReviewNotes(submission.reviewNotes || '');
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>KYC Review - {submission.customerName}</DialogTitle>
                        </DialogHeader>
                        
                        {selectedSubmission && (
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Personal Information */}
                            <div className="space-y-4">
                              <div>
                                <h3 className="font-semibold mb-3">Personal Information</h3>
                                <div className="space-y-2 text-sm">
                                  <div className="flex items-center space-x-2">
                                    <User className="h-4 w-4 text-gray-400" />
                                    <span>{selectedSubmission.personalInfo.fullName}</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Calendar className="h-4 w-4 text-gray-400" />
                                    <span>{selectedSubmission.personalInfo.dateOfBirth}</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <MapPin className="h-4 w-4 text-gray-400" />
                                    <span>{selectedSubmission.personalInfo.address}</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Phone className="h-4 w-4 text-gray-400" />
                                    <span>{selectedSubmission.phone}</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Mail className="h-4 w-4 text-gray-400" />
                                    <span>{selectedSubmission.email}</span>
                                  </div>
                                  {selectedSubmission.personalInfo.bvn && (
                                    <div className="flex items-center space-x-2">
                                      <Shield className="h-4 w-4 text-gray-400" />
                                      <span>BVN: {selectedSubmission.personalInfo.bvn}</span>
                                    </div>
                                  )}
                                  {selectedSubmission.personalInfo.nin && (
                                    <div className="flex items-center space-x-2">
                                      <Shield className="h-4 w-4 text-gray-400" />
                                      <span>NIN: {selectedSubmission.personalInfo.nin}</span>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Validation Results */}
                              <div>
                                <h3 className="font-semibold mb-3">Validation Results</h3>
                                <div className="space-y-2">
                                  <div className="flex items-center space-x-2">
                                    {selectedSubmission.validationResults.bvnVerified ? (
                                      <CheckCircle className="h-4 w-4 text-green-600" />
                                    ) : (
                                      <XCircle className="h-4 w-4 text-red-600" />
                                    )}
                                    <span className="text-sm">BVN Verified</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    {selectedSubmission.validationResults.ninVerified ? (
                                      <CheckCircle className="h-4 w-4 text-green-600" />
                                    ) : (
                                      <XCircle className="h-4 w-4 text-red-600" />
                                    )}
                                    <span className="text-sm">NIN Verified</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    {selectedSubmission.validationResults.addressVerified ? (
                                      <CheckCircle className="h-4 w-4 text-green-600" />
                                    ) : (
                                      <XCircle className="h-4 w-4 text-red-600" />
                                    )}
                                    <span className="text-sm">Address Verified</span>
                                  </div>
                                </div>
                              </div>

                              {/* Review Notes */}
                              <div>
                                <h3 className="font-semibold mb-3">Review Notes</h3>
                                <Textarea
                                  placeholder="Add your review comments..."
                                  value={reviewNotes}
                                  onChange={(e) => setReviewNotes(e.target.value)}
                                  rows={4}
                                />
                              </div>

                              {/* Action Buttons */}
                              {selectedSubmission.status === 'pending' && (
                                <div className="flex space-x-3">
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button className="flex-1 bg-green-600 hover:bg-green-700">
                                        <CheckCircle className="h-4 w-4 mr-2" />
                                        Approve
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>Approve KYC</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          Are you sure you want to approve this KYC submission for {selectedSubmission.customerName}?
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => handleReview(selectedSubmission.id, 'approve')}>
                                          Approve
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>

                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button variant="destructive" className="flex-1">
                                        <XCircle className="h-4 w-4 mr-2" />
                                        Reject
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>Reject KYC</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          Are you sure you want to reject this KYC submission for {selectedSubmission.customerName}?
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => handleReview(selectedSubmission.id, 'reject')}>
                                          Reject
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </div>
                              )}

                              {/* Review History */}
                              {selectedSubmission.reviewedBy && (
                                <div className="pt-4 border-t">
                                  <h3 className="font-semibold mb-2">Review History</h3>
                                  <div className="text-sm text-gray-600">
                                    <div>Reviewed by: {selectedSubmission.reviewedBy}</div>
                                    <div>Date: {selectedSubmission.reviewedAt ? formatDate(selectedSubmission.reviewedAt) : ''}</div>
                                    {selectedSubmission.reviewNotes && (
                                      <div className="mt-2">
                                        <span className="font-medium">Notes:</span>
                                        <p className="mt-1">{selectedSubmission.reviewNotes}</p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Documents Preview */}
                            <div>
                              <h3 className="font-semibold mb-3">Submitted Documents</h3>
                              <div className="space-y-4">
                                {selectedSubmission.documents.map((doc, index) => (
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
                            </div>
                          </div>
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

      {filteredSubmissions.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium mb-2">No KYC submissions found</h3>
              <p className="text-sm">
                {searchTerm || statusFilter !== 'all' || kycLevelFilter !== 'all'
                  ? 'Try adjusting your search or filter criteria.'
                  : 'No KYC submissions to review at this time.'
                }
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}