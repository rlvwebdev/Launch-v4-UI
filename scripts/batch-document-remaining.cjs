#!/usr/bin/env node

/**
 * Batch CSS Documentation Script - Remaining Files
 * Documents all remaining CSS files that don't have documentation headers
 */

const { execSync } = require('child_process');
const path = require('path');

const filesToDocument = [
  'src/pages/Dispatch/DispatchEvents.css',
  'src/pages/Finance/Accounts/FinanceAccountsPayable.css',
  'src/pages/Finance/Accounts/FinanceAccountsReceivable.css',
  'src/pages/Finance/Budgeting/FinanceBudgetingBudget.css',
  'src/pages/Finance/Budgeting/FinanceBudgetingForecasting.css',
  'src/pages/Finance/Reporting/FinanceReportingBalanceSheet.css',
  'src/pages/Finance/Reporting/FinanceReportingOverview.css',
  'src/pages/Finance/Reporting/FinanceReportingPandL.css',
  'src/pages/Fleet/FleetTrailers.css',
  'src/pages/HR/Employees/HREmployeesDirectory.css',
  'src/pages/HR/Employees/HREmployeesOnboarding.css',
  'src/pages/HR/Employees/HREmployeesOverview.css',
  'src/pages/HR/Payroll/HRPayrollProcessing.css',
  'src/pages/HR/Payroll/HRPayrollReports.css',
  'src/pages/HR/Time/HRTimeSchedules.css',
  'src/pages/HR/Time/HRTimeTimesheets.css',
  'src/pages/Help/HelpFeedback.css',
  'src/pages/Help/HelpSupport.css',
  'src/pages/Liquid/Dispatch/LiquidDispatchLoads.css',
  'src/pages/Liquid/Dispatch/LiquidDispatchPlanner.css',
  'src/pages/Liquid/Fleet/LiquidFleetDrivers.css',
  'src/pages/Liquid/Fleet/LiquidFleetTankers.css',
  'src/pages/Liquid/Terminal/LiquidTerminalAnalytics.css',
  'src/pages/Liquid/Terminal/LiquidTerminalOverview.css',
  'src/pages/Maintenance/Fleet/MaintenanceFleetInspections.css',
  'src/pages/Maintenance/Fleet/MaintenanceFleetPreventive.css',
  'src/pages/Maintenance/Fleet/MaintenanceFleetWorkOrders.css',
  'src/pages/Maintenance/Inventory/MaintenanceInventoryParts.css',
  'src/pages/Maintenance/Inventory/MaintenanceInventoryStock.css',
  'src/pages/Maintenance/Reporting/MaintenanceReportingCosts.css',
  'src/pages/Quality/Audits/QualityAuditsFindings.css',
  'src/pages/Quality/Audits/QualityAuditsOverview.css',
  'src/pages/Quality/Compliance/QualityComplianceCertifications.css',
  'src/pages/Quality/Compliance/QualityComplianceStandards.css',
  'src/pages/Quality/Inspections/QualityInspectionsOverview.css',
  'src/pages/Quality/Inspections/QualityInspectionsReports.css',
  'src/pages/Quality/Inspections/QualityInspectionsSchedule.css',
  'src/pages/Reporting/ReportingDryBulk.css',
  'src/pages/Reporting/ReportingSpill.css',
  'src/pages/Safety/Compliance/SafetyComplianceDOT.css',
  'src/pages/Safety/Compliance/SafetyComplianceOSHA.css',
  'src/pages/Safety/Incidents/SafetyIncidentsInvestigations.css',
  'src/pages/Safety/Incidents/SafetyIncidentsOverview.css',
  'src/pages/Safety/Incidents/SafetyIncidentsReports.css',
  'src/pages/Safety/Training/SafetyTrainingCertifications.css',
  'src/pages/Safety/Training/SafetyTrainingPrograms.css',
  'src/pages/TankWash/Operations/TankWashOperationsQueue.css',
  'src/pages/TankWash/Operations/TankWashOperationsSchedule.css',
  'src/pages/TankWash/Quality/TankWashQualityInspections.css',
  'src/pages/Terminal/TerminalAnalytics.css',
  'src/pages/Terminal/TerminalCompliance.css',
  'src/styles/pages/DashboardOverview.css',
  'src/styles/pages/DryBulkDaily.css',
];

console.log('📝 Documenting remaining CSS files...\n');

let documented = 0;
let skipped = 0;
let errors = 0;

for (const file of filesToDocument) {
  try {
    const result = execSync(
      `node scripts/css-doc-template.cjs "${file}"`,
      { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] }
    );
    
    if (result.includes('✅')) {
      console.log(`✅ ${file}`);
      documented++;
    } else if (result.includes('⏭️')) {
      console.log(`⏭️  ${file}`);
      skipped++;
    }
  } catch (error) {
    console.log(`❌ ${file}`);
    errors++;
  }
}

console.log('\n=====================================');
console.log('📊 Batch Documentation Complete');
console.log('=====================================');
console.log(`✅ Documented: ${documented}`);
console.log(`⏭️  Skipped: ${skipped}`);
console.log(`❌ Errors: ${errors}`);
console.log(`📁 Total: ${filesToDocument.length}`);
console.log('\n💡 Tip: Check .backup files if you need to restore originals');
