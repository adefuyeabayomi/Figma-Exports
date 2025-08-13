import { useState } from "react";
import { Save, RefreshCw, TestTube, Eye, EyeOff } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";

interface SettingsData {
  primaryProvider: string;
  primaryApiKey: string;
  primarySecret: string;
  primaryWebhook: string;
  fallbackEnabled: boolean;
  fallbackProvider: string;
  retryMinutes: number;
  maxRetries: number;
  cutoffTime: string;
  afterHoursEnabled: boolean;
  batchEnabled: boolean;
  batchSize: number;
  batchSchedule: string;
  accountName: string;
  accountNumber: string;
  bankName: string;
  referenceFormat: string;
  webhookUrl: string;
  emailNotifications: boolean;
}

const auditLogs = [
  {
    date: "2024-01-20 14:30",
    admin: "Erik Lamela",
    change: "Updated primary provider to Paystack",
    ip: "192.168.1.100"
  },
  {
    date: "2024-01-19 10:15",
    admin: "Sarah Wilson",
    change: "Enabled fallback provider",
    ip: "192.168.1.102"
  },
  {
    date: "2024-01-18 16:45",
    admin: "Erik Lamela",
    change: "Changed batch size to 50",
    ip: "192.168.1.100"
  },
  {
    date: "2024-01-17 09:20",
    admin: "David Brown",
    change: "Updated webhook URL",
    ip: "192.168.1.105"
  }
];

