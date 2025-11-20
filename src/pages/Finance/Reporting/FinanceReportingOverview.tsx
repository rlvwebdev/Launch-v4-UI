import React from 'react';
import './FinanceReportingOverview.css';

export const FinanceReportingOverview: React.FC = () => {
  return (
    <>
      <hgroup>
        <div className="hgroup__content">
          <h1>Financial Reporting Overview</h1>
          <h3>Comprehensive financial performance dashboard</h3>
        </div>
      </hgroup>
      <div className="page finance-reporting-overview">
        <section className="overview-section">
          <h2>Financial Dashboard</h2>
          <p>View key financial metrics including revenue, expenses, profitability, and cash position.</p>
        </section>
      </div>
    </>
  );
};

export default FinanceReportingOverview;
