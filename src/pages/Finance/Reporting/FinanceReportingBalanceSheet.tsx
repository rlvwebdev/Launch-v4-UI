import React from 'react';
import './FinanceReportingBalanceSheet.css';

export const FinanceReportingBalanceSheet: React.FC = () => {
  return (
    <>
      <hgroup>
        <div className="hgroup__content">
          <h1>Balance Sheet</h1>
          <h3>View assets, liabilities, and equity position</h3>
        </div>
      </hgroup>
      <div className="page finance-reporting-balance-sheet">
        <section className="balance-sheet-section">
          <h2>Financial Position</h2>
          <p>Review balance sheet showing company assets, liabilities, and shareholder equity at a specific point in time.</p>
        </section>
      </div>
    </>
  );
};

export default FinanceReportingBalanceSheet;
