import { useState } from "react";
import { Search, Filter, Download, ChevronDown, Eye, Send, RotateCcw } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Separator } from "./ui/separator";

interface Loan {
  id: string;
  borrowerName: string;
  loanProduct: string;
  amount: number;
  approvalDate: string;
  scheduledDisbursement?: string;
  status: 'pending' | 'processing' | 'success' | 'failed';
  channel: string;
}

const mockLoans: Loan[] = [
  {
    id: "LN001",
    borrowerName: "John Doe",
    loanProduct: "Personal Loan",
    amount: 50000,
    approvalDate: "2024-01-15",
    scheduledDisbursement: "2024-01-20",
    status: "pending",
    channel: "Bank Transfer"
  },
  {
    id: "LN002",
    borrowerName: "Jane Smith",
    loanProduct: "Business Loan",
    amount: 150000,
    approvalDate: "2024-01-14",
    status: "processing",
    channel: "Mobile Money"
  },
  {
    id: "LN003",
    borrowerName: "Mike Johnson",
    loanProduct: "Emergency Loan",
    amount: 25000,
    approvalDate: "2024-01-13",
    status: "failed",
    channel: "Bank Transfer"
  },
  {
    id: "LN004",
    borrowerName: "Sarah Wilson",
    loanProduct: "Personal Loan",
    amount: 75000,
    approvalDate: "2024-01-12",
    status: "success",
    channel: "Wallet Credit"
  },
  {
    id: "LN005",
    borrowerName: "David Brown",
    loanProduct: "Business Loan",
    amount: 200000,
    approvalDate: "2024-01-11",
    scheduledDisbursement: "2024-01-22",
    status: "pending",
    channel: "Bank Transfer"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending': return 'bg-yellow-100 text-yellow-800';
    case 'processing': return 'bg-blue-100 text-blue-800';
    case 'success': return 'bg-green-100 text-green-800';
    case 'failed': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export function DisburseApprovedLoans() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLoans, setSelectedLoans] = useState<Set<string>>(new Set());
  const [loans, setLoans] = useState(mockLoans);
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);

  const filteredLoans = loans.filter(loan =>
    loan.borrowerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loan.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectLoan = (loanId: string) => {
    setSelectedLoans(prev => {
      const newSet = new Set(prev);
      if (newSet.has(loanId)) {
        newSet.delete(loanId);
      } else {
        newSet.add(loanId);
      }
      return newSet;
    });
  };

  const handleDisburse = (loanId: string) => {
    setLoans(prev => prev.map(loan => 
      loan.id === loanId 
        ? { ...loan, status: 'processing' as const }
        : loan
    ));
    
    // Simulate processing completion
    setTimeout(() => {
      setLoans(prev => prev.map(loan => 
        loan.id === loanId 
          ? { ...loan, status: 'success' as const }
          : loan
      ));
    }, 2000);
  };

  const handleRetry = (loanId: string) => {
    setLoans(prev => prev.map(loan => 
      loan.id === loanId 
        ? { ...loan, status: 'processing' as const }
        : loan
    ));
    
    setTimeout(() => {
      setLoans(prev => prev.map(loan => 
        loan.id === loanId 
          ? { ...loan, status: 'success' as const }
          : loan
      ));
    }, 1500);
  };

  const handleBulkDisburse = () => {
    const selectedLoanIds = Array.from(selectedLoans);
    setLoans(prev => prev.map(loan => 
      selectedLoanIds.includes(loan.id) && loan.status === 'pending'
        ? { ...loan, status: 'processing' as const }
        : loan
    ));
    
    setTimeout(() => {
      setLoans(prev => prev.map(loan => 
        selectedLoanIds.includes(loan.id)
          ? { ...loan, status: 'success' as const }
          : loan
      ));
      setSelectedLoans(new Set());
    }, 2000);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Disburse Approved Loans</h1>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export to CSV
          </Button>
          <Button 
            onClick={handleBulkDisburse}
            disabled={selectedLoans.size === 0}
            className="gap-2"
          >
            <Send className="h-4 w-4" />
            Bulk Disburse ({selectedLoans.size})
          </Button>
        </div>
      </div>

      {/* Filters Section */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by borrower name, email, or loan ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Loan Product" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="personal">Personal Loan</SelectItem>
                <SelectItem value="business">Business Loan</SelectItem>
                <SelectItem value="emergency">Emergency Loan</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Disbursement Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Channel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bank">Bank Transfer</SelectItem>
                <SelectItem value="mobile">Mobile Money</SelectItem>
                <SelectItem value="wallet">Wallet Credit</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Loans Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedLoans(new Set(filteredLoans.map(loan => loan.id)));
                      } else {
                        setSelectedLoans(new Set());
                      }
                    }}
                    checked={selectedLoans.size === filteredLoans.length && filteredLoans.length > 0}
                  />
                </TableHead>
                <TableHead>Loan ID</TableHead>
                <TableHead>Borrower Name</TableHead>
                <TableHead>Loan Product</TableHead>
                <TableHead>Amount to Disburse</TableHead>
                <TableHead>Approval Date</TableHead>
                <TableHead>Scheduled Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Channel</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLoans.map((loan) => (
                <TableRow key={loan.id}>
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedLoans.has(loan.id)}
                      onChange={() => handleSelectLoan(loan.id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{loan.id}</TableCell>
                  <TableCell>{loan.borrowerName}</TableCell>
                  <TableCell>{loan.loanProduct}</TableCell>
                  <TableCell>₦{loan.amount.toLocaleString()}</TableCell>
                  <TableCell>{loan.approvalDate}</TableCell>
                  <TableCell>{loan.scheduledDisbursement || "-"}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(loan.status)}>
                      {loan.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{loan.channel}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedLoan(loan)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>Loan Details - {selectedLoan?.id}</DialogTitle>
                          </DialogHeader>
                          {selectedLoan && (
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-medium">Borrower Information</h4>
                                <p className="text-sm text-gray-600">{selectedLoan.borrowerName}</p>
                              </div>
                              <Separator />
                              <div>
                                <h4 className="font-medium">Loan Terms</h4>
                                <p className="text-sm text-gray-600">
                                  {selectedLoan.loanProduct} - ₦{selectedLoan.amount.toLocaleString()}
                                </p>
                              </div>
                              <Separator />
                              <div>
                                <h4 className="font-medium">Disbursement Details</h4>
                                <p className="text-sm text-gray-600">
                                  Channel: {selectedLoan.channel}
                                </p>
                                <p className="text-sm text-gray-600">
                                  Status: {selectedLoan.status}
                                </p>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      
                      {loan.status === 'pending' && (
                        <Button
                          size="sm"
                          onClick={() => handleDisburse(loan.id)}
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      )}
                      
                      {loan.status === 'failed' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRetry(loan.id)}
                        >
                          <RotateCcw className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}