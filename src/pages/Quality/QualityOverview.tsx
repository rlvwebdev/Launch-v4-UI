import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/pages/DashboardOverview.css';

export const QualityOverview: React.FC = () => {
  return (
    <div className="dashboard-overview">
      <div className="dashboard-overview__header">
        <h1 className="dashboard-overview__title">Quality Management</h1>
        <p className="dashboard-overview__subtitle">Manage quality control, inspections, and compliance</p>
      </div>

      <div className="dashboard-overview__grid">
        {/* Inspections Section */}
        <div className="overview-section">
          <div className="overview-section__header">
            <h2 className="overview-section__title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <path d="M22 4L12 14.01l-3-3"/>
              </svg>
              Inspections
            </h2>
          </div>
          <div className="overview-cards">
            <Link to="/quality/inspections/schedule" className="overview-card">
              <h3 className="overview-card__title">Schedule</h3>
              <p className="overview-card__description">Inspection scheduling</p>
            </Link>
            <Link to="/quality/inspections/results" className="overview-card">
              <h3 className="overview-card__title">Results</h3>
              <p className="overview-card__description">Inspection reports and findings</p>
            </Link>
            <Link to="/quality/inspections/audits" className="overview-card">
              <h3 className="overview-card__title">Audits</h3>
              <p className="overview-card__description">Quality audit tracking</p>
            </Link>
          </div>
        </div>

        {/* Standards Section */}
        <div className="overview-section">
          <div className="overview-section__header">
            <h2 className="overview-section__title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
              </svg>
              Standards
            </h2>
          </div>
          <div className="overview-cards">
            <Link to="/quality/standards/compliance" className="overview-card">
              <h3 className="overview-card__title">Compliance</h3>
              <p className="overview-card__description">Standards compliance tracking</p>
            </Link>
            <Link to="/quality/standards/documentation" className="overview-card">
              <h3 className="overview-card__title">Documentation</h3>
              <p className="overview-card__description">Quality documentation</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
