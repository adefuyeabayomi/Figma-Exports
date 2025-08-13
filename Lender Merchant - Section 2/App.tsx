import { useState } from "react";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { DisburseApprovedLoans } from "./components/DisburseApprovedLoans";
import { DisbursementSettings } from "./components/DisbursementSettings";
import { ActiveLoans } from "./components/ActiveLoans";
import { RepaymentsCollections } from "./components/RepaymentsCollections";
import { DefaultedOverdueLoans } from "./components/DefaultedOverdueLoans";
import { PortfolioPerformance } from "./components/PortfolioPerformance";
import { FinancialReports } from "./components/FinancialReports";
import { RiskComplianceReports } from "./components/RiskComplianceReports";  
import { CustomerStatements } from "./components/CustomerStatements";
import { CreditRulesScoring } from "./components/CreditRulesScoring";
import { Notifications } from "./components/Notifications";
import { AuditLogs } from "./components/AuditLogs";
import { TeamsPermissions } from "./components/TeamsPermissions";

// Placeholder components for remaining pages
function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-medium text-gray-900">Total Loans</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">1,234</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-medium text-gray-900">Active Borrowers</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">856</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-medium text-gray-900">Pending Disbursements</h3>
          <p className="text-3xl font-bold text-yellow-600 mt-2">23</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-medium text-gray-900">Total Disbursed</h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">₦45.2M</p>
        </div>
      </div>
    </div>
  );
}

function CustomizePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">Customize</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Branding</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Logo</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <p className="text-gray-500">Upload your company logo</p>
                <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">Upload Logo</button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
              <input type="color" className="w-full h-10 rounded border" defaultValue="#0088FE" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Theme Preview</h3>
          <div className="border rounded-lg p-4 bg-gray-50">
            <p className="text-gray-600">Theme preview will be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BusinessProfilePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">Business Profile</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Business Details</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
              <input type="text" className="w-full p-2 border rounded" defaultValue="Lender Financial Services" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Registration Number</label>
              <input type="text" className="w-full p-2 border rounded" defaultValue="RC123456789" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tax ID</label>
              <input type="text" className="w-full p-2 border rounded" defaultValue="TIN987654321" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Support Email</label>
              <input type="email" className="w-full p-2 border rounded" defaultValue="support@lender.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input type="tel" className="w-full p-2 border rounded" defaultValue="+234 800 123 4567" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
              <input type="url" className="w-full p-2 border rounded" defaultValue="https://lender.com" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SystemAlertsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">System Alerts</h1>
      <div className="space-y-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div>
              <h3 className="font-medium text-green-900">All Systems Operational</h3>
              <p className="text-sm text-green-700">All services are running normally</p>
            </div>
          </div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <div>
              <h3 className="font-medium text-yellow-900">Scheduled Maintenance</h3>
              <p className="text-sm text-yellow-700">System maintenance scheduled for Sunday 2:00 AM - 4:00 AM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DataExportsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">Data Exports</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Export Data</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Dataset</label>
              <select className="w-full p-2 border rounded">
                <option>Loans</option>
                <option>Customers</option>
                <option>Payments</option>
                <option>Transactions</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Format</label>
              <select className="w-full p-2 border rounded">
                <option>CSV</option>
                <option>JSON</option>
                <option>Excel</option>
              </select>
            </div>
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Create Export
            </button>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">API Access</h3>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded">
              <h4 className="font-medium mb-2">API Key</h4>
              <code className="text-sm bg-white p-2 border rounded block">lender_api_key_xxxxxxxxxxxxx</code>
            </div>
            <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
              Generate New Key
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">{title}</h1>
      <div className="bg-white p-8 rounded-lg shadow border text-center">
        <p className="text-gray-600">This page is under development.</p>
        <p className="text-sm text-gray-500 mt-2">The {title} functionality will be available soon.</p>
      </div>
    </div>
  );
}

const pageComponents: Record<string, React.ComponentType<any>> = {
  dashboard: DashboardPage,
  'disburse-approved': DisburseApprovedLoans,
  'disbursement-settings': DisbursementSettings,
  'active-loans': ActiveLoans,
  'repayment-collections': RepaymentsCollections,
  'defaulted-loans': DefaultedOverdueLoans,
  'portfolio-performance': PortfolioPerformance,
  'financial-reports': FinancialReports,
  'risk-compliance': RiskComplianceReports,
  'customer-statements': CustomerStatements,
  'credit-rules': CreditRulesScoring,
  'notifications': Notifications,
  'audit-logs': AuditLogs,
  'teams-permissions': TeamsPermissions,
  'customize': CustomizePage,
  'business-profile': BusinessProfilePage,
  'system-alerts': SystemAlertsPage,
  'data-exports': DataExportsPage,
};

const pageTitles: Record<string, string> = {
  'create-product': 'Create Loan Product',
  'manage-product': 'Manage Loan Products',
  'kyc-review': 'KYC Review Queue',
  'borrower-directory': 'Borrower Directory',
  'new-applications': 'New Loan Applications',
  'underwriting-decisions': 'Underwriting Decisions',
};

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');

  const renderPage = () => {
    const PageComponent = pageComponents[currentPage];
    if (PageComponent) {
      return <PageComponent />;
    }
    
    const title = pageTitles[currentPage] || 'Page Not Found';
    return <PlaceholderPage title={title} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header onSearchChange={setSearchTerm} />
      <div className="flex flex-1">
        <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
        <main className="flex-1 min-h-0 overflow-y-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}