export function DisbursementSettings() {
  const [showSecrets, setShowSecrets] = useState(false);
  const [settings, setSettings] = useState<SettingsData>({
    primaryProvider: "paystack",
    primaryApiKey: "pk_test_xxxxxxxxxxxxxxxx",
    primarySecret: "sk_test_xxxxxxxxxxxxxxxx",
    primaryWebhook: "https://api.lender.com/webhooks/paystack",
    fallbackEnabled: true,
    fallbackProvider: "flutterwave",
    retryMinutes: 30,
    maxRetries: 3,
    cutoffTime: "15:00",
    afterHoursEnabled: false,
    batchEnabled: true,
    batchSize: 50,
    batchSchedule: "30min",
    accountName: "Lender Disbursement Account",
    accountNumber: "0123456789",
    bankName: "First Bank",
    referenceFormat: "LoanRef-[ID]",
    webhookUrl: "https://api.lender.com/webhooks/disbursement",
    emailNotifications: true
  });

  const [testingConnection, setTestingConnection] = useState(false);

  const handleSave = () => {
    // Simulate save operation
    console.log("Saving settings:", settings);
    alert("Settings saved successfully!");
  };

  const handleTestConnection = async () => {
    setTestingConnection(true);
    // Simulate API test
    await new Promise(resolve => setTimeout(resolve, 2000));
    setTestingConnection(false);
    alert("Connection test successful!");
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to reset to default settings?")) {
      // Reset to default values
      alert("Settings reset to defaults");
    }
  };

  const handleSimulate = () => {
    alert("Disbursement simulation completed successfully!");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Disbursement Settings</h1>
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={handleReset}>
            Reset to Default
          </Button>
          <Button variant="outline" onClick={handleSimulate}>
            <TestTube className="h-4 w-4 mr-2" />
            Simulate Disbursement
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Primary Provider */}
        <Card>
          <CardHeader>
            <CardTitle>Primary Disbursement Provider</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="primaryProvider">Provider</Label>
              <Select value={settings.primaryProvider} onValueChange={(value) => 
                setSettings(prev => ({ ...prev, primaryProvider: value }))
              }>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paystack">Paystack</SelectItem>
                  <SelectItem value="flutterwave">Flutterwave</SelectItem>
                  <SelectItem value="monnify">Monnify</SelectItem>
                  <SelectItem value="internal">Internal Ledger</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="apiKey">API Key</Label>
              <div className="relative">
                <Input
                  id="apiKey"
                  type={showSecrets ? "text" : "password"}
                  value={settings.primaryApiKey}
                  onChange={(e) => setSettings(prev => ({ ...prev, primaryApiKey: e.target.value }))}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowSecrets(!showSecrets)}
                >
                  {showSecrets ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="secret">Secret Key</Label>
              <Input
                id="secret"
                type={showSecrets ? "text" : "password"}
                value={settings.primarySecret}
                onChange={(e) => setSettings(prev => ({ ...prev, primarySecret: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="webhook">Webhook URL</Label>
              <Input
                id="webhook"
                value={settings.primaryWebhook}
                onChange={(e) => setSettings(prev => ({ ...prev, primaryWebhook: e.target.value }))}
              />
            </div>

            <Button onClick={handleTestConnection} disabled={testingConnection} className="w-full">
              {testingConnection ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <TestTube className="h-4 w-4 mr-2" />
              )}
              Test Connection
            </Button>
          </CardContent>
        </Card>

        {/* Fallback Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Fallback Provider Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="fallbackEnabled">Enable Fallback</Label>
              <Switch
                id="fallbackEnabled"
                checked={settings.fallbackEnabled}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, fallbackEnabled: checked }))}
              />
            </div>

            {settings.fallbackEnabled && (
              <>
                <div>
                  <Label htmlFor="fallbackProvider">Secondary Provider</Label>
                  <Select value={settings.fallbackProvider} onValueChange={(value) => 
                    setSettings(prev => ({ ...prev, fallbackProvider: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="flutterwave">Flutterwave</SelectItem>
                      <SelectItem value="monnify">Monnify</SelectItem>
                      <SelectItem value="paystack">Paystack</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="retryMinutes">Retry After (minutes)</Label>
                  <Input
                    id="retryMinutes"
                    type="number"
                    value={settings.retryMinutes}
                    onChange={(e) => setSettings(prev => ({ ...prev, retryMinutes: parseInt(e.target.value) }))}
                  />
                </div>

                <div>
                  <Label htmlFor="maxRetries">Maximum Retries</Label>
                  <Input
                    id="maxRetries"
                    type="number"
                    value={settings.maxRetries}
                    onChange={(e) => setSettings(prev => ({ ...prev, maxRetries: parseInt(e.target.value) }))}
                  />
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Cut-off Times */}
        <Card>
          <CardHeader>
            <CardTitle>Cut-off Times</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="cutoffTime">Daily Cut-off Time</Label>
              <Input
                id="cutoffTime"
                type="time"
                value={settings.cutoffTime}
                onChange={(e) => setSettings(prev => ({ ...prev, cutoffTime: e.target.value }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="afterHours">Allow After-hours Disbursement</Label>
              <Switch
                id="afterHours"
                checked={settings.afterHoursEnabled}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, afterHoursEnabled: checked }))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Batch Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Batch Disbursement Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="batchEnabled">Enable Batch Disbursement</Label>
              <Switch
                id="batchEnabled"
                checked={settings.batchEnabled}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, batchEnabled: checked }))}
              />
            </div>

            {settings.batchEnabled && (
              <>
                <div>
                  <Label htmlFor="batchSize">Maximum Batch Size</Label>
                  <Input
                    id="batchSize"
                    type="number"
                    value={settings.batchSize}
                    onChange={(e) => setSettings(prev => ({ ...prev, batchSize: parseInt(e.target.value) }))}
                  />
                </div>

                <div>
                  <Label htmlFor="batchSchedule">Schedule</Label>
                  <Select value={settings.batchSchedule} onValueChange={(value) => 
                    setSettings(prev => ({ ...prev, batchSchedule: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30min">Every 30 minutes</SelectItem>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Bank Account Config */}
        <Card>
          <CardHeader>
            <CardTitle>Bank Account Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="accountName">Account Name</Label>
              <Input
                id="accountName"
                value={settings.accountName}
                onChange={(e) => setSettings(prev => ({ ...prev, accountName: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="accountNumber">Account Number</Label>
              <Input
                id="accountNumber"
                value={settings.accountNumber}
                onChange={(e) => setSettings(prev => ({ ...prev, accountNumber: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="bankName">Bank Name</Label>
              <Select value={settings.bankName} onValueChange={(value) => 
                setSettings(prev => ({ ...prev, bankName: value }))
              }>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="First Bank">First Bank</SelectItem>
                  <SelectItem value="GTBank">GTBank</SelectItem>
                  <SelectItem value="Access Bank">Access Bank</SelectItem>
                  <SelectItem value="UBA">UBA</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="referenceFormat">Reference Format</Label>
              <Input
                id="referenceFormat"
                value={settings.referenceFormat}
                onChange={(e) => setSettings(prev => ({ ...prev, referenceFormat: e.target.value }))}
              />
            </div>

            <Button variant="outline" className="w-full">
              Validate via API
            </Button>
          </CardContent>
        </Card>

        {/* Webhook & Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Webhook & Notification Rules</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="webhookUrl">Webhook URL</Label>
              <Input
                id="webhookUrl"
                value={settings.webhookUrl}
                onChange={(e) => setSettings(prev => ({ ...prev, webhookUrl: e.target.value }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="emailNotifications">Email Notifications</Label>
              <Switch
                id="emailNotifications"
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, emailNotifications: checked }))}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Audit Section */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Configuration Changes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Admin</TableHead>
                <TableHead>Change Summary</TableHead>
                <TableHead>IP Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditLogs.map((log, index) => (
                <TableRow key={index}>
                  <TableCell>{log.date}</TableCell>
                  <TableCell>{log.admin}</TableCell>
                  <TableCell>{log.change}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{log.ip}</Badge>
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