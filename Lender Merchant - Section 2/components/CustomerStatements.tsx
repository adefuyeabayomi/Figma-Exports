import { useState } from "react";
import { Search, FileText, Mail, MessageSquare, Download, Eye, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  loanId: string;
  principal: number;
  outstandingBalance: number;
  interestRate: number;
  nextDueDate: string;
  lastStatementDate: string;
}

interface Transaction {
  date: string;
  description: string;
  debit: number;
  credit: number;
  balance: number;
}

const mockCustomers: Customer[] = [
  {
    id: "CUST001",
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+234 901 234 5678",
    loanId: "LN001",
    principal: 500000,
    outstandingBalance: 350000,
    interestRate: 15.5,
    nextDueDate: "2024-02-15",
    lastStatementDate: "2024-01-15"
  },
  {
    id: "CUST002",
    name: "Jane Smith",
    email: "jane.smith@email.com",
    phone: "+234 902 345 6789",
    loanId: "LN002",
    principal: 1000000,
    outstandingBalance: 850000,
    interestRate: 18.0,
    nextDueDate: "2024-02-20",
    lastStatementDate: "2024-01-20"
  },
  {
    id: "CUST003",
    name: "Mike Johnson",
    email: "mike.johnson@email.com",
    phone: "+234 903 456 7890",
    loanId: "LN003",
    principal: 250000,
    outstandingBalance: 125000,
    interestRate: 20.0,
    nextDueDate: "2024-02-10",
    lastStatementDate: "2024-01-10"
  },
  {
    id: "CUST004",
    name: "Alice Brown",
    email: "alice.brown@email.com",
    phone: "+234 904 567 8901",
    loanId: "LN004",
    principal: 750000,
    outstandingBalance: 600000,
    interestRate: 16.0,
    nextDueDate: "2024-02-25",
    lastStatementDate: "2024-01-25"
  }
];

const sampleTransactions: Transaction[] = [
  {
    date: "2024-01-01",
    description: "Loan Disbursement",
    debit: 0,
    credit: 500000,
    balance: 500000
  },
  {
    date: "2024-01-15",
    description: "Monthly Payment",
    debit: 45000,
    credit: 0,
    balance: 455000
  },
  {
    date: "2024-01-15",
    description: "Interest Charge",
    debit: 0,
    credit: 6458,
    balance: 461458
  },
  {
    date: "2024-01-30",
    description: "Monthly Payment",
    debit: 45000,
    credit: 0,
    balance: 416458
  }
];

