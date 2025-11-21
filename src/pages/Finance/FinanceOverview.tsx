import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/pages/DashboardOverview.css';

export const FinanceOverview: React.FC = () => {
  return (
    <div className="dashboard-overview">
      <div className="dashboard-overview__header">
        <h1 className="dashboard-overview__title">Finance & Accounting</h1>
        <p className="dashboard-overview__subtitle">Manage financial operations, billing, and reporting</p>
      </div>

      <div className="dashboard-overview__grid">
        {/* Accounts Section */}
        <div className="overview-section">
          <div className="overview-section__header">
            <h2 className="overview-section__title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="1" x2="12" y2="23"/>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
              Accounts
            </h2>
          </div>
          <div className="overview-cards">
            <Link to="/finance/accounts/receivable" className="overview-card">
              <h3 className="overview-card__title">Accounts Receivable</h3>
              <p className="overview-card__description">Customer invoicing and payments</p>
            </Link>
            <Link to="/finance/accounts/payable" className="overview-card">
              <h3 className="overview-card__title">Accounts Payable</h3>
              <p className="overview-card__description">Vendor bills and payments</p>
            </Link>
            <Link to="/finance/accounts/general" className="overview-card">
              <h3 className="overview-card__title">General Ledger</h3>
              <p className="overview-card__description">Chart of accounts and entries</p>
            </Link>
          </div>
        </div>

        {/* Billing Section */}
        <div className="overview-section">
          <div className="overview-section__header">
            <h2 className="overview-section__title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
              </svg>
              Billing
            </h2>
          </div>
          <div className="overview-cards">
            <Link to="/finance/billing/invoices" className="overview-card">
              <h3 className="overview-card__title">Invoices</h3>
              <p className="overview-card__description">Invoice generation and tracking</p>
            </Link>
            <Link to="/finance/billing/rates" className="overview-card">
              <h3 className="overview-card__title">Rates</h3>
              <p className="overview-card__description">Rate management</p>
            </Link>
          </div>
        </div>

        {/* Reports Section */}
        <div className="overview-section">
          <div className="overview-section__header">
            <h2 className="overview-section__title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="20" x2="18" y2="10"/>
                <line x1="12" y1="20" x2="12" y2="4"/>
                <line x1="6" y1="20" x2="6" y2="14"/>
              </svg>
              Reports
            </h2>
          </div>
          <div className="overview-cards">
            <Link to="/finance/reports/profit-loss" className="overview-card">
              <h3 className="overview-card__title">Profit & Loss</h3>
              <p className="overview-card__description">P&L statements</p>
            </Link>
            <Link to="/finance/reports/balance-sheet" className="overview-card">
              <h3 className="overview-card__title">Balance Sheet</h3>
              <p className="overview-card__description">Balance sheet reports</p>
            </Link>
            <Link to="/finance/reports/cash-flow" className="overview-card">
              <h3 className="overview-card__title">Cash Flow</h3>
              <p className="overview-card__description">Cash flow analysis</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
