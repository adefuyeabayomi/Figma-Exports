import { useState } from "react";
import { Search, Phone, MessageSquare, Eye, Calendar, AlertTriangle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";

interface OverdueLoan {
  id: string;
  customerName: string;
  loanId: string;
  principal: number;
  outstandingBalance: number;
  daysOverdue: number;
  lastPaymentDate: string;
  status: 'overdue' | 'defaulted';
  contacted: boolean;
  escalationLevel: string;
  assignedOfficer: string;
  customerPhone: string;
}

const mockOverdueLoans: OverdueLoan[] = [
  {
    id: "OVD001",
    customerName: "John Doe",
    loanId: "LN001",
    principal: 500000,
    outstandingBalance: 350000,
    daysOverdue: 15,
    lastPaymentDate: "2024-01-15",
    status: "overdue",
    contacted: true,
    escalationLevel: "Level 1",
    assignedOfficer: "Sarah Wilson",
    customerPhone: "+234 901 234 5678"
  },
  {
    id: "OVD002",
    customerName: "Jane Smith",
    loanId: "LN002",
    principal: 1000000,
    outstandingBalance: 850000,
    daysOverdue: 45,
    lastPaymentDate: "2024-01-01",
    status: "defaulted",
    contacted: false,
    escalationLevel: "Level 2",
    assignedOfficer: "David Brown",
    customerPhone: "+234 902 345 6789"
  },
  {
    id: "OVD003",
    customerName: "Mike Johnson",
    loanId: "LN003",
    principal: 250000,
    outstandingBalance: 200000,
    daysOverdue: 7,
    lastPaymentDate: "2024-01-23",
    status: "overdue",
    contacted: true,
    escalationLevel: "Level 1",
    assignedOfficer: "Sarah Wilson",
    customerPhone: "+234 903 456 7890"
  },
  {
    id: "OVD004",
    customerName: "Alice Brown",
    loanId: "LN004",
    principal: 750000,
    outstandingBalance: 650000,
    daysOverdue: 95,
    lastPaymentDate: "2023-12-15",
    status: "defaulted",
    contacted: true,
    escalationLevel: "Ready for Legal",
    assignedOfficer: "Erik Lamela",
    customerPhone: "+234 904 567 8901"
  },
  {
    id: "OVD005",
    customerName: "Robert Wilson",
    loanId: "LN005",
    principal: 2000000,
    outstandingBalance: 1800000,
    daysOverdue: 30,
    lastPaymentDate: "2024-01-01",
    status: "overdue",
    contacted: false,
    escalationLevel: "Level 2",
    assignedOfficer: "David Brown",
    customerPhone: "+234 905 678 9012"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'overdue': return 'bg-yellow-100 text-yellow-800';
    case 'defaulted': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getEscalationColor = (level: string) => {
  switch (level) {
    case 'Level 1': return 'bg-yellow-100 text-yellow-800';
    case 'Level 2': return 'bg-orange-100 text-orange-800';
    case 'Ready for Legal': return 'bg-red-100 text-red-800';
    case 'In Court': return 'bg-purple-100 text-purple-800';
    case 'Promised to Pay': return 'bg-blue-100 text-blue-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export function DefaultedOverdueLoans() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loans, setLoans] = useState(mockOverdueLoans);
  const [contactModal, setContactModal] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState<OverdueLoan | null>(null);
  const [contactLog, setContactLog] = useState("");
  const [contactType, setContactType] = useState("");

  const filteredLoans = loans.filter(loan =>
    loan.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loan.loanId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCall = (loan: OverdueLoan) => {
    alert(`Calling ${loan.customerName} at ${loan.customerPhone}`);
    setSelectedLoan(loan);
    setContactType("Call");
    setContactModal(true);
  };

  const handleMessage = (loan: OverdueLoan) => {
    alert(`Sending message to ${loan.customerName} at ${loan.customerPhone}`);
    setSelectedLoan(loan);
    setContactType("SMS");
    setContactModal(true);
  };

  const handleLogContact = () => {
    if (!contactLog.trim()) {
      alert("Please enter contact details");
      return;
    }

    setLoans(prev => prev.map(loan => 
      loan.id === selectedLoan?.id 
        ? { ...loan, contacted: true }
        : loan
    ));

    alert(`${contactType} attempt logged successfully`);
    setContactModal(false);
    setContactLog("");
    setSelectedLoan(null);
  };

  const handleEscalate = (loanId: string, newLevel: string) => {
    setLoans(prev => prev.map(loan => 
      loan.id === loanId 
        ? { ...loan, escalationLevel: newLevel }
        : loan
    ));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Defaulted / Overdue Loans</h1>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            Export for Recovery Agents
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-yellow-600">{loans.filter(l => l.status === 'overdue').length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Defaulted</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">{loans.filter(l => l.status === 'defaulted').length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Amount at Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">
              ₦{loans.reduce((sum, l) => sum + l.outstandingBalance, 0).toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Ready for Legal</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-purple-600">
              {loans.filter(l => l.escalationLevel === 'Ready for Legal').length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters Section */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search customer, loan ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Days Overdue" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">7+ Days</SelectItem>
                <SelectItem value="30">30+ Days</SelectItem>
                <SelectItem value="90">90+ Days</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Loan Officer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sarah">Sarah Wilson</SelectItem>
                <SelectItem value="david">David Brown</SelectItem>
                <SelectItem value="erik">Erik Lamela</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="overdue">Overdue</SelectItem>
                <SelectItem value="defaulted">Defaulted</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Contacted" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
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
                <TableHead>Customer Name</TableHead>
                <TableHead>Loan ID</TableHead>
                <TableHead>Principal</TableHead>
                <TableHead>Outstanding Balance</TableHead>
                <TableHead>Days Overdue</TableHead>
                <TableHead>Last Payment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Contacted?</TableHead>
                <TableHead>Escalation</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLoans.map((loan) => (
                <TableRow key={loan.id}>
                  <TableCell className="font-medium">{loan.customerName}</TableCell>
                  <TableCell>{loan.loanId}</TableCell>
                  <TableCell>₦{loan.principal.toLocaleString()}</TableCell>
                  <TableCell>₦{loan.outstandingBalance.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={loan.daysOverdue > 30 ? "destructive" : "secondary"}>
                      {loan.daysOverdue} days
                    </Badge>
                  </TableCell>
                  <TableCell>{loan.lastPaymentDate}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(loan.status)}>
                      {loan.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={loan.contacted ? "default" : "destructive"}>
                      {loan.contacted ? "Yes" : "No"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Select value={loan.escalationLevel} onValueChange={(value) => handleEscalate(loan.id, value)}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Level 1">Level 1</SelectItem>
                        <SelectItem value="Level 2">Level 2</SelectItem>
                        <SelectItem value="Ready for Legal">Ready for Legal</SelectItem>
                        <SelectItem value="In Court">In Court</SelectItem>
                        <SelectItem value="Promised to Pay">Promised to Pay</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCall(loan)}
                      >
                        <Phone className="h-4 w-4" />
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleMessage(loan)}
                      >
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      
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
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Customer Profile - {selectedLoan?.customerName}</DialogTitle>
                          </DialogHeader>
                          {selectedLoan && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-medium">Contact Information</h4>
                                  <p className="text-sm text-gray-600">Phone: {selectedLoan.customerPhone}</p>
                                  <p className="text-sm text-gray-600">Officer: {selectedLoan.assignedOfficer}</p>
                                </div>
                                <div>
                                  <h4 className="font-medium">Loan Status</h4>
                                  <p className="text-sm text-gray-600">Days Overdue: {selectedLoan.daysOverdue}</p>
                                  <p className="text-sm text-gray-600">Outstanding: ₦{selectedLoan.outstandingBalance.toLocaleString()}</p>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-medium">Contact History</h4>
                                <div className="bg-gray-50 p-3 rounded">
                                  <p className="text-sm text-gray-600">No recent contact logs</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Contact Logging Modal */}
      <Dialog open={contactModal} onOpenChange={setContactModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Log {contactType} Attempt - {selectedLoan?.customerName}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="contactLog">Contact Details</Label>
              <Textarea
                id="contactLog"
                value={contactLog}
                onChange={(e) => setContactLog(e.target.value)}
                placeholder="Enter details of the contact attempt..."
                rows={4}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setContactModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleLogContact}>
                Log Contact
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}