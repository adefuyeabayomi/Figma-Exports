import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Palette, Upload, Eye } from 'lucide-react';

export function WhiteLabelSettings() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1>White-Label Settings</h1>
        <p className="text-muted-foreground">Manage default branding for new merchants</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="mb-4 flex items-center gap-2">
            <Palette size={20} />
            Global Branding
          </h3>
          <div className="space-y-4">
            <div>
              <Label>Default Logo</Label>
              <div className="mt-2 border-2 border-dashed border-border rounded-lg p-6 text-center">
                <Upload size={24} className="mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Upload default logo</p>
              </div>
            </div>
            <div>
              <Label>Primary Color</Label>
              <div className="flex gap-2 mt-2">
                <Input type="color" value="#030213" className="w-16 h-10" />
                <Input value="#030213" className="flex-1" />
              </div>
            </div>
            <div>
              <Label>Secondary Color</Label>
              <div className="flex gap-2 mt-2">
                <Input type="color" value="#717182" className="w-16 h-10" />
                <Input value="#717182" className="flex-1" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="mb-4">Landing Page Templates</h3>
          <div className="space-y-4">
            <div className="border border-border rounded-lg p-4">
              <h4 className="font-medium">Modern Template</h4>
              <p className="text-sm text-muted-foreground">Clean and minimal design</p>
              <Button variant="outline" size="sm" className="mt-2">
                <Eye size={16} className="mr-2" />
                Preview
              </Button>
            </div>
            <div className="border border-border rounded-lg p-4">
              <h4 className="font-medium">Professional Template</h4>
              <p className="text-sm text-muted-foreground">Corporate-focused layout</p>
              <Button variant="outline" size="sm" className="mt-2">
                <Eye size={16} className="mr-2" />
                Preview
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}