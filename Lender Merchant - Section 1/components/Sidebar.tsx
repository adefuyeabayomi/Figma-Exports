import React, { useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  ChevronDown,
  LayoutDashboard,
  Package,
  Users,
  FileText,
  Send,
  ClipboardList,
  BarChart3,
  Sliders,
  Bell,
  FileCheck,
  Key,
  Briefcase,
  AlertTriangle,
  Download
} from 'lucide-react';

interface SidebarProps {
  className?: string;
  currentPage?: string;
  onNavigate?: (page: 'dashboard' | 'create-product' | 'manage-products' | 'kyc-review' | 'borrower-directory' | 'new-applications' | 'underwriting-decisions') => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  hasSubmenu?: boolean;
  badge?: number;
  submenu?: Array<{
    label: string;
    badge?: number;
  }>;
}

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboard className="h-5 w-5" />
  },
  {
    id: 'loan-products',
    label: 'Loan Products',
    icon: <Package className="h-5 w-5" />,
    hasSubmenu: true,
    submenu: [
      { label: 'Create Product' },
      { label: 'Manage Product', badge: 4 }
    ]
  },
  {
    id: 'borrowers',
    label: 'Borrowers',
    icon: <Users className="h-5 w-5" />,
    hasSubmenu: true,
    submenu: [
      { label: 'KYC Review Queue', badge: 24 },
      { label: 'Borrower Directory' }
    ]
  },
  {
    id: 'loan-applications',
    label: 'Loan Applications',
    icon: <FileText className="h-5 w-5" />,
    hasSubmenu: true,
    submenu: [
      { label: 'New Applications', badge: 5 },
      { label: 'Underwriting Decisions', badge: 2 }
    ]
  },
  {
    id: 'disbursements',
    label: 'Disbursements',
    icon: <Send className="h-5 w-5" />,
    hasSubmenu: true,
    submenu: [
      { label: 'Disburse Approved Loans' },
      { label: 'Disbursement Settings', badge: 4 }
    ]
  },
  {
    id: 'loan-management',
    label: 'Loan Management',
    icon: <ClipboardList className="h-5 w-5" />,
    hasSubmenu: true,
    submenu: [
      { label: 'Active Loans' },
      { label: 'Repayment & Collections', badge: 4 },
      { label: 'Defaulted / Overdue Loans' }
    ]
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: <BarChart3 className="h-5 w-5" />,
    hasSubmenu: true,
    submenu: [
      { label: 'Portfolio Performance' },
      { label: 'Financial Reports', badge: 4 },
      { label: 'Risk & Compliance Report' },
      { label: 'Customer Statements' }
    ]
  },
  {
    id: 'credit-rules',
    label: 'Credit Rules & Scoring',
    icon: <Sliders className="h-5 w-5" />
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: <Bell className="h-5 w-5" />,
    badge: 4
  },
  {
    id: 'audit-logs',
    label: 'Audit Logs',
    icon: <FileCheck className="h-5 w-5" />,
    badge: 4
  },
  {
    id: 'teams',
    label: 'Teams & Permissions',
    icon: <Key className="h-5 w-5" />
  },
  {
    id: 'business-profile',
    label: 'Business Profile',
    icon: <Briefcase className="h-5 w-5" />
  },
  {
    id: 'system-alerts',
    label: 'System Alerts',
    icon: <AlertTriangle className="h-5 w-5" />
  },
  {
    id: 'data-exports',
    label: 'Data Exports',
    icon: <Download className="h-5 w-5" />
  }
];