export function CustomerStatements() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [previewModal, setPreviewModal] = useState(false);
  const [sendModal, setSendModal] = useState(false);
  const [dateRange, setDateRange] = useState({
    from: new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    to: new Date().toISOString().split('T')[0]
  });
  const [deliveryMethod, setDeliveryMethod] = useState("email");
  const [recipientEmail, setRecipientEmail] = useState("");

  const filteredCustomers = mockCustomers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm) ||
    customer.loanId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleGenerateStatement = (customer: Customer) => {
    setSelectedCustomer(customer);
    setRecipientEmail(customer.email);
    setPreviewModal(true);
  };

  const handleSendStatement = () => {
    if (!recipientEmail.trim()) {
      alert("Please enter recipient email");
      return;
    }
    
    const method = deliveryMethod === "email" ? "Email" : "SMS";
    alert(`Statement sent to ${selectedCustomer?.name} via ${method} successfully!`);
    setSendModal(false);
    setPreviewModal(false);
  };

  const handleDownloadPDF = () => {
    alert(`Statement for ${selectedCustomer?.name} downloaded as PDF`);
  };

  const calculateMonthlyPayment = (principal: number, rate: number, months: number = 12) => {
    const monthlyRate = rate / 100 / 12;
    return (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Customer Statements</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Label htmlFor="fromDate" className="text-sm">From:</Label>
            <Input
              id="fromDate"
              type="date"
              value={dateRange.from}
              onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
              className="w-auto"
            />
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="toDate" className="text-sm">To:</Label>
            <Input
              id="toDate"
              type="date"
              value={dateRange.to}
              onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
              className="w-auto"
            />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name, email, phone, or loan ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Statement Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statements</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="annual">Annual</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Loan ID</TableHead>
                <TableHead>Outstanding Balance</TableHead>
                <TableHead>Next Due Date</TableHead>
                <TableHead>Last Statement</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>{customer.loanId}</TableCell>
                  <TableCell>₦{customer.outstandingBalance.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {customer.nextDueDate}
                    </Badge>
                  </TableCell>
                  <TableCell>{customer.lastStatementDate}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleGenerateStatement(customer)}
                      >
                        <FileText className="h-4 w-4 mr-1" />
                        Generate
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Statement Preview Modal */}
      <Dialog open={previewModal} onOpenChange={setPreviewModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Statement Preview - {selectedCustomer?.name}</DialogTitle>
          </DialogHeader>
          {selectedCustomer && (
            <div className="space-y-6">
              {/* Statement Header */}
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold text-blue-900">Loan Statement</h2>
                    <p className="text-blue-700">Statement Period: {dateRange.from} to {dateRange.to}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-blue-700">Generated on: {new Date().toLocaleDateString()}</p>
                    <p className="text-sm text-blue-700">Statement #: ST{selectedCustomer.id}</p>
                  </div>
                </div>
              </div>

              {/* Customer Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Customer Details</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Name:</span> {selectedCustomer.name}</p>
                    <p><span className="font-medium">Email:</span> {selectedCustomer.email}</p>
                    <p><span className="font-medium">Phone:</span> {selectedCustomer.phone}</p>
                    <p><span className="font-medium">Customer ID:</span> {selectedCustomer.id}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Loan Summary</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Loan ID:</span> {selectedCustomer.loanId}</p>
                    <p><span className="font-medium">Original Amount:</span> ₦{selectedCustomer.principal.toLocaleString()}</p>
                    <p><span className="font-medium">Interest Rate:</span> {selectedCustomer.interestRate}% per annum</p>
                    <p><span className="font-medium">Current Balance:</span> ₦{selectedCustomer.outstandingBalance.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Account Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-4 rounded">
                  <h4 className="font-medium text-gray-700">Outstanding Balance</h4>
                  <p className="text-2xl font-bold text-red-600">₦{selectedCustomer.outstandingBalance.toLocaleString()}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <h4 className="font-medium text-gray-700">Next Payment Due</h4>
                  <p className="text-2xl font-bold text-blue-600">{selectedCustomer.nextDueDate}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <h4 className="font-medium text-gray-700">Monthly Payment</h4>
                  <p className="text-2xl font-bold text-green-600">
                    ₦{calculateMonthlyPayment(selectedCustomer.principal, selectedCustomer.interestRate).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Transaction History */}
              <div>
                <h3 className="font-semibold mb-3">Transaction History</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Debit</TableHead>
                      <TableHead>Credit</TableHead>
                      <TableHead>Balance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sampleTransactions.map((transaction, index) => (
                      <TableRow key={index}>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>{transaction.description}</TableCell>
                        <TableCell>{transaction.debit ? `₦${transaction.debit.toLocaleString()}` : '-'}</TableCell>
                        <TableCell>{transaction.credit ? `₦${transaction.credit.toLocaleString()}` : '-'}</TableCell>
                        <TableCell>₦{transaction.balance.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Late Fees (if any) */}
              <div className="bg-yellow-50 p-4 rounded">
                <h4 className="font-medium text-yellow-800">Late Fees & Penalties</h4>
                <p className="text-sm text-yellow-700 mt-1">No late fees or penalties for this period.</p>
              </div>

              {/* Footer with signature */}
              <div className="text-center text-sm text-gray-600 border-t pt-4">
                <p>This statement was generated by Lender Admin System</p>
                <p>For inquiries, contact us at support@lender.com or +234 800 123 4567</p>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline" onClick={handleDownloadPDF}>
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
                <Button onClick={() => setSendModal(true)}>
                  <Mail className="h-4 w-4 mr-2" />
                  Send Statement
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Send Statement Modal */}
      <Dialog open={sendModal} onOpenChange={setSendModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Send Statement - {selectedCustomer?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="deliveryMethod">Delivery Method</Label>
              <Select value={deliveryMethod} onValueChange={setDeliveryMethod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {deliveryMethod === "email" ? (
              <div>
                <Label htmlFor="recipientEmail">Recipient Email</Label>
                <Input
                  id="recipientEmail"
                  type="email"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  placeholder="Enter email address"
                />
              </div>
            ) : (
              <div>
                <Label htmlFor="recipientPhone">Recipient Phone</Label>
                <Input
                  id="recipientPhone"
                  value={selectedCustomer?.phone || ""}
                  readOnly
                  className="bg-gray-50"
                />
              </div>
            )}

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setSendModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleSendStatement}>
                <Mail className="h-4 w-4 mr-2" />
                Send Statement
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}