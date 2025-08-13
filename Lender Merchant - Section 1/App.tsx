import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Progress } from "./components/ui/progress";
import { Button } from "./components/ui/button";
import { Alert, AlertDescription } from "./components/ui/alert";
import { Sidebar } from "./components/Sidebar";
import { CreateProduct } from "./components/CreateProduct";
import { ManageProducts } from "./components/ManageProducts";
import { KYCReviewQueue } from "./components/KYCReviewQueue";
import { BorrowerDirectory } from "./components/BorrowerDirectory";
import { NewApplications } from "./components/NewApplications";
import { UnderwritingDecisions } from "./components/UnderwritingDecisions";
import { RepaymentDefaultChart } from "./components/RepaymentDefaultChart";
import { MonthlyDisbursementChart } from "./components/MonthlyDisbursementChart";
import {
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Users,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  XCircle,
  FileText,
  DollarSign,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

// Mock data for charts
const lendingActivityData = [
  { day: "Jul 19", loans: 12, amount: 850000 },
  { day: "Jul 20", loans: 8, amount: 620000 },
  { day: "Jul 21", loans: 15, amount: 1200000 },
  { day: "Jul 22", loans: 18, amount: 1400000 },
  { day: "Jul 23", loans: 22, amount: 1650000 },
  { day: "Jul 24", loans: 16, amount: 1100000 },
  { day: "Jul 25", loans: 14, amount: 980000 },
];

const portfolioRiskData = [
  {
    name: "Current",
    value: 87.8,
    amount: 5600000,
    color: "#22c55e",
  },
  {
    name: "Late (1-29)",
    value: 5.6,
    amount: 360000,
    color: "#f59e0b",
  },
  {
    name: "PAR 30+",
    value: 6.6,
    amount: 420000,
    color: "#ef4444",
  },
];

type Page =
  | "dashboard"
  | "create-product"
  | "manage-products"
  | "kyc-review"
  | "borrower-directory"
  | "new-applications"
  | "underwriting-decisions";

function App() {
  const [currentPage, setCurrentPage] =
    useState<Page>("dashboard");

  const handleNavigation = (page: Page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="hidden md:block w-64 lg:w-72 flex-shrink-0">
        <Sidebar
          className="h-full"
          currentPage={currentPage}
          onNavigate={handleNavigation}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          {currentPage === "dashboard" && <DashboardContent />}
          {currentPage === "create-product" && (
            <CreateProduct
              onBack={() => setCurrentPage("manage-products")}
            />
          )}
          {currentPage === "manage-products" && (
            <ManageProducts
              onCreateProduct={() =>
                setCurrentPage("create-product")
              }
            />
          )}
          {currentPage === "kyc-review" && <KYCReviewQueue />}
          {currentPage === "borrower-directory" && (
            <BorrowerDirectory />
          )}
          {currentPage === "new-applications" && (
            <NewApplications />
          )}
          {currentPage === "underwriting-decisions" && (
            <UnderwritingDecisions />
          )}
        </div>
      </div>
    </div>
  );
}

function DashboardContent() {
  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Dashboard Overview
        </h1>
        <p className="text-gray-600">
          Monitor your loan portfolio performance and key
          metrics
        </p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Loans Disbursed */}
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Disbursed
            </CardTitle>
            <DollarSign className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              ₦18,520,000
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <Badge variant="secondary" className="text-xs">
                420 loans
              </Badge>
              <div className="flex items-center text-green-600 text-sm">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +12% MoM
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Loans */}
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Active Loans
            </CardTitle>
            <FileText className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              112
            </div>
            <div className="text-sm text-gray-600 mt-1">
              ₦6.34M currently outstanding
            </div>
            <Progress value={67} className="mt-3" />
            <div className="text-xs text-gray-500 mt-1">
              67% of total portfolio
            </div>
          </CardContent>
        </Card>

        {/* Loan Repayment Rate */}
        <Card className="hover:shadow-lg transition-shadow duration-200 lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Repayment & Default Rate Trends
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-6 mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    84.2%
                  </div>
                  <div className="text-sm text-gray-600">
                    Current Repayment Rate
                  </div>
                  <div className="flex items-center text-green-600 text-sm">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +4.3% vs last month
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    7.6%
                  </div>
                  <div className="text-sm text-gray-600">
                    Current Default Rate
                  </div>
                  <div className="flex items-center text-red-600 text-sm">
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                    +1.2% vs last month
                  </div>
                </div>
              </div>
            </div>
            <RepaymentDefaultChart />
          </CardContent>
        </Card>

        {/* Portfolio at Risk */}
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Portfolio at Risk
            </CardTitle>
            <TrendingDown className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              ₦420,000
            </div>
            <div className="text-sm text-gray-600 mt-1">
              6.6% of total portfolio
            </div>
            <div className="mt-3 h-16">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={portfolioRiskData}>
                  <Bar
                    dataKey="value"
                    fill="#8884d8"
                    radius={2}
                  >
                    {portfolioRiskData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* New Borrowers */}
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              New Borrowers
            </CardTitle>
            <Users className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              87
            </div>
            <div className="text-sm text-gray-600 mt-1">
              This month
            </div>
            <div className="flex items-center text-green-600 text-sm mt-2">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +22 this week
            </div>
          </CardContent>
        </Card>

        {/* Avg Loan Approval Time */}
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Avg. Approval Time
            </CardTitle>
            <Clock className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              2.3 hrs
            </div>
            <div className="text-sm text-gray-600 mt-1">
              based on 120 applications
            </div>
            <Badge
              variant="outline"
              className="mt-2 text-xs text-green-600 border-green-600"
            >
              Under Target
            </Badge>
          </CardContent>
        </Card>

        {/* Disbursement Success Rate */}
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Disbursement Success
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              98.5%
            </div>
            <Progress value={98.5} className="mt-3" />
            <div className="text-sm text-gray-600 mt-2">
              3 failed disbursements this month
            </div>
          </CardContent>
        </Card>

        {/* Revenue from Interest/Fees */}
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Earned Revenue
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              ₦2.14M
            </div>
            <div className="text-sm text-gray-600 mt-1">
              +₦210K from fees
            </div>
            <div className="mt-3 h-8">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lendingActivityData.slice(-7)}>
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#22c55e"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Monthly Disbursement Chart */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">
              Monthly Disbursements (2024)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <MonthlyDisbursementChart />
          </CardContent>
        </Card>

        {/* Lending Activity Chart */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">
              Lending Activity (Last 7 Days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lendingActivityData}>
                  <XAxis dataKey="day" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Line
                    type="monotone"
                    dataKey="loans"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ fill: "#3b82f6", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mt-6">
        {/* Pending KYC Approvals */}
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">
              Pending KYC Approvals
            </CardTitle>
            <Badge
              variant="outline"
              className="text-orange-600 border-orange-600"
            >
              24 Pending
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div>
                  <div className="font-medium">Joy Okafor</div>
                  <div className="text-sm text-gray-600">
                    Jul 23
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className="text-orange-600 border-orange-600"
                >
                  Pending
                </Badge>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div>
                  <div className="font-medium">Kunle A.</div>
                  <div className="text-sm text-gray-600">
                    Jul 23
                  </div>
                </div>
                <Badge variant="destructive">Docs Error</Badge>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div>
                  <div className="font-medium">
                    Amina Hassan
                  </div>
                  <div className="text-sm text-gray-600">
                    Jul 22
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className="text-orange-600 border-orange-600"
                >
                  Pending
                </Badge>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              Review Queue →
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* System Alerts */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg">
            System Alerts & To-Do
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Alert>
              <XCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>3 failed disbursements</strong> need
                review - Check payment gateway issues
              </AlertDescription>
            </Alert>
            <Alert>
              <Clock className="h-4 w-4" />
              <AlertDescription>
                <strong>4 KYCs pending</strong> &gt;48 hrs -
                Review required to prevent delays
              </AlertDescription>
            </Alert>
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>1 credit rule conflict</strong> detected
                - Manual review needed for loan #4821
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default App;