export function Sidebar({ className, currentPage, onNavigate }: SidebarProps) {
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['loan-products', 'borrowers', 'loan-applications']);

  const toggleMenu = (menuId: string) => {
    setExpandedMenus(prev => 
      prev.includes(menuId) 
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  const handleMenuClick = (menuId: string, hasSubmenu: boolean) => {
    if (menuId === 'dashboard' && onNavigate) {
      onNavigate('dashboard');
    } else if (hasSubmenu) {
      toggleMenu(menuId);
    }
  };

  const handleSubmenuClick = (menuId: string, submenuLabel: string) => {
    if (menuId === 'loan-products' && onNavigate) {
      if (submenuLabel === 'Create Product') {
        onNavigate('create-product');
      } else if (submenuLabel === 'Manage Product') {
        onNavigate('manage-products');
      }
    } else if (menuId === 'borrowers' && onNavigate) {
      if (submenuLabel === 'KYC Review Queue') {
        onNavigate('kyc-review');
      } else if (submenuLabel === 'Borrower Directory') {
        onNavigate('borrower-directory');
      }
    } else if (menuId === 'loan-applications' && onNavigate) {
      if (submenuLabel === 'New Applications') {
        onNavigate('new-applications');
      } else if (submenuLabel === 'Underwriting Decisions') {
        onNavigate('underwriting-decisions');
      }
    }
  };

  return (
    <div className={`bg-white border-r border-gray-200 shadow-sm ${className}`}>
      {/* User Profile Section */}
      <div className="p-4 border-b border-gray-100">
        <div className="bg-yellow-50 rounded-lg p-3 flex items-center space-x-3">
          <div className="bg-yellow-200 rounded-full w-12 h-12 flex items-center justify-center">
            <span className="text-lg font-semibold text-gray-800">IA</span>
          </div>
          <div>
            <div className="font-medium text-gray-900">Idris Abdul</div>
            <div className="text-sm text-gray-600">Role: Owner</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="p-4">
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-500 mb-3">Main Operations</h3>
          
          <div className="space-y-1">
            {menuItems.map((item) => (
              <div key={item.id}>
                <Button
                  variant={(item.id === 'dashboard' && currentPage === 'dashboard') || 
                           (item.id === 'loan-products' && (currentPage === 'create-product' || currentPage === 'manage-products')) ||
                           (item.id === 'borrowers' && (currentPage === 'kyc-review' || currentPage === 'borrower-directory')) ||
                           (item.id === 'loan-applications' && (currentPage === 'new-applications' || currentPage === 'underwriting-decisions'))
                           ? "secondary" : "ghost"}
                  className={`w-full justify-start h-auto py-3 px-3 ${
                    (item.id === 'dashboard' && currentPage === 'dashboard') || 
                    (item.id === 'loan-products' && (currentPage === 'create-product' || currentPage === 'manage-products')) ||
                    (item.id === 'borrowers' && (currentPage === 'kyc-review' || currentPage === 'borrower-directory')) ||
                    (item.id === 'loan-applications' && (currentPage === 'new-applications' || currentPage === 'underwriting-decisions'))
                      ? 'bg-blue-50 text-blue-900 hover:bg-blue-50' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => handleMenuClick(item.id, item.hasSubmenu || false)}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-3">
                      {item.icon}
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {item.badge && (
                        <Badge variant="outline" className="text-xs bg-blue-50 text-blue-900 border-blue-200">
                          {item.badge}
                        </Badge>
                      )}
                      {item.hasSubmenu && (
                        <ChevronDown 
                          className={`h-4 w-4 transition-transform ${
                            expandedMenus.includes(item.id) ? 'rotate-180' : ''
                          }`}
                        />
                      )}
                    </div>
                  </div>
                </Button>

                {/* Submenu */}
                {item.hasSubmenu && expandedMenus.includes(item.id) && item.submenu && (
                  <div className="ml-6 mt-1 space-y-1 border-l border-blue-100 pl-4">
                    {item.submenu.map((subItem, index) => (
                      <Button
                        key={index}
                        variant={(item.id === 'loan-products' && 
                                 ((subItem.label === 'Create Product' && currentPage === 'create-product') ||
                                  (subItem.label === 'Manage Product' && currentPage === 'manage-products'))) ||
                                (item.id === 'borrowers' && 
                                 ((subItem.label === 'KYC Review Queue' && currentPage === 'kyc-review') ||
                                  (subItem.label === 'Borrower Directory' && currentPage === 'borrower-directory'))) ||
                                (item.id === 'loan-applications' && 
                                 ((subItem.label === 'New Applications' && currentPage === 'new-applications') ||
                                  (subItem.label === 'Underwriting Decisions' && currentPage === 'underwriting-decisions')))
                                ? "secondary" : "ghost"}
                        className={`w-full justify-start h-auto py-2 px-3 text-sm ${
                          (item.id === 'loan-products' && 
                           ((subItem.label === 'Create Product' && currentPage === 'create-product') ||
                            (subItem.label === 'Manage Product' && currentPage === 'manage-products'))) ||
                          (item.id === 'borrowers' && 
                           ((subItem.label === 'KYC Review Queue' && currentPage === 'kyc-review') ||
                            (subItem.label === 'Borrower Directory' && currentPage === 'borrower-directory'))) ||
                          (item.id === 'loan-applications' && 
                           ((subItem.label === 'New Applications' && currentPage === 'new-applications') ||
                            (subItem.label === 'Underwriting Decisions' && currentPage === 'underwriting-decisions')))
                            ? 'bg-blue-50 text-blue-900 hover:bg-blue-50'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                        onClick={() => handleSubmenuClick(item.id, subItem.label)}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span>{subItem.label}</span>
                          {subItem.badge && (
                            <Badge variant="outline" className="text-xs bg-blue-50 text-blue-900 border-blue-200">
                              {subItem.badge}
                            </Badge>
                          )}
                        </div>
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}