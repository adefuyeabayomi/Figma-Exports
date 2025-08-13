import { useState } from "react";
import { Download, DollarSign, TrendingUp, FileText, Lock, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const incomeData = [
  { month: 'Jan', interest: 180000, fees: 25000, penalties: 8000 },
  { month: 'Feb', interest: 220000, fees: 32000, penalties: 12000 },
  { month: 'Mar', interest: 195000, fees: 28000, penalties: 6000 },
  { month: 'Apr', interest: 250000, fees: 35000, penalties: 15000 },
  { month: 'May', interest: 280000, fees: 42000, penalties: 18000 },
  { month: 'Jun', interest: 265000, fees: 38000, penalties: 10000 },
];

const cashFlowData = [
  { month: 'Jan', disbursements: 2500000, repayments: 1800000, writeOffs: 50000 },
  { month: 'Feb', disbursements: 3200000, repayments: 2100000, writeOffs: 75000 },
  { month: 'Mar', disbursements: 2800000, repayments: 2300000, writeOffs: 40000 },
  { month: 'Apr', disbursements: 3500000, repayments: 2600000, writeOffs: 60000 },
  { month: 'May', disbursements: 4100000, repayments: 2900000, writeOffs: 80000 },
  { month: 'Jun', disbursements: 3800000, repayments: 3200000, writeOffs: 45000 },
];

const auditTrail = [
  {
    date: "2024-01-30 14:25",
    user: "Erik Lamela",
    action: "Generated Q1 Financial Report",
    details: "Report exported to PDF",
    status: "Completed"
  },
  {
    date: "2024-01-29 10:15",
    user: "Sarah Wilson",
    action: "Updated Interest Accrual Settings",
    details: "Changed from daily to monthly accrual",
    status: "Approved"
  },
  {
    date: "2024-01-28 16:30",
    user: "David Brown",
    action: "Reconciled Bank Statement",
    details: "January statement reconciliation",
    status: "Completed"
  },
  {
    date: "2024-01-27 09:45",
    user: "Alice Johnson",
    action: "Locked December Reports",
    details: "Monthly financial reports locked for review",
    status: "Locked"
  }
];

export function FinancialReports() {
  const [selectedPeriod, setSelectedPeriod] = useState("current-month");
  const [reportType, setReportType] = useState("income-statement");
  const [isLocked, setIsLocked] = useState(false);

  const totalInterestEarned = incomeData.reduce((sum, item) => sum + item.interest, 0);
  const totalFeesCollected = incomeData.reduce((sum, item) => sum + item.fees, 0);
  const totalPenalties = incomeData.reduce((sum, item) => sum + item.penalties, 0);
  const totalIncome = totalInterestEarned + totalFeesCollected + totalPenalties;

  const totalDisbursements = cashFlowData.reduce((sum, item) => sum + item.disbursements, 0);
  const totalRepayments = cashFlowData.reduce((sum, item) => sum + item.repayments, 0);
  const totalWriteOffs = cashFlowData.reduce((sum, item) => sum + item.writeOffs, 0);
  const netCashFlow = totalRepayments - totalDisbursements;

  const handleExportQuickBooks = () => {
    alert("QuickBooks-compatible CSV exported successfully!");
  };

  const handleLockReports = () => {
    if (confirm("Are you sure you want to lock these reports? This action cannot be undone.")) {
      setIsLocked(true);
      alert("Reports have been locked for the selected period.");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Financial Reports</h1>
        <div className="flex items-center gap-4">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current-month">Current Month</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={handleExportQuickBooks} className="gap-2">
            <Download className="h-4 w-4" />
            Export QuickBooks CSV
          </Button>
          <Button variant="outline" onClick={handleLockReports} disabled={isLocked} className="gap-2">
            <Lock className="h-4 w-4" />
            {isLocked ? "Reports Locked" : "Lock Reports"}
          </Button>
          <Button className="gap-2">
            <FileText className="h-4 w-4" />
            Generate PDF Report
          </Button>
        </div>
      </div>

      {/* Access Control Notice */}
      {!isLocked && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-orange-100 p-2">
                <Lock className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <h3 className="font-medium text-orange-900">Finance Team Access</h3>
                <p className="text-sm text-orange-700">
                  Only finance team members and admins can view and modify financial reports.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Total Income (YTD)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">₦{totalIncome.toLocaleString()}</p>
            <p className="text-sm text-gray-600">Interest + Fees + Penalties</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Net Cash Flow</CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-2xl font-bold ${netCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ₦{netCashFlow.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">Repayments - Disbursements</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Outstanding Portfolio Value</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">₦12,350,000</p>
            <p className="text-sm text-gray-600">Principal + Accrued Interest</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Write-offs (YTD)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">₦{totalWriteOffs.toLocaleString()}</p>
            <p className="text-sm text-gray-600">2.1% of disbursements</p>
          </CardContent>
        </Card>
      </div>

      {/* Income Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Loan Income Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={incomeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `₦${(value / 1000).toFixed(0)}K`} />
                  <Tooltip formatter={(value) => [`₦${Number(value).toLocaleString()}`, '']} />
                  <Bar dataKey="interest" fill="#0088FE" name="Interest" />
                  <Bar dataKey="fees" fill="#00C49F" name="Fees" />
                  <Bar dataKey="penalties" fill="#FFBB28" name="Penalties" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Interest Earned</span>
                  <span className="font-bold text-blue-600">₦{totalInterestEarned.toLocaleString()}</span>
                </div>
                <p className="text-xs text-gray-600 mt-1">78.5% of total income</p>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Fees Collected</span>
                  <span className="font-bold text-green-600">₦{totalFeesCollected.toLocaleString()}</span>
                </div>
                <p className="text-xs text-gray-600 mt-1">17.8% of total income</p>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Penalties</span>
                  <span className="font-bold text-yellow-600">₦{totalPenalties.toLocaleString()}</span>
                </div>
                <p className="text-xs text-gray-600 mt-1">3.7% of total income</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cash Flow Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Cash Flow from Loans</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={cashFlowData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `₦${(value / 1000000).toFixed(1)}M`} />
              <Tooltip formatter={(value) => [`₦${Number(value).toLocaleString()}`, '']} />
              <Line type="monotone" dataKey="disbursements" stroke="#FF8042" strokeWidth={2} name="Disbursements" />
              <Line type="monotone" dataKey="repayments" stroke="#00C49F" strokeWidth={2} name="Repayments" />
              <Line type="monotone" dataKey="writeOffs" stroke="#FF0000" strokeWidth={2} name="Write-offs" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Accrual vs Actual Income */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Income Recognition</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="font-medium">Accrued Interest (Current Month)</span>
              <span className="font-bold text-blue-600">₦485,000</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="font-medium">Actual Interest Collected</span>
              <span className="font-bold text-green-600">₦365,000</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center p-3 bg-yellow-50 rounded">
              <span className="font-medium">Uncollected Accrued Interest</span>
              <span className="font-bold text-yellow-600">₦120,000</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Portfolio Valuation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="font-medium">Current Principal Outstanding</span>
              <span className="font-bold text-blue-600">₦11,250,000</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="font-medium">Accrued Interest</span>
              <span className="font-bold text-green-600">₦1,100,000</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
              <span className="font-medium">Total Portfolio Value</span>
              <span className="font-bold text-blue-600">₦12,350,000</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Audit Trail */}
      <Card>
        <CardHeader>
          <CardTitle>Audit Trail</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date & Time</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditTrail.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell className="font-mono text-sm">{entry.date}</TableCell>
                  <TableCell>{entry.user}</TableCell>
                  <TableCell>{entry.action}</TableCell>
                  <TableCell className="text-gray-600">{entry.details}</TableCell>
                  <TableCell>
                    <Badge variant={
                      entry.status === 'Completed' ? 'default' :
                      entry.status === 'Locked' ? 'destructive' :
                      'secondary'
                    }>
                      {entry.status}
                    </Badge>
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