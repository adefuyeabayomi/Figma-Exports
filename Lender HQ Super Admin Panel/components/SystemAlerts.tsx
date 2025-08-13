import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

const alerts = [
  {
    id: 1,
    type: 'critical',
    title: 'API Rate Limit Exceeded',
    description: 'Merchant #892 has exceeded their API rate limit',
    timestamp: '2024-01-20 14:30:25',
    source: 'API Gateway',
  },
  {
    id: 2,
    type: 'warning',
    title: 'High Response Time',
    description: 'KYC Service response time averaging 230ms',
    timestamp: '2024-01-20 14:25:10',
    source: 'KYC Service',
  },
  {
    id: 3,
    type: 'info',
    title: 'Scheduled Maintenance',
    description: 'System maintenance scheduled for tonight 2AM-4AM',
    timestamp: '2024-01-20 14:20:05',
    source: 'System',
  },
];

export function SystemAlerts() {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle size={20} className="text-red-600" />;
      case 'warning':
        return <AlertCircle size={20} className="text-yellow-600" />;
      default:
        return <Info size={20} className="text-blue-600" />;
    }
  };

  const getAlertBadge = (type: string) => {
    switch (type) {
      case 'critical':
        return <Badge variant="destructive">Critical</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-100 text-yellow-700">Warning</Badge>;
      default:
        return <Badge className="bg-blue-100 text-blue-700">Info</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>System Alerts</h1>
          <p className="text-muted-foreground">Monitor and manage system alerts</p>
        </div>
        <Button variant="outline">Configure Alerts</Button>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <Card key={alert.id} className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                {getAlertIcon(alert.type)}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium">{alert.title}</h3>
                    {getAlertBadge(alert.type)}
                  </div>
                  <p className="text-muted-foreground mb-2">{alert.description}</p>
                  <p className="text-sm text-muted-foreground">
                    {alert.source} • {alert.timestamp}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <X size={16} />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}