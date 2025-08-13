import { useState } from "react";
import { Download, TrendingUp, TrendingDown, DollarSign, Users, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts";

const disbursementData = [
  { month: 'Jan', amount: 2500000 },
  { month: 'Feb', amount: 3200000 },
  { month: 'Mar', amount: 2800000 },
  { month: 'Apr', amount: 3500000 },
  { month: 'May', amount: 4100000 },
  { month: 'Jun', amount: 3800000 },
];

const portfolioBreakdown = [
  { name: 'Active', value: 65, count: 850 },
  { name: 'Overdue', value: 25, count: 325 },
  { name: 'Defaulted', value: 10, count: 130 },
];

const performanceByOfficer = [
  { officer: 'Sarah Wilson', disbursed: 1200000, collected: 950000, rate: 79.2 },
  { officer: 'David Brown', disbursed: 980000, collected: 850000, rate: 86.7 },
  { officer: 'Erik Lamela', disbursed: 1500000, collected: 1320000, rate: 88.0 },
  { officer: 'Alice Johnson', disbursed: 750000, collected: 600000, rate: 80.0 },
];

const riskMetrics = [
  { category: 'PAR 30', current: 15.2, previous: 12.8, trend: 'up' },
  { category: 'PAR 60', current: 8.5, previous: 9.2, trend: 'down' },
  { category: 'PAR 90', current: 5.1, previous: 6.0, trend: 'down' },
  { category: 'NPL Ratio', current: 4.2, previous: 5.5, trend: 'down' },
];

const COLORS = ['#0088FE', '#FFBB28', '#FF8042'];

export function PortfolioPerformance() {
  const [timeRange, setTimeRange] = useState("monthly");
  const [productFilter, setProductFilter] = useState("all");

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Portfolio Performance</h1>
        <div className="flex items-center gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
          <Select value={productFilter} onValueChange={setProductFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Product Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Products</SelectItem>
              <SelectItem value="personal">Personal Loan</SelectItem>
              <SelectItem value="business">Business Loan</SelectItem>
              <SelectItem value="emergency">Emergency Loan</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Total Disbursed (YTD)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">₦19.9M</p>
            <p className="text-sm text-green-600 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +15.2% vs last year
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Total Outstanding
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-purple-600">₦12.3M</p>
            <p className="text-sm text-red-600 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +8.5% vs last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              NPL Ratio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">4.2%</p>
            <p className="text-sm text-green-600 flex items-center gap-1">
              <TrendingDown className="h-3 w-3" />
              -1.3% vs last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Users className="h-4 w-4" />
              Average Loan Size
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">₦485K</p>
            <p className="text-sm text-green-600 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +12.8% vs last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Repayment Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">87.5%</p>
            <p className="text-sm text-green-600 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +2.1% vs last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Disbursements Over Time */}
        <Card>
          <CardHeader>
            <CardTitle>Disbursements Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={disbursementData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `₦${(value / 1000000).toFixed(1)}M`} />
                <Tooltip formatter={(value) => [`₦${Number(value).toLocaleString()}`, 'Amount']} />
                <Line type="monotone" dataKey="amount" stroke="#0088FE" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Portfolio Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Status Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={portfolioBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {portfolioBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {portfolioBreakdown.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index] }}
                    />
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium">{item.count} loans</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance by Officer */}
      <Card>
        <CardHeader>
          <CardTitle>Performance by Loan Officer</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceByOfficer}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="officer" />
              <YAxis tickFormatter={(value) => `₦${(value / 1000000).toFixed(1)}M`} />
              <Tooltip formatter={(value) => [`₦${Number(value).toLocaleString()}`, '']} />
              <Legend />
              <Bar dataKey="disbursed" fill="#0088FE" name="Disbursed" />
              <Bar dataKey="collected" fill="#00C49F" name="Collected" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Risk Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Portfolio at Risk (PAR) Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {riskMetrics.map((metric) => (
              <div key={metric.category} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{metric.category}</h4>
                  <Badge variant={metric.trend === 'up' ? 'destructive' : 'default'}>
                    {metric.trend === 'up' ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {metric.trend}
                  </Badge>
                </div>
                <p className="text-2xl font-bold text-gray-900">{metric.current}%</p>
                <p className="text-sm text-gray-600">
                  Previous: {metric.previous}%
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Officer Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Loan Officer Collection Rates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Officer</th>
                  <th className="text-right p-2">Disbursed</th>
                  <th className="text-right p-2">Collected</th>
                  <th className="text-right p-2">Collection Rate</th>
                </tr>
              </thead>
              <tbody>
                {performanceByOfficer.map((officer) => (
                  <tr key={officer.officer} className="border-b">
                    <td className="p-2 font-medium">{officer.officer}</td>
                    <td className="p-2 text-right">₦{officer.disbursed.toLocaleString()}</td>
                    <td className="p-2 text-right">₦{officer.collected.toLocaleString()}</td>
                    <td className="p-2 text-right">
                      <Badge variant={officer.rate > 85 ? 'default' : 'secondary'}>
                        {officer.rate}%
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}