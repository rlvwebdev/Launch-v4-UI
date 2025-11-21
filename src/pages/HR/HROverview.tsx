import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/pages/DashboardOverview.css';

export const HROverview: React.FC = () => {
  return (
    <div className="dashboard-overview">
      <div className="dashboard-overview__header">
        <h1 className="dashboard-overview__title">Human Resources</h1>
        <p className="dashboard-overview__subtitle">Manage employees, payroll, and HR processes</p>
      </div>

      <div className="dashboard-overview__grid">
        {/* Employees Section */}
        <div className="overview-section">
          <div className="overview-section__header">
            <h2 className="overview-section__title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              Employees
            </h2>
          </div>
          <div className="overview-cards">
            <Link to="/hr/employees/directory" className="overview-card">
              <h3 className="overview-card__title">Directory</h3>
              <p className="overview-card__description">Employee directory and profiles</p>
            </Link>
            <Link to="/hr/employees/onboarding" className="overview-card">
              <h3 className="overview-card__title">Onboarding</h3>
              <p className="overview-card__description">New employee onboarding</p>
            </Link>
            <Link to="/hr/employees/performance" className="overview-card">
              <h3 className="overview-card__title">Performance</h3>
              <p className="overview-card__description">Performance reviews</p>
            </Link>
          </div>
        </div>

        {/* Payroll Section */}
        <div className="overview-section">
          <div className="overview-section__header">
            <h2 className="overview-section__title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="1" x2="12" y2="23"/>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
              Payroll
            </h2>
          </div>
          <div className="overview-cards">
            <Link to="/hr/payroll/processing" className="overview-card">
              <h3 className="overview-card__title">Processing</h3>
              <p className="overview-card__description">Payroll processing</p>
            </Link>
            <Link to="/hr/payroll/timesheets" className="overview-card">
              <h3 className="overview-card__title">Timesheets</h3>
              <p className="overview-card__description">Time tracking and approval</p>
            </Link>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="overview-section">
          <div className="overview-section__header">
            <h2 className="overview-section__title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              Benefits
            </h2>
          </div>
          <div className="overview-cards">
            <Link to="/hr/benefits/enrollment" className="overview-card">
              <h3 className="overview-card__title">Enrollment</h3>
              <p className="overview-card__description">Benefits enrollment</p>
            </Link>
            <Link to="/hr/benefits/management" className="overview-card">
              <h3 className="overview-card__title">Management</h3>
              <p className="overview-card__description">Benefits administration</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
