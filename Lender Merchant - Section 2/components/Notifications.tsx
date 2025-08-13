import { useState } from "react";
import { Plus, Edit, Eye, Send, Settings, Mail, MessageSquare, Bell } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "./ui/dialog";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";

interface NotificationTemplate {
  id: string;
  name: string;
  type: string;
  trigger: string;
  channels: {
    email: boolean;
    sms: boolean;
    inApp: boolean;
  };
  status: 'active' | 'disabled';
  subject: string;
  body: string;
  lastUpdated: string;
}

const mockTemplates: NotificationTemplate[] = [
  {
    id: "TEMP001",
    name: "Loan Approval Notification",
    type: "Loan Approved",
    trigger: "On Loan Approval",
    channels: { email: true, sms: true, inApp: true },
    status: "active",
    subject: "Your loan has been approved! 🎉",
    body: "Dear {{customerName}}, congratulations! Your loan application for ₦{{loanAmount}} has been approved.",
    lastUpdated: "2024-01-30"
  },
  {
    id: "TEMP002", 
    name: "Repayment Reminder",
    type: "Repayment Reminder",
    trigger: "3 Days Before Due Date",
    channels: { email: true, sms: true, inApp: false },
    status: "active",
    subject: "Payment Reminder - Due {{dueDate}}",
    body: "Hello {{customerName}}, this is a friendly reminder that your loan payment of ₦{{paymentAmount}} is due on {{dueDate}}.",
    lastUpdated: "2024-01-29"
  },
  {
    id: "TEMP003",
    name: "Overdue Payment Alert",
    type: "Overdue Alert",
    trigger: "On Payment Overdue",
    channels: { email: true, sms: true, inApp: true },
    status: "active",
    subject: "Urgent: Payment Overdue",
    body: "Dear {{customerName}}, your payment of ₦{{overdueAmount}} is now {{daysOverdue}} days overdue. Please make payment immediately.",
    lastUpdated: "2024-01-28"
  },
  {
    id: "TEMP004",
    name: "Application Received",
    type: "Application Received",
    trigger: "On Application Submission",
    channels: { email: true, sms: false, inApp: true },
    status: "disabled",
    subject: "Application Received - {{applicationId}}",
    body: "Thank you {{customerName}}! We've received your loan application and will review it within 24 hours.",
    lastUpdated: "2024-01-25"
  }
];

const notificationSettings = {
  dailyLimits: {
    email: 100,
    sms: 50,
    inApp: 200
  },
  businessHours: {
    enabled: true,
    start: "09:00",
    end: "18:00"
  },
  fallback: {
    enabled: true,
    sequence: ["email", "sms"]
  }
};

const availableVariables = [
  "{{customerName}}", "{{loanAmount}}", "{{paymentAmount}}", "{{dueDate}}", 
  "{{overdueAmount}}", "{{daysOverdue}}", "{{applicationId}}", "{{loanId}}"
];

