import React from 'react';
import './FinanceReportingPandL.css';

export const FinanceReportingPandL: React.FC = () => {
  return (
    <>
      <hgroup>
        <div className="hgroup__content">
          <h1>Profit & Loss Statements</h1>
          <h3>Analyze revenue and expense performance</h3>
        </div>
      </hgroup>
      <div className="page finance-reporting-pandl">
        <section className="pandl-section">
          <h2>P&L Analysis</h2>
          <p>Generate and review profit and loss statements showing revenue, cost of goods sold, operating expenses, and net income.</p>
        </section>
      </div>
    </>
  );
};

export default FinanceReportingPandL;
