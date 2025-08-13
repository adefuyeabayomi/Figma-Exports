import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Search, Download, FileText, Shield, Users, CreditCard } from 'lucide-react';

const auditLogs = [
  {
    id: 1,
    user: 'John Adebayo',
    action: 'Approved KYC',
    module: 'Merchant Management',
    details: 'Approved KYC for TechCorp Nigeria Ltd',
    timestamp: '2024-01-20 14:30:25',
    ipAddress: '192.168.1.1',
  },
  {
    id: 2,
    user: 'Sarah Okafor',
    action: 'Updated Plan',
    module: 'Billing',
    details: 'Changed plan from Starter to Professional for Lagos Business Hub',
    timestamp: '2024-01-20 14:25:10',
    ipAddress: '192.168.1.2',
  },
  {
    id: 3,
    user: 'Michael Chen',
    action: 'Resolved Ticket',
    module: 'Support',
    details: 'Resolved support ticket #TK-003',
    timestamp: '2024-01-20 14:20:05',
    ipAddress: '192.168.1.3',
  },
];

export function AuditLogs() {
  const getModuleIcon = (module: string) => {
    switch (module) {
      case 'Merchant Management':
        return <Users size={16} className="text-blue-600" />;
      case 'Billing':
        return <CreditCard size={16} className="text-green-600" />;
      case 'Support':
        return <FileText size={16} className="text-purple-600" />;
      default:
        return <Shield size={16} className="text-gray-600" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Audit Logs</h1>
          <p className="text-muted-foreground">Track all administrative actions and changes</p>
        </div>
        <Button variant="outline">
          <Download size={16} className="mr-2" />
          Export CSV
        </Button>
      </div>

      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search logs..."
              className="pl-9"
            />
          </div>
          <Select>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by module" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Modules</SelectItem>
              <SelectItem value="merchant">Merchant Management</SelectItem>
              <SelectItem value="billing">Billing</SelectItem>
              <SelectItem value="support">Support</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">Last 7 days</SelectItem>
              <SelectItem value="month">Last 30 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      <div className="space-y-4">
        {auditLogs.map((log) => (
          <Card key={log.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-3">
                {getModuleIcon(log.module)}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium">{log.action}</h3>
                    <Badge variant="outline">{log.module}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{log.details}</p>
                  <p className="text-xs text-muted-foreground">
                    {log.user} • {log.timestamp} • IP: {log.ipAddress}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}