import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Header, Navbar, Sidebar, Aside, Main } from './components/layout';
import { DateRangeFilter } from './components/common/DateRangeFilter';

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
import { ReportingDryBulk } from './pages/Reporting/ReportingDryBulk';
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

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [asideOpen, setAsideOpen] = useState(() => {
    // Open by default on laptop/larger screens (1024px+)
    return window.innerWidth >= 1024;
  });
  const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as 'light' | 'dark' | 'auto') || 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    
    if (theme === 'auto') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    } else {
      root.setAttribute('data-theme', theme);
    }
    
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'auto') => {
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
    <Router>
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
        <Sidebar isOpen={sidebarOpen} isCollapsed={!sidebarOpen} />
        <Main sidebarOpen={sidebarOpen} asideOpen={asideOpen}>
          <Routes>
            <Route path="/terminal/overview" element={<TerminalOverview />} />
            <Route path="/terminal/analytics" element={<TerminalAnalytics />} />
            <Route path="/terminal/compliance" element={<TerminalCompliance />} />
            
            <Route path="/fleet/trucks" element={<FleetTrucks />} />
            <Route path="/fleet/drivers" element={<FleetDrivers />} />
            <Route path="/fleet/trailers" element={<FleetTrailers />} />
            
            <Route path="/dispatch/loads" element={<DispatchLoads />} />
            <Route path="/dispatch/planner" element={<DispatchPlanner />} />
            <Route path="/dispatch/events" element={<DispatchEvents />} />
            
            <Route path="/reporting/dry-bulk" element={<ReportingDryBulk />} />
            <Route path="/reporting/status" element={<ReportingStatus />} />
            <Route path="/reporting/spill" element={<ReportingSpill />} />
            
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
            
            <Route path="/" element={<TerminalOverview />} />
          </Routes>
        </Main>
        <Aside isOpen={asideOpen} />
      </div>
    </Router>
  );
}

export default App;
