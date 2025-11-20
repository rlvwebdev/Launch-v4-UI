import React from 'react';
import './FinanceAccountsReceivable.css';

export const FinanceAccountsReceivable: React.FC = () => {
  return (
    <>
      <hgroup>
        <div className="hgroup__content">
          <h1>Accounts Receivable</h1>
          <h3>Track customer payments and outstanding invoices</h3>
        </div>
      </hgroup>
      <div className="page finance-accounts-receivable">
        <section className="receivable-section">
          <h2>AR Management</h2>
          <p>Monitor customer invoices, payment status, aging reports, and collection activities.</p>
        </section>
      </div>
    </>
  );
};

export default FinanceAccountsReceivable;
