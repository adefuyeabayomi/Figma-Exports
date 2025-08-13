import { useState } from "react";
import { Search, Plus, Download, Eye, Edit, RotateCcw, Receipt, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";

interface Payment {
  id: string;
  customerName: string;
  loanId: string;
  amountPaid: number;
  paymentChannel: string;
  collectionDate: string;
  recordedBy: string;
  status: 'success' | 'reversed' | 'pending';
  receiptNumber: string;
}

const mockPayments: Payment[] = [
  {
    id: "PAY001",
    customerName: "John Doe",
    loanId: "LN001",
    amountPaid: 50000,
    paymentChannel: "Bank Transfer",
    collectionDate: "2024-01-30",
    recordedBy: "System",
    status: "success",
    receiptNumber: "RCP001"
  },
  {
    id: "PAY002",
    customerName: "Jane Smith",
    loanId: "LN002",
    amountPaid: 75000,
    paymentChannel: "Mobile Money",
    collectionDate: "2024-01-29",
    recordedBy: "Sarah Wilson",
    status: "success",
    receiptNumber: "RCP002"
  },
  {
    id: "PAY003",
    customerName: "Mike Johnson",
    loanId: "LN003",
    amountPaid: 25000,
    paymentChannel: "Cash",
    collectionDate: "2024-01-28",
    recordedBy: "David Brown",
    status: "pending",
    receiptNumber: "RCP003"
  },
  {
    id: "PAY004",
    customerName: "Alice Brown",
    loanId: "LN004",
    amountPaid: 60000,
    paymentChannel: "POS",
    collectionDate: "2024-01-27",
    recordedBy: "System",
    status: "success",
    receiptNumber: "RCP004"
  },
  {
    id: "PAY005",
    customerName: "Robert Wilson",
    loanId: "LN005",
    amountPaid: 100000,
    paymentChannel: "Bank Transfer",
    collectionDate: "2024-01-26",
    recordedBy: "System",
    status: "reversed",
    receiptNumber: "RCP005"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'success': return 'bg-green-100 text-green-800';
    case 'pending': return 'bg-yellow-100 text-yellow-800';
    case 'reversed': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export function RepaymentsCollections() {
  const [searchTerm, setSearchTerm] = useState("");
  const [payments, setPayments] = useState(mockPayments);
  const [manualPaymentModal, setManualPaymentModal] = useState(false);
  const [reconcileModal, setReconcileModal] = useState(false);
  const [newPayment, setNewPayment] = useState({
    customerName: "",
    loanId: "",
    amount: "",
    channel: "",
    date: new Date().toISOString().split('T')[0]
  });

  const filteredPayments = payments.filter(payment =>
    payment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.loanId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalCollectedToday = payments
    .filter(p => p.collectionDate === new Date().toISOString().split('T')[0] && p.status === 'success')
    .reduce((sum, p) => sum + p.amountPaid, 0);

  const totalCollectedThisMonth = payments
    .filter(p => p.status === 'success')
    .reduce((sum, p) => sum + p.amountPaid, 0);

  const handleAddPayment = () => {
    if (!newPayment.customerName || !newPayment.loanId || !newPayment.amount) {
      alert("Please fill all required fields");
      return;
    }

    const payment: Payment = {
      id: `PAY${String(payments.length + 1).padStart(3, '0')}`,
      customerName: newPayment.customerName,
      loanId: newPayment.loanId,
      amountPaid: parseFloat(newPayment.amount),
      paymentChannel: newPayment.channel || "Cash",
      collectionDate: newPayment.date,
      recordedBy: "Erik Lamela",
      status: "success",
      receiptNumber: `RCP${String(payments.length + 1).padStart(3, '0')}`
    };

    setPayments(prev => [payment, ...prev]);
    setNewPayment({
      customerName: "",
      loanId: "",
      amount: "",
      channel: "",
      date: new Date().toISOString().split('T')[0]
    });
    setManualPaymentModal(false);
    alert("Payment recorded successfully!");
  };

  const handleReversePayment = (paymentId: string) => {
    if (confirm("Are you sure you want to reverse this payment?")) {
      setPayments(prev => prev.map(payment => 
        payment.id === paymentId 
          ? { ...payment, status: 'reversed' as const }
          : payment
      ));
    }
  };

  const handleDownloadReceipt = (payment: Payment) => {
    alert(`Downloading receipt ${payment.receiptNumber} for ₦${payment.amountPaid.toLocaleString()}`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Repayments & Collections</h1>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" onClick={() => setReconcileModal(true)} className="gap-2">
            <TrendingUp className="h-4 w-4" />
            Reconcile Payments
          </Button>
          <Button onClick={() => setManualPaymentModal(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Manual Payment
          </Button>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Collected Today</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">₦{totalCollectedToday.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Outstanding Due Today</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-yellow-600">₦245,000</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Collection Rate (Monthly)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">87.5%</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters Section */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                <SelectValue placeholder="Payment Channel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bank">Bank Transfer</SelectItem>
                <SelectItem value="mobile">Mobile Money</SelectItem>
                <SelectItem value="pos">POS</SelectItem>
                <SelectItem value="cash">Cash</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="reversed">Reversed</SelectItem>
              </SelectContent>
            </Select>
            <Input type="date" placeholder="Collection Date" />
          </div>
        </CardContent>
      </Card>

      {/* Payments Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer Name</TableHead>
                <TableHead>Loan ID</TableHead>
                <TableHead>Amount Paid</TableHead>
                <TableHead>Payment Channel</TableHead>
                <TableHead>Collection Date</TableHead>
                <TableHead>Recorded By</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.customerName}</TableCell>
                  <TableCell>{payment.loanId}</TableCell>
                  <TableCell>₦{payment.amountPaid.toLocaleString()}</TableCell>
                  <TableCell>{payment.paymentChannel}</TableCell>
                  <TableCell>{payment.collectionDate}</TableCell>
                  <TableCell>{payment.recordedBy}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(payment.status)}>
                      {payment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownloadReceipt(payment)}
                      >
                        <Receipt className="h-4 w-4" />
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      
                      {payment.status === 'success' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleReversePayment(payment.id)}
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

      {/* Manual Payment Modal */}
      <Dialog open={manualPaymentModal} onOpenChange={setManualPaymentModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Manual Payment</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="customerName">Customer Name</Label>
              <Input
                id="customerName"
                value={newPayment.customerName}
                onChange={(e) => setNewPayment(prev => ({ ...prev, customerName: e.target.value }))}
                placeholder="Enter customer name"
              />
            </div>
            <div>
              <Label htmlFor="loanId">Loan ID</Label>
              <Input
                id="loanId"
                value={newPayment.loanId}
                onChange={(e) => setNewPayment(prev => ({ ...prev, loanId: e.target.value }))}
                placeholder="Enter loan ID"
              />
            </div>
            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                value={newPayment.amount}
                onChange={(e) => setNewPayment(prev => ({ ...prev, amount: e.target.value }))}
                placeholder="Enter amount"
              />
            </div>
            <div>
              <Label htmlFor="channel">Payment Channel</Label>
              <Select value={newPayment.channel} onValueChange={(value) => 
                setNewPayment(prev => ({ ...prev, channel: value }))
              }>
                <SelectTrigger>
                  <SelectValue placeholder="Select channel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                  <SelectItem value="Mobile Money">Mobile Money</SelectItem>
                  <SelectItem value="POS">POS</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="date">Collection Date</Label>
              <Input
                id="date"
                type="date"
                value={newPayment.date}
                onChange={(e) => setNewPayment(prev => ({ ...prev, date: e.target.value }))}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setManualPaymentModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddPayment}>
                Add Payment
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Reconcile Modal */}
      <Dialog open={reconcileModal} onOpenChange={setReconcileModal}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Reconcile Payments</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Match unlinked bank transactions with customer payments
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Unlinked Transactions</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-white rounded border">
                  <span>₦50,000 - Reference: TXN123456</span>
                  <Button size="sm">Match</Button>
                </div>
                <div className="flex justify-between items-center p-2 bg-white rounded border">
                  <span>₦75,000 - Reference: TXN123457</span>
                  <Button size="sm">Match</Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}