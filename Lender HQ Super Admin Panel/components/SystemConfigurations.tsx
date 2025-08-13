import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Settings, Zap, Shield, AlertTriangle } from 'lucide-react';

export function SystemConfigurations() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1>System Configurations</h1>
        <p className="text-muted-foreground">Manage platform-wide settings and integrations</p>
      </div>

      <Tabs defaultValue="integrations" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="features">Feature Flags</TabsTrigger>
          <TabsTrigger value="environment">Environment</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>

        <TabsContent value="integrations" className="space-y-4">
          <Card className="p-6">
            <h3 className="mb-4 flex items-center gap-2">
              <Settings size={20} />
              Third-Party Integrations
            </h3>
            <div className="space-y-6">
              <div>
                <Label>Credit Bureau API</Label>
                <div className="flex items-center gap-2 mt-2">
                  <Input placeholder="API Endpoint" className="flex-1" />
                  <Switch />
                </div>
              </div>
              <div>
                <Label>Payment Gateway</Label>
                <div className="flex items-center gap-2 mt-2">
                  <Input placeholder="Gateway URL" className="flex-1" />
                  <Switch />
                </div>
              </div>
              <div>
                <Label>Email Service Provider</Label>
                <div className="flex items-center gap-2 mt-2">
                  <Input placeholder="SMTP Configuration" className="flex-1" />
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="space-y-4">
          <Card className="p-6">
            <h3 className="mb-4 flex items-center gap-2">
              <Zap size={20} />
              Feature Flags
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Advanced Analytics</Label>
                  <p className="text-sm text-muted-foreground">Enable advanced reporting features</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Auto KYC Verification</Label>
                  <p className="text-sm text-muted-foreground">Automatically verify simple KYC submissions</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Real-time Notifications</Label>
                  <p className="text-sm text-muted-foreground">Push notifications for critical events</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="environment" className="space-y-4">
          <Card className="p-6">
            <h3 className="mb-4 flex items-center gap-2">
              <Shield size={20} />
              Environment Settings
            </h3>
            <div className="space-y-4">
              <div>
                <Label>Environment Mode</Label>
                <div className="flex items-center gap-2 mt-2">
                  <Button variant="outline" size="sm">Production</Button>
                  <Button variant="ghost" size="sm">Sandbox</Button>
                </div>
              </div>
              <div>
                <Label>Platform Webhook URL</Label>
                <Input defaultValue="https://api.lenderhq.com/webhooks" className="mt-2" />
              </div>
              <div>
                <Label>API Rate Limits</Label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <Label className="text-sm">Requests per minute</Label>
                    <Input defaultValue="1000" />
                  </div>
                  <div>
                    <Label className="text-sm">Burst limit</Label>
                    <Input defaultValue="100" />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-4">
          <Card className="p-6">
            <h3 className="mb-4 flex items-center gap-2">
              <AlertTriangle size={20} />
              Maintenance Mode
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div>
                  <Label>Global Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">Disable access for all merchants</p>
                </div>
                <Switch />
              </div>
              <div>
                <Label>Maintenance Message</Label>
                <Input 
                  placeholder="We're performing scheduled maintenance..."
                  className="mt-2"
                />
              </div>
              <div>
                <Label>Estimated Duration</Label>
                <Input 
                  placeholder="2 hours"
                  className="mt-2"
                />
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button>Save All Changes</Button>
      </div>
    </div>
  );
}