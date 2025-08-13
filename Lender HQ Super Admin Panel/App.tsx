import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { MerchantManagement } from './components/MerchantManagement';
import { KYCReview } from './components/KYCReview';
import { WhiteLabelSettings } from './components/WhiteLabelSettings';
import { NotificationTemplates } from './components/NotificationTemplates';
import { PlansAndBilling } from './components/PlansAndBilling';
import { APIMonitor } from './components/APIMonitor';
import { SystemAlerts } from './components/SystemAlerts';
import { AdminUserManagement } from './components/AdminUserManagement';
import { SupportTickets } from './components/SupportTickets';
import { AuditLogs } from './components/AuditLogs';
import { SystemConfigurations } from './components/SystemConfigurations';

type PageType = 'dashboard' | 'merchants' | 'kyc' | 'whitelabel' | 'notifications' | 'billing' | 'api' | 'alerts' | 'users' | 'support' | 'audit' | 'config';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'merchants':
        return <MerchantManagement />;
      case 'kyc':
        return <KYCReview />;
      case 'whitelabel':
        return <WhiteLabelSettings />;
      case 'notifications':
        return <NotificationTemplates />;
      case 'billing':
        return <PlansAndBilling />;
      case 'api':
        return <APIMonitor />;
      case 'alerts':
        return <SystemAlerts />;
      case 'users':
        return <AdminUserManagement />;
      case 'support':
        return <SupportTickets />;
      case 'audit':
        return <AuditLogs />;
      case 'config':
        return <SystemConfigurations />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      <main className="flex-1 overflow-auto">
        {renderPage()}
      </main>
    </div>
  );
}