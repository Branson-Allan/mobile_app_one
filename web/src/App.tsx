import React from 'react';
import { SalesProvider, useSales } from './context/SalesContext';
import { ResponsiveShell } from './components/navigation/ResponsiveShell';
import { DashboardScreen } from './screens/DashboardScreen';
import { LeadsScreen } from './screens/LeadsScreen';
import { LeadCaptureScreen } from './screens/LeadCaptureScreen';
import { Customer360Screen } from './screens/Customer360Screen';
import { LeadDetailsScreen } from './screens/LeadDetailsScreen';
import { LoginScreen } from './screens/LoginScreen';
import { SettingsScreen } from './screens/SettingsScreen';

// Overlays & Bottom Sheets
import { LeadActionsSheet } from './components/sheets/LeadActionsSheet';
import { UpdateStatusSheet } from './components/sheets/UpdateStatusSheet';
import { ReassignLeadSheet } from './components/sheets/ReassignLeadSheet';
import { ScheduleMeetingSheet } from './components/sheets/ScheduleMeetingSheet';
import { FilterSheet } from './components/sheets/FilterSheet';
import { SortSheet } from './components/sheets/SortSheet';

const ScreenRouter: React.FC = () => {
  const { activeScreen } = useSales();

  const renderScreen = () => {
    switch (activeScreen) {
      case 'dashboard':
        return <DashboardScreen />;
      case 'leads':
        return <LeadsScreen />;
      case 'lead-capture':
        return <LeadCaptureScreen />;
      case 'customer-360':
        return <Customer360Screen />;
      case 'lead-details':
        return <LeadDetailsScreen />;
      case 'settings':
        return <SettingsScreen />;
      case 'login':
        return <LoginScreen />;
      default:
        return <DashboardScreen />;
    }
  };

  return (
    <ResponsiveShell>
      {renderScreen()}

      {/* Global Overlays & Bottom Sheets */}
      <LeadActionsSheet />
      <UpdateStatusSheet />
      <ReassignLeadSheet />
      <ScheduleMeetingSheet />
      <FilterSheet />
      <SortSheet />
    </ResponsiveShell>
  );
};

export const App: React.FC = () => {
  return (
    <SalesProvider>
      <ScreenRouter />
    </SalesProvider>
  );
};

export default App;
