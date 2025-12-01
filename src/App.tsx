import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Header, Navbar, Sidebar, Aside, Main } from './components/layout';
import { DateRangeFilter } from './components/common/DateRangeFilter';
import { AsideProvider, useAside } from './contexts/AsideContext';

// Terminal Pages
import { TerminalOverview } from './pages/Terminal/TerminalOverview';
import { TerminalAnalytics } from './pages/Terminal/TerminalAnalytics';
import { TerminalCompliance } from './pages/Terminal/TerminalCompliance';

// Fleet Pages
import { FleetTrucks } from './pages/Fleet/FleetTrucks';
import { FleetDrivers } from './pages/Fleet/FleetDrivers';
import { FleetTrailers } from './pages/Fleet/FleetTrailers';

// Dispatch Pages
import { DispatchLoads } from './pages/Dispatch/DispatchLoads';
import { DispatchPlanner } from './pages/Dispatch/DispatchPlanner';
import { DispatchEvents } from './pages/Dispatch/DispatchEvents';

// Reporting Pages
import { ReportingStatus } from './pages/Reporting/ReportingStatus';
import { ReportingSpill } from './pages/Reporting/ReportingSpill';

// Liquid Pages
import { LiquidTerminalOverview } from './pages/Liquid/Terminal/LiquidTerminalOverview';
import { LiquidTerminalAnalytics } from './pages/Liquid/Terminal/LiquidTerminalAnalytics';
import { LiquidFleetTankers } from './pages/Liquid/Fleet/LiquidFleetTankers';
import { LiquidFleetDrivers } from './pages/Liquid/Fleet/LiquidFleetDrivers';
import { LiquidDispatchLoads } from './pages/Liquid/Dispatch/LiquidDispatchLoads';
import { LiquidDispatchPlanner } from './pages/Liquid/Dispatch/LiquidDispatchPlanner';

// Tank Wash Pages
import { TankWashOperationsSchedule } from './pages/TankWash/Operations/TankWashOperationsSchedule';
import { TankWashOperationsQueue } from './pages/TankWash/Operations/TankWashOperationsQueue';
import { TankWashQualityInspections } from './pages/TankWash/Quality/TankWashQualityInspections';

// Maintenance Pages
import { MaintenanceFleetWorkOrders } from './pages/Maintenance/Fleet/MaintenanceFleetWorkOrders';
import { MaintenanceFleetPreventive } from './pages/Maintenance/Fleet/MaintenanceFleetPreventive';
import { MaintenanceFleetInspections } from './pages/Maintenance/Fleet/MaintenanceFleetInspections';
import { MaintenanceInventoryParts } from './pages/Maintenance/Inventory/MaintenanceInventoryParts';
import { MaintenanceInventoryStock } from './pages/Maintenance/Inventory/MaintenanceInventoryStock';
import { MaintenanceReportingCosts } from './pages/Maintenance/Reporting/MaintenanceReportingCosts';

// Quality Pages
import { QualityInspectionsOverview } from './pages/Quality/Inspections/QualityInspectionsOverview';
import { QualityInspectionsSchedule } from './pages/Quality/Inspections/QualityInspectionsSchedule';
import { QualityInspectionsReports } from './pages/Quality/Inspections/QualityInspectionsReports';
import { QualityAuditsOverview } from './pages/Quality/Audits/QualityAuditsOverview';
import { QualityAuditsFindings } from './pages/Quality/Audits/QualityAuditsFindings';
import { QualityComplianceCertifications } from './pages/Quality/Compliance/QualityComplianceCertifications';
import { QualityComplianceStandards } from './pages/Quality/Compliance/QualityComplianceStandards';

// Safety Pages
import { SafetyIncidentsOverview } from './pages/Safety/Incidents/SafetyIncidentsOverview';
import { SafetyIncidentsReports } from './pages/Safety/Incidents/SafetyIncidentsReports';
import { SafetyIncidentsInvestigations } from './pages/Safety/Incidents/SafetyIncidentsInvestigations';
import { SafetyTrainingPrograms } from './pages/Safety/Training/SafetyTrainingPrograms';
import { SafetyTrainingCertifications } from './pages/Safety/Training/SafetyTrainingCertifications';
import { SafetyComplianceOSHA } from './pages/Safety/Compliance/SafetyComplianceOSHA';
import { SafetyComplianceDOT } from './pages/Safety/Compliance/SafetyComplianceDOT';

