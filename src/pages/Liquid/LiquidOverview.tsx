import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/pages/DashboardOverview.css';

export const LiquidOverview: React.FC = () => {
  return (
    <div className="dashboard-overview">
      <div className="dashboard-overview__header">
        <h1 className="dashboard-overview__title">Liquid Operations</h1>
        <p className="dashboard-overview__subtitle">Manage liquid terminal operations, tanker fleet, and dispatch</p>
      </div>

      <div className="dashboard-overview__grid">
        {/* Terminal Section */}
        <div className="overview-section">
          <div className="overview-section__header">
            <h2 className="overview-section__title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <path d="M3 9h18M9 21V9"/>
              </svg>
              Terminal
            </h2>
          </div>
          <div className="overview-cards">
            <Link to="/liquid/terminal/overview" className="overview-card">
              <h3 className="overview-card__title">Overview</h3>
              <p className="overview-card__description">Liquid terminal operations dashboard</p>
            </Link>
            <Link to="/liquid/terminal/analytics" className="overview-card">
              <h3 className="overview-card__title">Analytics</h3>
              <p className="overview-card__description">Performance metrics and insights</p>
            </Link>
          </div>
        </div>

        {/* Fleet Section */}
        <div className="overview-section">
          <div className="overview-section__header">
            <h2 className="overview-section__title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="1" y="3" width="15" height="13"/>
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                <circle cx="5.5" cy="18.5" r="2.5"/>
                <circle cx="18.5" cy="18.5" r="2.5"/>
              </svg>
              Fleet
            </h2>
          </div>
          <div className="overview-cards">
            <Link to="/liquid/fleet/tankers" className="overview-card">
              <h3 className="overview-card__title">Tankers</h3>
              <p className="overview-card__description">Tanker fleet management and status</p>
            </Link>
            <Link to="/liquid/fleet/drivers" className="overview-card">
              <h3 className="overview-card__title">Drivers</h3>
              <p className="overview-card__description">Driver schedules and certifications</p>
            </Link>
          </div>
        </div>

        {/* Dispatch Section */}
        <div className="overview-section">
          <div className="overview-section__header">
            <h2 className="overview-section__title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                <line x1="12" y1="22.08" x2="12" y2="12"/>
              </svg>
              Dispatch
            </h2>
          </div>
          <div className="overview-cards">
            <Link to="/liquid/dispatch/loads" className="overview-card">
              <h3 className="overview-card__title">Loads</h3>
              <p className="overview-card__description">Active liquid load management</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
