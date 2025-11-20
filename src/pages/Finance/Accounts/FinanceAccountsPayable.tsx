import React from 'react';
import './FinanceAccountsPayable.css';

export const FinanceAccountsPayable: React.FC = () => {
  return (
    <>
      <hgroup>
        <div className="hgroup__content">
          <h1>Accounts Payable</h1>
          <h3>Manage vendor payments and outstanding bills</h3>
        </div>
      </hgroup>
      <div className="page finance-accounts-payable">
        <section className="payable-section">
          <h2>AP Management</h2>
          <p>Track vendor invoices, schedule payments, and monitor outstanding payables and cash flow.</p>
        </section>
      </div>
    </>
  );
};

export default FinanceAccountsPayable;