// HR Pages
import { HREmployeesOverview } from './pages/HR/Employees/HREmployeesOverview';
import { HREmployeesDirectory } from './pages/HR/Employees/HREmployeesDirectory';
import { HREmployeesOnboarding } from './pages/HR/Employees/HREmployeesOnboarding';
import { HRTimeTimesheets } from './pages/HR/Time/HRTimeTimesheets';
import { HRTimeSchedules } from './pages/HR/Time/HRTimeSchedules';
import { HRPayrollProcessing } from './pages/HR/Payroll/HRPayrollProcessing';
import { HRPayrollReports } from './pages/HR/Payroll/HRPayrollReports';

// Finance Pages
import { FinanceAccountsReceivable } from './pages/Finance/Accounts/FinanceAccountsReceivable';
import { FinanceAccountsPayable } from './pages/Finance/Accounts/FinanceAccountsPayable';
import { FinanceReportingOverview } from './pages/Finance/Reporting/FinanceReportingOverview';
import { FinanceReportingPandL } from './pages/Finance/Reporting/FinanceReportingPandL';
import { FinanceReportingBalanceSheet } from './pages/Finance/Reporting/FinanceReportingBalanceSheet';
import { FinanceBudgetingBudget } from './pages/Finance/Budgeting/FinanceBudgetingBudget';
import { FinanceBudgetingForecasting } from './pages/Finance/Budgeting/FinanceBudgetingForecasting';

// Account Pages
import { AccountProfile } from './pages/Account/AccountProfile';
import { AccountSettings } from './pages/Account/AccountSettings';

// Help Pages
import { HelpDocumentation } from './pages/Help/HelpDocumentation';
import { HelpSupport } from './pages/Help/HelpSupport';
import { HelpFeedback } from './pages/Help/HelpFeedback';

// My Dashboard - Personalized landing page
import { MyDashboard } from './pages/MyDashboard';
import { Calendar } from './pages/MyDashboard/Calendar';
import { Tasks } from './pages/MyDashboard/Tasks';
import { HomeTime } from './pages/MyDashboard/HomeTime';
import { Training } from './pages/MyDashboard/Training';
import { Benefits } from './pages/MyDashboard/Benefits';
import { CompanyCard } from './pages/MyDashboard/CompanyCard';

// Dashboard Overview Pages
import { DryBulkOverview } from './pages/DryBulk/DryBulkOverview';
import { LiquidOverview } from './pages/Liquid/LiquidOverview';
import { TankWashOverview } from './pages/TankWash/TankWashOverview';
import { MaintenanceOverview } from './pages/Maintenance/MaintenanceOverview';
import { QualityOverview } from './pages/Quality/QualityOverview';
import { SafetyOverview } from './pages/Safety/SafetyOverview';
import { HROverview } from './pages/HR/HROverview';
import { FinanceOverview } from './pages/Finance/FinanceOverview';

