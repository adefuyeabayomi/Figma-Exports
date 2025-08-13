import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  FileText, 
  Building2, 
  Phone, 
  CreditCard, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Download,
  Eye
} from 'lucide-react';

const kycSubmissions = [
  {
    id: 1,
    merchantName: 'Lagos Business Hub',
    submissionDate: '2024-01-20',
    status: 'pending',
    reviewerNotes: '',
  },
  {
    id: 2,
    merchantName: 'Kano Trading Corp',
    submissionDate: '2024-01-19',
    status: 'pending',
    reviewerNotes: '',
  },
  {
    id: 3,
    merchantName: 'Rivers Manufacturing',
    submissionDate: '2024-01-18',
    status: 'approved',
    reviewerNotes: 'All documents verified successfully',
  },
];

const mockKYCData = {
  businessDetails: {
    businessName: 'Lagos Business Hub',
    rcNumber: 'RC789012',
    businessType: 'Limited Liability Company',
    incorporationDate: '2020-03-15',
    businessAddress: '45 Broad Street, Lagos Island, Lagos State',
    sector: 'Technology Services',
  },
  contactInfo: {
    email: 'info@lagosbusinesshub.com',
    phone: '+234 802 345 6789',
    website: 'www.lagosbusinesshub.com',
    contactPerson: 'Adebayo Johnson',
    designation: 'Managing Director',
  },
  bankingInfo: {
    accountName: 'Lagos Business Hub Limited',
    accountNumber: '0123456789',
    bankName: 'First Bank Nigeria',
    bvn: '22123456789',
  },
  documents: [
    {
      name: 'Certificate of Incorporation',
      type: 'PDF',
      status: 'verified',
      uploadDate: '2024-01-20',
    },
    {
      name: 'Tax Identification Number',
      type: 'PDF',
      status: 'verified',
      uploadDate: '2024-01-20',
    },
    {
      name: 'CAC Form CO7',
      type: 'PDF',
      status: 'pending',
      uploadDate: '2024-01-20',
    },
    {
      name: 'Bank Statement',
      type: 'PDF',
      status: 'verified',
      uploadDate: '2024-01-20',
    },
  ],
};