export function Notifications() {
  const [templates, setTemplates] = useState(mockTemplates);
  const [editingTemplate, setEditingTemplate] = useState<NotificationTemplate | null>(null);
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    type: "",
    trigger: "",
    channels: { email: false, sms: false, inApp: false },
    subject: "",
    body: ""
  });
  const [templateModal, setTemplateModal] = useState(false);
  const [previewModal, setPreviewModal] = useState(false);
  const [settingsModal, setSettingsModal] = useState(false);
  const [settings, setSettings] = useState(notificationSettings);

  const handleCreateTemplate = () => {
    if (!newTemplate.name || !newTemplate.subject || !newTemplate.body) {
      alert("Please fill all required fields");
      return;
    }

    const template: NotificationTemplate = {
      id: `TEMP${String(templates.length + 1).padStart(3, '0')}`,
      name: newTemplate.name,
      type: newTemplate.type,
      trigger: newTemplate.trigger,
      channels: newTemplate.channels,
      status: 'active',
      subject: newTemplate.subject,
      body: newTemplate.body,
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    setTemplates(prev => [...prev, template]);
    setNewTemplate({
      name: "", type: "", trigger: "", 
      channels: { email: false, sms: false, inApp: false },
      subject: "", body: ""
    });
    setTemplateModal(false);
    alert("Notification template created successfully!");
  };

  const handleToggleTemplate = (templateId: string) => {
    setTemplates(prev => prev.map(template => 
      template.id === templateId 
        ? { ...template, status: template.status === 'active' ? 'disabled' : 'active' as const }
        : template
    ));
  };

  const handleSendTest = (template: NotificationTemplate) => {
    const channels = Object.entries(template.channels)
      .filter(([_, enabled]) => enabled)
      .map(([channel]) => channel)
      .join(', ');
    
    alert(`Test notification sent via ${channels}!`);
  };

  const getChannelIcons = (channels: any) => {
    const icons = [];
    if (channels.email) icons.push(<Mail key="email" className="h-4 w-4 text-blue-600" />);
    if (channels.sms) icons.push(<MessageSquare key="sms" className="h-4 w-4 text-green-600" />);
    if (channels.inApp) icons.push(<Bell key="inApp" className="h-4 w-4 text-purple-600" />);
    return icons;
  };

  const insertVariable = (variable: string) => {
    setNewTemplate(prev => ({
      ...prev,
      body: prev.body + variable
    }));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Notifications</h1>
        <div className="flex items-center gap-4">
          <Button onClick={() => setSettingsModal(true)} variant="outline" className="gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
          <Button onClick={() => setTemplateModal(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Create Template
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">
              {templates.filter(t => t.status === 'active').length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Email Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">
              {templates.filter(t => t.channels.email).length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">SMS Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-yellow-600">
              {templates.filter(t => t.channels.sms).length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">In-App Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-purple-600">
              {templates.filter(t => t.channels.inApp).length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Templates Table */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Template Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Trigger</TableHead>
                <TableHead>Channels</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {templates.map((template) => (
                <TableRow key={template.id}>
                  <TableCell className="font-medium">{template.name}</TableCell>
                  <TableCell>{template.type}</TableCell>
                  <TableCell>{template.trigger}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {getChannelIcons(template.channels)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={template.status === 'active' ? 'default' : 'secondary'}>
                      {template.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{template.lastUpdated}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline" asChild={false}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>Preview - {template.name}</DialogTitle>
                            <DialogDescription>Preview the notification template content and channels</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label>Subject</Label>
                              <p className="text-sm bg-gray-50 p-2 rounded">{template.subject}</p>
                            </div>
                            <div>
                              <Label>Message Body</Label>
                              <p className="text-sm bg-gray-50 p-2 rounded whitespace-pre-wrap">{template.body}</p>
                            </div>
                            <div>
                              <Label>Channels</Label>
                              <div className="flex gap-2">
                                {getChannelIcons(template.channels)}
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditingTemplate(template);
                          setNewTemplate({
                            name: template.name,
                            type: template.type,
                            trigger: template.trigger,
                            channels: template.channels,
                            subject: template.subject,
                            body: template.body
                          });
                          setTemplateModal(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleSendTest(template)}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create/Edit Template Modal */}
      <Dialog open={templateModal} onOpenChange={setTemplateModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingTemplate ? 'Edit Template' : 'Create New Template'}</DialogTitle>
            <DialogDescription>Configure notification template settings and content</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="templateName">Template Name</Label>
                <Input
                  id="templateName"
                  value={newTemplate.name}
                  onChange={(e) => setNewTemplate(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter template name"
                />
              </div>
              <div>
                <Label htmlFor="templateType">Type</Label>
                <Select value={newTemplate.type} onValueChange={(value) => 
                  setNewTemplate(prev => ({ ...prev, type: value }))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Loan Approved">Loan Approved</SelectItem>
                    <SelectItem value="Loan Declined">Loan Declined</SelectItem>
                    <SelectItem value="Repayment Reminder">Repayment Reminder</SelectItem>
                    <SelectItem value="Overdue Alert">Overdue Alert</SelectItem>
                    <SelectItem value="Application Received">Application Received</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="trigger">Trigger Event</Label>
              <Select value={newTemplate.trigger} onValueChange={(value) => 
                setNewTemplate(prev => ({ ...prev, trigger: value }))
              }>
                <SelectTrigger>
                  <SelectValue placeholder="Select trigger" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="On Loan Approval">On Loan Approval</SelectItem>
                  <SelectItem value="On Loan Decline">On Loan Decline</SelectItem>
                  <SelectItem value="3 Days Before Due Date">3 Days Before Due Date</SelectItem>
                  <SelectItem value="On Payment Overdue">On Payment Overdue</SelectItem>
                  <SelectItem value="On Application Submission">On Application Submission</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Channels</Label>
              <div className="flex gap-4 mt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="email"
                    checked={newTemplate.channels.email}
                    onCheckedChange={(checked) => 
                      setNewTemplate(prev => ({
                        ...prev,
                        channels: { ...prev.channels, email: !!checked }
                      }))
                    }
                  />
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="sms"
                    checked={newTemplate.channels.sms}
                    onCheckedChange={(checked) => 
                      setNewTemplate(prev => ({
                        ...prev,
                        channels: { ...prev.channels, sms: !!checked }
                      }))
                    }
                  />
                  <Label htmlFor="sms" className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    SMS
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="inApp"
                    checked={newTemplate.channels.inApp}
                    onCheckedChange={(checked) => 
                      setNewTemplate(prev => ({
                        ...prev,
                        channels: { ...prev.channels, inApp: !!checked }
                      }))
                    }
                  />
                  <Label htmlFor="inApp" className="flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    In-App
                  </Label>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={newTemplate.subject}
                onChange={(e) => setNewTemplate(prev => ({ ...prev, subject: e.target.value }))}
                placeholder="Enter subject line"
              />
            </div>

            <div>
              <Label htmlFor="body">Message Body</Label>
              <Textarea
                id="body"
                value={newTemplate.body}
                onChange={(e) => setNewTemplate(prev => ({ ...prev, body: e.target.value }))}
                placeholder="Enter message content"
                rows={6}
              />
            </div>

            <div>
              <Label>Available Variables</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {availableVariables.map((variable) => (
                  <Button
                    key={variable}
                    size="sm"
                    variant="outline"
                    onClick={() => insertVariable(variable)}
                  >
                    {variable}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setTemplateModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateTemplate}>
                {editingTemplate ? 'Update Template' : 'Create Template'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Settings Modal */}
      <Dialog open={settingsModal} onOpenChange={setSettingsModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Notification Settings</DialogTitle>
            <DialogDescription>Configure notification limits and delivery settings</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Daily Limits</Label>
              <div className="space-y-2 mt-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Email</span>
                  <Input
                    type="number"
                    value={settings.dailyLimits.email}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      dailyLimits: { ...prev.dailyLimits, email: parseInt(e.target.value) || 0 }
                    }))}
                    className="w-20"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">SMS</span>
                  <Input
                    type="number"
                    value={settings.dailyLimits.sms}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      dailyLimits: { ...prev.dailyLimits, sms: parseInt(e.target.value) || 0 }
                    }))}
                    className="w-20"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Label>Business Hours Restriction</Label>
                <Switch
                  checked={settings.businessHours.enabled}
                  onCheckedChange={(checked) => setSettings(prev => ({
                    ...prev,
                    businessHours: { ...prev.businessHours, enabled: checked }
                  }))}
                />
              </div>
              {settings.businessHours.enabled && (
                <div className="flex gap-2 mt-2">
                  <Input
                    type="time"
                    value={settings.businessHours.start}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      businessHours: { ...prev.businessHours, start: e.target.value }
                    }))}
                  />
                  <Input
                    type="time"
                    value={settings.businessHours.end}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      businessHours: { ...prev.businessHours, end: e.target.value }
                    }))}
                  />
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Label>Enable Fallback</Label>
                <Switch
                  checked={settings.fallback.enabled}
                  onCheckedChange={(checked) => setSettings(prev => ({
                    ...prev,
                    fallback: { ...prev.fallback, enabled: checked }
                  }))}
                />
              </div>
              <p className="text-sm text-gray-600 mt-1">
                If SMS fails, automatically try email
              </p>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setSettingsModal(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                alert("Settings saved successfully!");
                setSettingsModal(false);
              }}>
                Save Settings
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}