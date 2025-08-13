import { useState } from "react";
import { Search, Filter, Download, Eye, MessageSquare, AlertTriangle, User, Phone } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Separator } from "./ui/separator";
import { Textarea } from "./ui/textarea";

interface ActiveLoan {
  id: string;
  customerName: string;
  customerId: string;
  principal: number;
  outstanding: number;
  disbursedOn: string;
  dueDate: string;
  status: 'active' | 'at-risk' | 'current';
  assignedOfficer: string;
  loanProduct: string;
  interestRate: number;
  paymentFrequency: string;
}

const mockActiveLoans: ActiveLoan[] = [
  {
    id: "LN001",
    customerName: "John Doe",
    customerId: "CUST001",
    principal: 500000,
    outstanding: 350000,
    disbursedOn: "2024-01-15",
    dueDate: "2024-07-15",
    status: "current",
    assignedOfficer: "Sarah Wilson",
    loanProduct: "Personal Loan",
    interestRate: 15.5,
    paymentFrequency: "Monthly"
  },
  {
    id: "LN002",
    customerName: "Jane Smith",
    customerId: "CUST002",
    principal: 1000000,
    outstanding: 850000,
    disbursedOn: "2024-02-01",
    dueDate: "2024-08-01",
    status: "at-risk",
    assignedOfficer: "David Brown",
    loanProduct: "Business Loan",
    interestRate: 18.0,
    paymentFrequency: "Monthly"
  },
  {
    id: "LN003",
    customerName: "Mike Johnson",
    customerId: "CUST003",
    principal: 250000,
    outstanding: 125000,
    disbursedOn: "2024-03-10",
    dueDate: "2024-09-10",
    status: "current",
    assignedOfficer: "Sarah Wilson",
    loanProduct: "Emergency Loan",
    interestRate: 20.0,
    paymentFrequency: "Weekly"
  },
  {
    id: "LN004",
    customerName: "Alice Brown",
    customerId: "CUST004",
    principal: 750000,
    outstanding: 600000,
    disbursedOn: "2024-01-20",
    dueDate: "2024-07-20",
    status: "active",
    assignedOfficer: "Erik Lamela",
    loanProduct: "Personal Loan",
    interestRate: 16.0,
    paymentFrequency: "Monthly"
  },
  {
    id: "LN005",
    customerName: "Robert Wilson",
    customerId: "CUST005",
    principal: 2000000,
    outstanding: 1750000,
    disbursedOn: "2024-02-15",
    dueDate: "2024-08-15",
    status: "at-risk",
    assignedOfficer: "David Brown",
    loanProduct: "Business Loan",
    interestRate: 17.5,
    paymentFrequency: "Monthly"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'current': return 'bg-green-100 text-green-800';
    case 'active': return 'bg-blue-100 text-blue-800';
    case 'at-risk': return 'bg-yellow-100 text-yellow-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export function ActiveLoans() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLoans, setSelectedLoans] = useState<Set<string>>(new Set());
  const [loans, setLoans] = useState(mockActiveLoans);
  const [selectedLoan, setSelectedLoan] = useState<ActiveLoan | null>(null);
  const [reminderModal, setReminderModal] = useState(false);
  const [reminderMessage, setReminderMessage] = useState("");

  const filteredLoans = loans.filter(loan =>
    loan.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loan.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loan.customerId.toLowerCase().includes(searchTerm.toLowerCase())
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

  const handleMarkAtRisk = (loanId: string) => {
    if (confirm("Are you sure you want to mark this loan as at risk?")) {
      setLoans(prev => prev.map(loan => 
        loan.id === loanId 
          ? { ...loan, status: 'at-risk' as const }
          : loan
      ));
    }
  };

  const handleSendReminder = (loan: ActiveLoan) => {
    setSelectedLoan(loan);
    setReminderMessage(`Dear ${loan.customerName}, this is a reminder that your loan payment of ₦${(loan.outstanding * 0.1).toLocaleString()} is due soon. Please ensure timely payment to avoid any penalties.`);
    setReminderModal(true);
  };

  const handleBulkReminder = () => {
    if (selectedLoans.size === 0) return;
    alert(`Reminder sent to ${selectedLoans.size} customers`);
    setSelectedLoans(new Set());
  };

  const handleBulkAssignOfficer = () => {
    if (selectedLoans.size === 0) return;
    const officer = prompt("Enter officer name to assign:");
    if (officer) {
      setLoans(prev => prev.map(loan => 
        selectedLoans.has(loan.id) 
          ? { ...loan, assignedOfficer: officer }
          : loan
      ));
      setSelectedLoans(new Set());
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Active Loans</h1>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button 
            onClick={handleBulkReminder}
            disabled={selectedLoans.size === 0}
            variant="outline"
            className="gap-2"
          >
            <MessageSquare className="h-4 w-4" />
            Send Reminders ({selectedLoans.size})
          </Button>
          <Button 
            onClick={handleBulkAssignOfficer}
            disabled={selectedLoans.size === 0}
            className="gap-2"
          >
            <User className="h-4 w-4" />
            Assign Officer ({selectedLoans.size})
          </Button>
        </div>
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
                <SelectValue placeholder="Product Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="personal">Personal Loan</SelectItem>
                <SelectItem value="business">Business Loan</SelectItem>
                <SelectItem value="emergency">Emergency Loan</SelectItem>
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
                <SelectItem value="current">Current</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="at-risk">At Risk</SelectItem>
              </SelectContent>
            </Select>
            <Input type="date" placeholder="Due Date" />
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
                <TableHead>Customer Name</TableHead>
                <TableHead>Loan ID</TableHead>
                <TableHead>Principal Amount</TableHead>
                <TableHead>Outstanding Balance</TableHead>
                <TableHead>Disbursed On</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assigned Officer</TableHead>
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
                  <TableCell>
                    <Button variant="link" className="p-0 h-auto font-medium text-blue-600">
                      {loan.customerName}
                    </Button>
                  </TableCell>
                  <TableCell className="font-medium">{loan.id}</TableCell>
                  <TableCell>₦{loan.principal.toLocaleString()}</TableCell>
                  <TableCell>₦{loan.outstanding.toLocaleString()}</TableCell>
                  <TableCell>{loan.disbursedOn}</TableCell>
                  <TableCell>{loan.dueDate}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(loan.status)}>
                      {loan.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{loan.assignedOfficer}</TableCell>
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
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Loan Details - {selectedLoan?.id}</DialogTitle>
                          </DialogHeader>
                          {selectedLoan && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-medium">Customer Information</h4>
                                  <p className="text-sm text-gray-600">{selectedLoan.customerName}</p>
                                  <p className="text-sm text-gray-600">ID: {selectedLoan.customerId}</p>
                                </div>
                                <div>
                                  <h4 className="font-medium">Loan Officer</h4>
                                  <p className="text-sm text-gray-600">{selectedLoan.assignedOfficer}</p>
                                </div>
                              </div>
                              <Separator />
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-medium">Loan Terms</h4>
                                  <p className="text-sm text-gray-600">Product: {selectedLoan.loanProduct}</p>
                                  <p className="text-sm text-gray-600">Principal: ₦{selectedLoan.principal.toLocaleString()}</p>
                                  <p className="text-sm text-gray-600">Outstanding: ₦{selectedLoan.outstanding.toLocaleString()}</p>
                                </div>
                                <div>
                                  <h4 className="font-medium">Payment Details</h4>
                                  <p className="text-sm text-gray-600">Interest Rate: {selectedLoan.interestRate}%</p>
                                  <p className="text-sm text-gray-600">Frequency: {selectedLoan.paymentFrequency}</p>
                                  <p className="text-sm text-gray-600">Due Date: {selectedLoan.dueDate}</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleSendReminder(loan)}
                      >
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      
                      {loan.status !== 'at-risk' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleMarkAtRisk(loan.id)}
                        >
                          <AlertTriangle className="h-4 w-4" />
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

      {/* Reminder Modal */}
      <Dialog open={reminderModal} onOpenChange={setReminderModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Send Reminder - {selectedLoan?.customerName}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Message Preview</label>
              <Textarea
                value={reminderMessage}
                onChange={(e) => setReminderMessage(e.target.value)}
                rows={4}
                className="mt-1"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setReminderModal(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                alert("Reminder sent successfully!");
                setReminderModal(false);
              }}>
                Send Reminder
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}