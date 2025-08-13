import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { 
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
  Palette, 
  Briefcase, 
  AlertCircle, 
  Download 
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { cn } from "./ui/utils";
import imgImage6 from "figma:asset/a716d9c40f6bd1da0d2ce7a6d5f5510bc7480025.png";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  badge?: number;
  subItems?: { id: string; label: string; badge?: number }[];
}

const menuItems: MenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "loan-products",
    label: "Loan Products",
    icon: Package,
    subItems: [
      { id: "create-product", label: "Create Product" },
      { id: "manage-product", label: "Manage Product", badge: 4 },
    ],
  },
  {
    id: "borrowers",
    label: "Borrowers",
    icon: Users,
    subItems: [
      { id: "kyc-review", label: "KYC Review Queue" },
      { id: "borrower-directory", label: "Borrower Directory", badge: 4 },
    ],
  },
  {
    id: "loan-applications",
    label: "Loan Applications",
    icon: FileText,
    subItems: [
      { id: "new-applications", label: "New Applications" },
      { id: "underwriting-decisions", label: "Underwriting Decisions", badge: 4 },
    ],
  },
  {
    id: "disbursements",
    label: "Disbursements",
    icon: Send,
    subItems: [
      { id: "disburse-approved", label: "Disburse Approved Loans" },
      { id: "disbursement-settings", label: "Disbursement Settings", badge: 4 },
    ],
  },
  {
    id: "loan-management",
    label: "Loan Management",
    icon: ClipboardList,
    subItems: [
      { id: "active-loans", label: "Active Loans" },
      { id: "repayment-collections", label: "Repayment & Collections", badge: 4 },
      { id: "defaulted-loans", label: "Defaulted / Overdue Loans" },
    ],
  },
  {
    id: "reports",
    label: "Reports",
    icon: BarChart3,
    subItems: [
      { id: "portfolio-performance", label: "Portfolio Performance" },
      { id: "financial-reports", label: "Financial Reports", badge: 4 },
      { id: "risk-compliance", label: "Risk & Compliance Report" },
      { id: "customer-statements", label: "Customer Statements" },
    ],
  },
  {
    id: "credit-rules",
    label: "Credit Rules & Scoring",
    icon: Sliders,
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
    badge: 4,
  },
  {
    id: "audit-logs",
    label: "Audit Logs",
    icon: FileCheck,
    badge: 4,
  },
  {
    id: "teams-permissions",
    label: "Teams & Permissions",
    icon: Key,
  },
  {
    id: "customize",
    label: "Customize",
    icon: Palette,
  },
  {
    id: "business-profile",
    label: "Business Profile",
    icon: Briefcase,
  },
  {
    id: "system-alerts",
    label: "System Alerts",
    icon: AlertCircle,
  },
  {
    id: "data-exports",
    label: "Data Exports",
    icon: Download,
  },
];

interface SidebarProps {
  currentPage: string;
  onPageChange: (pageId: string) => void;
}

export function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(['disbursements']));

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const handleItemClick = (itemId: string, hasSubItems: boolean) => {
    if (hasSubItems) {
      toggleExpanded(itemId);
    } else {
      onPageChange(itemId);
    }
  };

  const handleSubItemClick = (subItemId: string) => {
    onPageChange(subItemId);
  };

  return (
    <div className="w-[275px] h-full bg-white border-r border-[#eef1ff] shadow-[0px_0px_8.4px_0px_rgba(78,113,255,0.25)]">
      {/* User Profile Section */}
      <div className="p-5 bg-[#f9ffde] rounded-lg mx-4 mt-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 bg-[#DAE1BA] rounded-full flex items-center justify-center">
            <span className="text-[30px] font-normal text-black">IA</span>
          </div>
          <div>
            <div className="text-[16px] font-medium text-black">Idris Abdul</div>
            <div className="text-[12.8px] text-[#6e6e6e]">Role: Owner</div>
          </div>
        </div>
      </div>

      {/* Main Operations Header */}
      <div className="px-6 mb-5">
        <h3 className="text-[16px] font-medium text-[#6e6e6e]">Main Operations</h3>
      </div>

      {/* Navigation Menu */}
      <nav className="px-4 space-y-2">
        {menuItems.map((item) => {
          const isExpanded = expandedItems.has(item.id);
          const isActive = currentPage === item.id || (item.subItems?.some(sub => sub.id === currentPage));
          const Icon = item.icon;

          return (
            <div key={item.id}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start h-auto p-3 rounded-lg text-left",
                  isActive && "bg-[#eef1ff]"
                )}
                onClick={() => handleItemClick(item.id, !!item.subItems)}
              >
                <div className="flex items-center gap-[15px] w-full">
                  <Icon className="h-6 w-6 text-[#001360]" strokeWidth={1.5} />
                  <span className="text-[16px] font-medium text-[#001360] flex-1">
                    {item.label}
                  </span>
                  {item.badge && (
                    <Badge className="bg-[#eef1ff] text-[#001360] text-[16px] font-medium rounded h-[26px] px-2">
                      {item.badge}
                    </Badge>
                  )}
                  {item.subItems && (
                    <ChevronDown 
                      className={cn(
                        "h-6 w-6 text-black transition-transform",
                        isExpanded && "rotate-180"
                      )} 
                    />
                  )}
                </div>
              </Button>

              {/* Sub Items */}
              {item.subItems && isExpanded && (
                <div className="ml-6 mt-2 border-l border-[#d9e0ff] pl-[19px] space-y-2">
                  {item.subItems.map((subItem) => (
                    <Button
                      key={subItem.id}
                      variant="ghost"
                      className={cn(
                        "w-full justify-start h-auto p-2 text-left",
                        currentPage === subItem.id && "bg-[#eef1ff]"
                      )}
                      onClick={() => handleSubItemClick(subItem.id)}
                    >
                      <div className="flex items-center gap-1 w-full">
                        <span className="text-[16px] font-normal text-[#001360] flex-1">
                          {subItem.label}
                        </span>
                        {subItem.badge && (
                          <Badge className="bg-[#eef1ff] text-[#001360] text-[16px] font-medium rounded h-[26px] px-2">
                            {subItem.badge}
                          </Badge>
                        )}
                      </div>
                    </Button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}