export function KYCReview() {
  const [selectedSubmission, setSelectedSubmission] = useState<typeof kycSubmissions[0] | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredSubmissions = kycSubmissions.filter(submission => 
    statusFilter === 'all' || submission.status === statusFilter
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-700">Approved</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending Review</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (selectedSubmission) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => setSelectedSubmission(null)}>
              ← Back to KYC Inbox
            </Button>
            <div>
              <h1>KYC Review</h1>
              <p className="text-muted-foreground">{selectedSubmission.merchantName}</p>
            </div>
          </div>
          {getStatusBadge(selectedSubmission.status)}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Tabs defaultValue="business" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="business">Business Details</TabsTrigger>
                <TabsTrigger value="contact">Contact & Banking</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="review">Final Review</TabsTrigger>
              </TabsList>

              <TabsContent value="business" className="space-y-4">
                <Card className="p-6">
                  <h3 className="mb-4 flex items-center gap-2">
                    <Building2 size={20} />
                    Business Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-muted-foreground">Business Name</label>
                      <p>{mockKYCData.businessDetails.businessName}</p>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">RC Number</label>
                      <p>{mockKYCData.businessDetails.rcNumber}</p>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Business Type</label>
                      <p>{mockKYCData.businessDetails.businessType}</p>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Incorporation Date</label>
                      <p>{new Date(mockKYCData.businessDetails.incorporationDate).toLocaleDateString()}</p>
                    </div>
                    <div className="col-span-2">
                      <label className="text-sm text-muted-foreground">Business Address</label>
                      <p>{mockKYCData.businessDetails.businessAddress}</p>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Sector</label>
                      <p>{mockKYCData.businessDetails.sector}</p>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="contact" className="space-y-4">
                <Card className="p-6">
                  <h3 className="mb-4 flex items-center gap-2">
                    <Phone size={20} />
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-muted-foreground">Email</label>
                      <p>{mockKYCData.contactInfo.email}</p>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Phone</label>
                      <p>{mockKYCData.contactInfo.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Website</label>
                      <p>{mockKYCData.contactInfo.website}</p>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Contact Person</label>
                      <p>{mockKYCData.contactInfo.contactPerson}</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="mb-4 flex items-center gap-2">
                    <CreditCard size={20} />
                    Banking Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-muted-foreground">Account Name</label>
                      <p>{mockKYCData.bankingInfo.accountName}</p>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Account Number</label>
                      <p>{mockKYCData.bankingInfo.accountNumber}</p>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Bank Name</label>
                      <p>{mockKYCData.bankingInfo.bankName}</p>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">BVN</label>
                      <p>{mockKYCData.bankingInfo.bvn}</p>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="documents" className="space-y-4">
                <Card className="p-6">
                  <h3 className="mb-4 flex items-center gap-2">
                    <FileText size={20} />
                    Uploaded Documents
                  </h3>
                  <div className="space-y-3">
                    {mockKYCData.documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText size={16} className="text-muted-foreground" />
                          <div>
                            <p className="font-medium">{doc.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {doc.type} • Uploaded {new Date(doc.uploadDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={doc.status === 'verified' ? 'default' : 'secondary'}
                            className={doc.status === 'verified' ? 'bg-green-100 text-green-700' : ''}
                          >
                            {doc.status}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <Eye size={16} />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download size={16} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="review" className="space-y-4">
                <Card className="p-6">
                  <h3 className="mb-4">Review Summary</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <CheckCircle size={20} className="mx-auto mb-2 text-green-600" />
                        <p className="font-medium">Business Details</p>
                        <p className="text-green-600">Verified</p>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <CheckCircle size={20} className="mx-auto mb-2 text-green-600" />
                        <p className="font-medium">Contact Info</p>
                        <p className="text-green-600">Verified</p>
                      </div>
                      <div className="text-center p-3 bg-yellow-50 rounded-lg">
                        <AlertCircle size={20} className="mx-auto mb-2 text-yellow-600" />
                        <p className="font-medium">Documents</p>
                        <p className="text-yellow-600">1 Pending</p>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <CheckCircle size={20} className="mx-auto mb-2 text-green-600" />
                        <p className="font-medium">Banking</p>
                        <p className="text-green-600">Verified</p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Review Notes</label>
                      <Textarea
                        placeholder="Add your review comments here..."
                        value={reviewNotes}
                        onChange={(e) => setReviewNotes(e.target.value)}
                        rows={4}
                      />
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-4">
            <Card className="p-4">
              <h3 className="mb-4">Actions</h3>
              <div className="space-y-3">
                <Button className="w-full" variant="default">
                  <CheckCircle size={16} className="mr-2" />
                  Approve KYC
                </Button>
                <Button className="w-full" variant="destructive">
                  <XCircle size={16} className="mr-2" />
                  Reject KYC
                </Button>
                <Button className="w-full" variant="outline">
                  <AlertCircle size={16} className="mr-2" />
                  Request Update
                </Button>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="mb-4">Submission Info</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Submitted</span>
                  <span>{new Date(selectedSubmission.submissionDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <span>{selectedSubmission.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Documents</span>
                  <span>{mockKYCData.documents.length}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>KYC Review</h1>
          <p className="text-muted-foreground">Review and approve merchant KYC submissions</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant={statusFilter === 'all' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setStatusFilter('all')}
          >
            All
          </Button>
          <Button 
            variant={statusFilter === 'pending' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setStatusFilter('pending')}
          >
            Pending
          </Button>
          <Button 
            variant={statusFilter === 'approved' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setStatusFilter('approved')}
          >
            Approved
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredSubmissions.map((submission) => (
          <Card key={submission.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                  <Building2 size={20} className="text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-medium">{submission.merchantName}</h3>
                  <p className="text-sm text-muted-foreground">
                    Submitted {new Date(submission.submissionDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                {getStatusBadge(submission.status)}
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSelectedSubmission(submission)}
                >
                  <Eye size={16} className="mr-2" />
                  Review
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}