import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/pages/DashboardOverview.css';

export const TankWashOverview: React.FC = () => {
  return (
    <div className="dashboard-overview">
      <div className="dashboard-overview__header">
        <h1 className="dashboard-overview__title">Tank Wash Operations</h1>
        <p className="dashboard-overview__subtitle">Manage tank cleaning operations and scheduling</p>
      </div>

      <div className="dashboard-overview__grid">
        {/* Operations Section */}
        <div className="overview-section">
          <div className="overview-section__header">
            <h2 className="overview-section__title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
              </svg>
              Operations
            </h2>
          </div>
          <div className="overview-cards">
            <Link to="/tankwash/operations/overview" className="overview-card">
              <h3 className="overview-card__title">Overview</h3>
              <p className="overview-card__description">Tank wash operations dashboard</p>
            </Link>
            <Link to="/tankwash/operations/schedule" className="overview-card">
              <h3 className="overview-card__title">Schedule</h3>
              <p className="overview-card__description">Cleaning schedules and planning</p>
            </Link>
            <Link to="/tankwash/operations/compliance" className="overview-card">
              <h3 className="overview-card__title">Compliance</h3>
              <p className="overview-card__description">Regulatory compliance tracking</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
