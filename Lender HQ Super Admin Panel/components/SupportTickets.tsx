import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { MessageCircle, Clock, CheckCircle } from 'lucide-react';

const tickets = [
  {
    id: '#TK-001',
    merchant: 'TechCorp Nigeria',
    subject: 'Loan approval delay',
    status: 'open',
    priority: 'high',
    assignedTo: 'Sarah Okafor',
    lastUpdate: '2 hours ago',
  },
  {
    id: '#TK-002',
    merchant: 'Lagos Business Hub',
    subject: 'API integration issue',
    status: 'in-progress',
    priority: 'medium',
    assignedTo: 'Michael Chen',
    lastUpdate: '4 hours ago',
  },
  {
    id: '#TK-003',
    merchant: 'Delta Manufacturing',
    subject: 'Payment gateway error',
    status: 'resolved',
    priority: 'high',
    assignedTo: 'John Adebayo',
    lastUpdate: '1 day ago',
  },
];

export function SupportTickets() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <MessageCircle size={16} className="text-blue-600" />;
      case 'in-progress':
        return <Clock size={16} className="text-yellow-600" />;
      case 'resolved':
        return <CheckCircle size={16} className="text-green-600" />;
      default:
        return <MessageCircle size={16} />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge className="bg-blue-100 text-blue-700">Open</Badge>;
      case 'in-progress':
        return <Badge className="bg-yellow-100 text-yellow-700">In Progress</Badge>;
      case 'resolved':
        return <Badge className="bg-green-100 text-green-700">Resolved</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">High</Badge>;
      case 'medium':
        return <Badge variant="secondary">Medium</Badge>;
      case 'low':
        return <Badge variant="outline">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Support Tickets</h1>
          <p className="text-muted-foreground">Manage customer support requests</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Filter</Button>
          <Button>New Ticket</Button>
        </div>
      </div>

      <div className="space-y-4">
        {tickets.map((ticket) => (
          <Card key={ticket.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {getStatusIcon(ticket.status)}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium">{ticket.id}</h3>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-sm">{ticket.subject}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {ticket.merchant} • Assigned to {ticket.assignedTo}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Last update: {ticket.lastUpdate}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                {getPriorityBadge(ticket.priority)}
                {getStatusBadge(ticket.status)}
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}