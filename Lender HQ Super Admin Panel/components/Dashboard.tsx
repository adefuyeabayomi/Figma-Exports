import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  TrendingUp, 
  Users, 
  CreditCard, 
  AlertCircle,
  Eye,
  Bell,
  FileText,
  CheckCircle,
  Clock,
  XCircle,
  Headphones
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const metricsData = [
  {
    title: 'Total Active Merchants',
    value: '1,247',
    change: '+12%',
    changeType: 'positive' as const,
    icon: Users,
  },
  {
    title: 'Platform-Wide Loans Issued',
    value: '₦847.2M',
    change: '+8.3%',
    changeType: 'positive' as const,
    icon: CreditCard,
  },
  {
    title: 'NPL Ratio',
    value: '2.4%',
    change: '-0.8%',
    changeType: 'positive' as const,
    icon: TrendingUp,
  },
  {
    title: 'Platform Earnings',
    value: '₦42.8M',
    change: '+15.2%',
    changeType: 'positive' as const,
    icon: AlertCircle,
  },
];

const loanChartData = [
  { month: 'Jan', loans: 65 },
  { month: 'Feb', loans: 78 },
  { month: 'Mar', loans: 82 },
  { month: 'Apr', loans: 95 },
  { month: 'May', loans: 108 },
  { month: 'Jun', loans: 125 },
];

const uptimeData = [
  { service: 'API Gateway', uptime: 99.9 },
  { service: 'Loan Processing', uptime: 99.7 },
  { service: 'KYC Service', uptime: 99.8 },
  { service: 'Notifications', uptime: 99.5 },
];

const recentActivity = [
  {
    type: 'kyc',
    message: 'KYC approved for TechCorp Nigeria Ltd',
    time: '2 minutes ago',
    status: 'success',
  },
  {
    type: 'support',
    message: 'Support ticket escalated from Merchant #1247',
    time: '15 minutes ago',
    status: 'warning',
  },
  {
    type: 'system',
    message: 'API rate limit exceeded for Merchant #892',
    time: '32 minutes ago',
    status: 'error',
  },
  {
    type: 'kyc',
    message: 'New KYC submission from Lagos Business Hub',
    time: '1 hour ago',
    status: 'info',
  },
];

export function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Platform Overview</h1>
          <p className="text-muted-foreground">Monitor your platform's performance and activity</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Eye size={16} className="mr-2" />
            View Pending KYCs
          </Button>
          <Button variant="outline" size="sm">
            <Bell size={16} className="mr-2" />
            Alert Center
          </Button>
          <Button size="sm">
            <FileText size={16} className="mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricsData.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{metric.title}</p>
                  <p className="text-2xl font-semibold">{metric.value}</p>
                  <span className={`text-xs ${
                    metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.change} from last month
                  </span>
                </div>
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                  <Icon size={20} className="text-muted-foreground" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <h3>Loans Disbursed</h3>
              <p className="text-sm text-muted-foreground">Monthly loan disbursement trend</p>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={loanChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" stroke="var(--muted-foreground)" />
                  <YAxis stroke="var(--muted-foreground)" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--card)', 
                      border: '1px solid var(--border)',
                      borderRadius: '8px'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="loans" 
                    stroke="var(--primary)" 
                    strokeWidth={2}
                    dot={{ fill: 'var(--primary)', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <h3>API Uptime</h3>
              <p className="text-sm text-muted-foreground">Service availability last 30 days</p>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={uptimeData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis type="number" domain={[99, 100]} stroke="var(--muted-foreground)" />
                  <YAxis type="category" dataKey="service" stroke="var(--muted-foreground)" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--card)', 
                      border: '1px solid var(--border)',
                      borderRadius: '8px'
                    }} 
                  />
                  <Bar dataKey="uptime" fill="var(--primary)" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <h3>Recent Activity</h3>
            <p className="text-sm text-muted-foreground">Latest platform events and notifications</p>
          </div>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => {
              const getIcon = (type: string) => {
                switch (type) {
                  case 'kyc': return CheckCircle;
                  case 'support': return Headphones;
                  case 'system': return AlertCircle;
                  default: return Clock;
                }
              };
              
              const Icon = getIcon(activity.type);
              
              return (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg border border-border">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activity.status === 'success' ? 'bg-green-100 text-green-600' :
                    activity.status === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                    activity.status === 'error' ? 'bg-red-100 text-red-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    <Icon size={14} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                  <Badge 
                    variant={
                      activity.status === 'success' ? 'default' :
                      activity.status === 'warning' ? 'secondary' :
                      activity.status === 'error' ? 'destructive' :
                      'outline'
                    }
                  >
                    {activity.status}
                  </Badge>
                </div>
              );
            })}
          </div>
        </div>
      </Card>
    </div>
  );
}