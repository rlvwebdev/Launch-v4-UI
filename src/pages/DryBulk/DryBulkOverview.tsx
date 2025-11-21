import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/pages/DashboardOverview.css';

export const DryBulkOverview: React.FC = () => {
  return (
    <div className="dashboard-overview">
      <div className="dashboard-overview__header">
        <h1 className="dashboard-overview__title">Dry Bulk Operations</h1>
        <p className="dashboard-overview__subtitle">Manage terminal operations, fleet, dispatch, and reporting</p>
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
            <Link to="/drybulk/terminal/overview" className="overview-card">
              <h3 className="overview-card__title">Overview</h3>
              <p className="overview-card__description">Terminal operations dashboard and metrics</p>
            </Link>
            <Link to="/drybulk/terminal/analytics" className="overview-card">
              <h3 className="overview-card__title">Analytics</h3>
              <p className="overview-card__description">Performance data and insights</p>
            </Link>
            <Link to="/drybulk/terminal/compliance" className="overview-card">
              <h3 className="overview-card__title">Compliance</h3>
              <p className="overview-card__description">Regulatory and safety compliance</p>
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
            <Link to="/drybulk/fleet/trucks" className="overview-card">
              <h3 className="overview-card__title">Trucks</h3>
              <p className="overview-card__description">Truck fleet management and status</p>
            </Link>
            <Link to="/drybulk/fleet/drivers" className="overview-card">
              <h3 className="overview-card__title">Drivers</h3>
              <p className="overview-card__description">Driver schedules and assignments</p>
            </Link>
            <Link to="/drybulk/fleet/trailers" className="overview-card">
              <h3 className="overview-card__title">Trailers</h3>
              <p className="overview-card__description">Trailer inventory and tracking</p>
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
            <Link to="/drybulk/dispatch/loads" className="overview-card">
              <h3 className="overview-card__title">Loads</h3>
              <p className="overview-card__description">Active load management</p>
            </Link>
            <Link to="/drybulk/dispatch/planner" className="overview-card">
              <h3 className="overview-card__title">Planner</h3>
              <p className="overview-card__description">Route planning and scheduling</p>
            </Link>
            <Link to="/drybulk/dispatch/events" className="overview-card">
              <h3 className="overview-card__title">Events</h3>
              <p className="overview-card__description">Real-time event tracking</p>
            </Link>
          </div>
        </div>

        {/* Reporting Section */}
        <div className="overview-section">
          <div className="overview-section__header">
            <h2 className="overview-section__title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="20" x2="18" y2="10"/>
                <line x1="12" y1="20" x2="12" y2="4"/>
                <line x1="6" y1="20" x2="6" y2="14"/>
              </svg>
              Reporting
            </h2>
          </div>
          <div className="overview-cards">
            <Link to="/drybulk/reporting/dry-bulk" className="overview-card">
              <h3 className="overview-card__title">Dry Bulk Daily</h3>
              <p className="overview-card__description">Daily operations reports</p>
            </Link>
            <Link to="/drybulk/reporting/status" className="overview-card">
              <h3 className="overview-card__title">Status Reporting</h3>
              <p className="overview-card__description">Fleet and load status updates</p>
            </Link>
            <Link to="/drybulk/reporting/spill" className="overview-card">
              <h3 className="overview-card__title">Spill Reporting</h3>
              <p className="overview-card__description">Incident and spill documentation</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