function AppContent() {
  const { asideContent } = useAside();
  const [activeDashboard, setActiveDashboard] = useState(() => {
    // Determine active dashboard from URL path
    const path = window.location.hash.slice(1); // Remove # from hash
    if (path.startsWith('/drybulk')) return 'drybulk';
    if (path.startsWith('/liquid')) return 'liquid';
    if (path.startsWith('/tankwash')) return 'tankwash';
    if (path.startsWith('/maintenance')) return 'maintenance';
    if (path.startsWith('/quality')) return 'quality';
    if (path.startsWith('/safety')) return 'safety';
    if (path.startsWith('/hr')) return 'hr';
    if (path.startsWith('/finance')) return 'finance';
    return 'mydashboard';
  });
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    // Open by default on desktop (769px+), closed on mobile/tablet
    return window.innerWidth >= 769;
  });
  const [asideOpen, setAsideOpen] = useState(() => {
    // Open by default on laptop/larger screens (1024px+)
    return window.innerWidth >= 1024;
  });
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as 'light' | 'dark') || 'light';
  });

  // Update active dashboard when URL changes
  useEffect(() => {
    const handleHashChange = () => {
      const path = window.location.hash.slice(1);
      if (path.startsWith('/drybulk')) setActiveDashboard('drybulk');
      else if (path.startsWith('/liquid')) setActiveDashboard('liquid');
      else if (path.startsWith('/tankwash')) setActiveDashboard('tankwash');
      else if (path.startsWith('/maintenance')) setActiveDashboard('maintenance');
      else if (path.startsWith('/quality')) setActiveDashboard('quality');
      else if (path.startsWith('/safety')) setActiveDashboard('safety');
      else if (path.startsWith('/hr')) setActiveDashboard('hr');
      else if (path.startsWith('/finance')) setActiveDashboard('finance');
      else setActiveDashboard('mydashboard');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
  };

  // Example actions - these would change based on current page/context
  const exampleActions = [
    {
      id: 'add',
      label: 'Add New',
      icon: '➕',
      onClick: () => console.log('Add clicked'),
      variant: 'primary' as const,
    },
    {
      id: 'filter',
      label: 'Filter',
      icon: '🔽',
      onClick: () => console.log('Filter clicked'),
    },
    {
      id: 'export',
      label: 'Export',
      icon: '📥',
      onClick: () => console.log('Export clicked'),
    },
  ];

  return (
    <div className="app">
        <Header onThemeChange={handleThemeChange} />
        <Navbar
          onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
          onAsideToggle={() => setAsideOpen(!asideOpen)}
          sidebarOpen={sidebarOpen}
          asideOpen={asideOpen}
          actions={exampleActions}
          dateFilter={<DateRangeFilter />}
        />
        <Sidebar 
          isOpen={sidebarOpen} 
          isCollapsed={!sidebarOpen} 
          onMobileClose={() => setSidebarOpen(false)}
          activeDashboard={activeDashboard}
          onDashboardChange={setActiveDashboard}
        />
        <Main sidebarOpen={sidebarOpen} asideOpen={asideOpen}>
          <Routes>
            {/* My Dashboard - Personalized landing page */}
            <Route path="/" element={<MyDashboard />} />
            <Route path="/mydashboard/calendar" element={<Calendar />} />
            <Route path="/mydashboard/tasks" element={<Tasks />} />
            <Route path="/mydashboard/home-time" element={<HomeTime />} />
            <Route path="/mydashboard/training" element={<Training />} />
            <Route path="/mydashboard/benefits" element={<Benefits />} />
            <Route path="/mydashboard/company-card" element={<CompanyCard />} />
            
            {/* Dashboard Overview Routes */}
            <Route path="/drybulk/overview" element={<DryBulkOverview />} />
            <Route path="/liquid/overview" element={<LiquidOverview />} />
            <Route path="/tankwash/overview" element={<TankWashOverview />} />
            <Route path="/maintenance/overview" element={<MaintenanceOverview />} />
            <Route path="/quality/overview" element={<QualityOverview />} />
            <Route path="/safety/overview" element={<SafetyOverview />} />
            <Route path="/hr/overview" element={<HROverview />} />
            <Route path="/finance/overview" element={<FinanceOverview />} />
            
            {/* Dry Bulk Routes */}
            <Route path="/drybulk/terminal/overview" element={<TerminalOverview />} />
            <Route path="/drybulk/terminal/analytics" element={<TerminalAnalytics />} />
            <Route path="/drybulk/terminal/compliance" element={<TerminalCompliance />} />
            
            <Route path="/drybulk/fleet/trucks" element={<FleetTrucks />} />
            <Route path="/drybulk/fleet/drivers" element={<FleetDrivers />} />
            <Route path="/drybulk/fleet/trailers" element={<FleetTrailers />} />
            
            <Route path="/drybulk/dispatch/loads" element={<DispatchLoads />} />
            <Route path="/drybulk/dispatch/planner" element={<DispatchPlanner />} />
            <Route path="/drybulk/dispatch/events" element={<DispatchEvents />} />
            
            <Route path="/drybulk/reporting/dry-bulk" element={<DryBulkOverview />} />
            <Route path="/drybulk/reporting/status" element={<ReportingStatus />} />
            <Route path="/drybulk/reporting/spill" element={<ReportingSpill />} />
            
            {/* Liquid Routes */}
            <Route path="/liquid/terminal/overview" element={<LiquidTerminalOverview />} />
            <Route path="/liquid/terminal/analytics" element={<LiquidTerminalAnalytics />} />
            <Route path="/liquid/fleet/tankers" element={<LiquidFleetTankers />} />
            <Route path="/liquid/fleet/drivers" element={<LiquidFleetDrivers />} />
            <Route path="/liquid/dispatch/loads" element={<LiquidDispatchLoads />} />
            <Route path="/liquid/dispatch/planner" element={<LiquidDispatchPlanner />} />
            
            {/* Tank Wash Routes */}
            <Route path="/tankwash/operations/schedule" element={<TankWashOperationsSchedule />} />
            <Route path="/tankwash/operations/queue" element={<TankWashOperationsQueue />} />
            <Route path="/tankwash/quality/inspections" element={<TankWashQualityInspections />} />
            
            {/* Maintenance Routes */}
            <Route path="/maintenance/fleet/work-orders" element={<MaintenanceFleetWorkOrders />} />
            <Route path="/maintenance/fleet/preventive" element={<MaintenanceFleetPreventive />} />
            <Route path="/maintenance/fleet/inspections" element={<MaintenanceFleetInspections />} />
            <Route path="/maintenance/inventory/parts" element={<MaintenanceInventoryParts />} />
            <Route path="/maintenance/inventory/stock" element={<MaintenanceInventoryStock />} />
            <Route path="/maintenance/reporting/costs" element={<MaintenanceReportingCosts />} />
            
            {/* Quality Routes */}
            <Route path="/quality/inspections/overview" element={<QualityInspectionsOverview />} />
            <Route path="/quality/inspections/schedule" element={<QualityInspectionsSchedule />} />
            <Route path="/quality/inspections/reports" element={<QualityInspectionsReports />} />
            <Route path="/quality/audits/overview" element={<QualityAuditsOverview />} />
            <Route path="/quality/audits/findings" element={<QualityAuditsFindings />} />
            <Route path="/quality/compliance/certifications" element={<QualityComplianceCertifications />} />
            <Route path="/quality/compliance/standards" element={<QualityComplianceStandards />} />
            
            {/* Safety Routes */}
            <Route path="/safety/incidents/overview" element={<SafetyIncidentsOverview />} />
            <Route path="/safety/incidents/reports" element={<SafetyIncidentsReports />} />
            <Route path="/safety/incidents/investigations" element={<SafetyIncidentsInvestigations />} />
            <Route path="/safety/training/programs" element={<SafetyTrainingPrograms />} />
            <Route path="/safety/training/certifications" element={<SafetyTrainingCertifications />} />
            <Route path="/safety/compliance/osha" element={<SafetyComplianceOSHA />} />
            <Route path="/safety/compliance/dot" element={<SafetyComplianceDOT />} />
            
            {/* HR Routes */}
            <Route path="/hr/employees/overview" element={<HREmployeesOverview />} />
            <Route path="/hr/employees/directory" element={<HREmployeesDirectory />} />
            <Route path="/hr/employees/onboarding" element={<HREmployeesOnboarding />} />
            <Route path="/hr/time/timesheets" element={<HRTimeTimesheets />} />
            <Route path="/hr/time/schedules" element={<HRTimeSchedules />} />
            <Route path="/hr/payroll/processing" element={<HRPayrollProcessing />} />
            <Route path="/hr/payroll/reports" element={<HRPayrollReports />} />
            
            {/* Finance Routes */}
            <Route path="/finance/accounts/receivable" element={<FinanceAccountsReceivable />} />
            <Route path="/finance/accounts/payable" element={<FinanceAccountsPayable />} />
            <Route path="/finance/reporting/overview" element={<FinanceReportingOverview />} />
            <Route path="/finance/reporting/p-and-l" element={<FinanceReportingPandL />} />
            <Route path="/finance/reporting/balance-sheet" element={<FinanceReportingBalanceSheet />} />
            <Route path="/finance/budgeting/budget" element={<FinanceBudgetingBudget />} />
            <Route path="/finance/budgeting/forecasting" element={<FinanceBudgetingForecasting />} />
            
            {/* Account Routes */}
            <Route path="/account/profile" element={<AccountProfile />} />
            <Route path="/account/settings" element={<AccountSettings />} />
            
            {/* Help Routes */}
            <Route path="/help/documentation" element={<HelpDocumentation />} />
            <Route path="/help/support" element={<HelpSupport />} />
            <Route path="/help/feedback" element={<HelpFeedback />} />
          </Routes>
        </Main>
        <Aside isOpen={asideOpen}>{asideContent}</Aside>
      </div>
  );
}

function App() {
  return (
    <Router>
      <AsideProvider>
        <AppContent />
      </AsideProvider>
    </Router>
  );
}

export default App;
