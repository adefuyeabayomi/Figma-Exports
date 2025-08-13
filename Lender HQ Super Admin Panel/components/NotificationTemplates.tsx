import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Mail, MessageSquare, Edit, Send } from 'lucide-react';

const templates = [
  {
    id: 1,
    name: 'Loan Approval',
    trigger: 'loan.approved',
    type: 'email',
    subject: 'Your loan has been approved!',
  },
  {
    id: 2,
    name: 'KYC Pending',
    trigger: 'kyc.pending',
    type: 'in-app',
    subject: 'KYC verification required',
  },
  {
    id: 3,
    name: 'Payment Reminder',
    trigger: 'payment.due',
    type: 'email',
    subject: 'Payment reminder - {{merchantName}}',
  },
];

export function NotificationTemplates() {
  const [selectedTemplate, setSelectedTemplate] = useState<typeof templates[0] | null>(null);

  if (selectedTemplate) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setSelectedTemplate(null)}>
            ← Back to Templates
          </Button>
          <div>
            <h1>Edit Template</h1>
            <p className="text-muted-foreground">{selectedTemplate.name}</p>
          </div>
        </div>

        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Subject Line</label>
              <Input defaultValue={selectedTemplate.subject} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Message Body</label>
              <Textarea
                rows={8}
                placeholder="Enter your message template here. Use {{variableName}} for dynamic content."
                defaultValue="Hello {{merchantName}},\n\nThis is a notification about your account.\n\nBest regards,\nLender HQ Team"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Send size={16} className="mr-2" />
                Send Test
              </Button>
              <Button>Save Template</Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Notification Templates</h1>
          <p className="text-muted-foreground">Manage email and in-app notification templates</p>
        </div>
        <Button>Create New Template</Button>
      </div>

      <div className="space-y-4">
        {templates.map((template) => (
          <Card key={template.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                  {template.type === 'email' ? (
                    <Mail size={20} className="text-muted-foreground" />
                  ) : (
                    <MessageSquare size={20} className="text-muted-foreground" />
                  )}
                </div>
                <div>
                  <h3 className="font-medium">{template.name}</h3>
                  <p className="text-sm text-muted-foreground">Trigger: {template.trigger}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Badge variant={template.type === 'email' ? 'default' : 'secondary'}>
                  {template.type}
                </Badge>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSelectedTemplate(template)}
                >
                  <Edit size={16} className="mr-2" />
                  Edit
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}