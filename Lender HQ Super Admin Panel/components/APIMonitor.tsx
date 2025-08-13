import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Activity, CheckCircle, XCircle, RotateCcw } from 'lucide-react';

const apiStatus = [
  { service: 'API Gateway', status: 'healthy', uptime: '99.9%', responseTime: '120ms' },
  { service: 'Loan Processing', status: 'healthy', uptime: '99.7%', responseTime: '85ms' },
  { service: 'KYC Service', status: 'warning', uptime: '99.2%', responseTime: '230ms' },
  { service: 'Notifications', status: 'healthy', uptime: '99.8%', responseTime: '45ms' },
];

const webhookLogs = [
  {
    merchant: 'TechCorp Nigeria',
    event: 'loan.approved',
    status: 'success',
    timestamp: '2024-01-20 14:30:25',
  },
  {
    merchant: 'Lagos Business Hub',
    event: 'kyc.pending',
    status: 'failed',
    timestamp: '2024-01-20 14:28:15',
  },
  {
    merchant: 'Delta Manufacturing',
    event: 'payment.received',
    status: 'success',
    timestamp: '2024-01-20 14:25:10',
  },
];

export function APIMonitor() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1>API & Webhook Monitor</h1>
        <p className="text-muted-foreground">Monitor system health and integration logs</p>
      </div>

      <Card className="p-6">
        <h3 className="mb-4 flex items-center gap-2">
          <Activity size={20} />
          Live API Status
        </h3>
        <div className="space-y-4">
          {apiStatus.map((api, index) => (
            <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${
                  api.status === 'healthy' ? 'bg-green-500' :
                  api.status === 'warning' ? 'bg-yellow-500' :
                  'bg-red-500'
                }`} />
                <div>
                  <p className="font-medium">{api.service}</p>
                  <p className="text-sm text-muted-foreground">
                    Uptime: {api.uptime} • Response: {api.responseTime}
                  </p>
                </div>
              </div>
              <Badge 
                variant={api.status === 'healthy' ? 'default' : 'secondary'}
                className={api.status === 'healthy' ? 'bg-green-100 text-green-700' : ''}
              >
                {api.status}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="mb-4">Recent Webhook Logs</h3>
        <div className="space-y-3">
          {webhookLogs.map((log, index) => (
            <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div className="flex items-center gap-3">
                {log.status === 'success' ? (
                  <CheckCircle size={16} className="text-green-600" />
                ) : (
                  <XCircle size={16} className="text-red-600" />
                )}
                <div>
                  <p className="font-medium">{log.merchant}</p>
                  <p className="text-sm text-muted-foreground">
                    {log.event} • {log.timestamp}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge 
                  variant={log.status === 'success' ? 'default' : 'destructive'}
                  className={log.status === 'success' ? 'bg-green-100 text-green-700' : ''}
                >
                  {log.status}
                </Badge>
                {log.status === 'failed' && (
                  <Button variant="ghost" size="sm">
                    <RotateCcw size={16} />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}