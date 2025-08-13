import React from 'react';
import { 
  Home, 
  Building2, 
  CheckCircle, 
  Palette, 
  Mail, 
  CreditCard, 
  Activity, 
  AlertTriangle, 
  Users, 
  Headphones, 
  FileText, 
  Settings 
} from 'lucide-react';

type PageType = 'dashboard' | 'merchants' | 'kyc' | 'whitelabel' | 'notifications' | 'billing' | 'api' | 'alerts' | 'users' | 'support' | 'audit' | 'config';

interface SidebarProps {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
}

const navigationItems = [
  { id: 'dashboard' as PageType, label: 'Dashboard', icon: Home },
  { id: 'merchants' as PageType, label: 'Merchant Management', icon: Building2 },
  { id: 'kyc' as PageType, label: 'KYC Review', icon: CheckCircle },
  { id: 'whitelabel' as PageType, label: 'White-Label Settings', icon: Palette },
  { id: 'notifications' as PageType, label: 'Notification Templates', icon: Mail },
  { id: 'billing' as PageType, label: 'Plans & Billing', icon: CreditCard },
  { id: 'api' as PageType, label: 'API & Webhook Monitor', icon: Activity },
  { id: 'alerts' as PageType, label: 'System Alerts', icon: AlertTriangle },
  { id: 'users' as PageType, label: 'Admin User Management', icon: Users },
  { id: 'support' as PageType, label: 'Support Tickets', icon: Headphones },
  { id: 'audit' as PageType, label: 'Audit Logs', icon: FileText },
  { id: 'config' as PageType, label: 'System Configurations', icon: Settings },
];

export function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  return (
    <div className="w-64 bg-card border-r border-border flex flex-col">
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-semibold text-foreground">Lender HQ</h1>
        <p className="text-sm text-muted-foreground">Super Admin Panel</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              }`}
            >
              <Icon size={16} />
              <span className="text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}