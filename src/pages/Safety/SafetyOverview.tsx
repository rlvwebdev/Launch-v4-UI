import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/pages/DashboardOverview.css';

export const SafetyOverview: React.FC = () => {
  return (
    <div className="dashboard-overview">
      <div className="dashboard-overview__header">
        <h1 className="dashboard-overview__title">Safety Management</h1>
        <p className="dashboard-overview__subtitle">Manage safety programs, incidents, and training</p>
      </div>

      <div className="dashboard-overview__grid">
        {/* Incidents Section */}
        <div className="overview-section">
          <div className="overview-section__header">
            <h2 className="overview-section__title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              Incidents
            </h2>
          </div>
          <div className="overview-cards">
            <Link to="/safety/incidents/reports" className="overview-card">
              <h3 className="overview-card__title">Reports</h3>
              <p className="overview-card__description">Incident reporting and tracking</p>
            </Link>
            <Link to="/safety/incidents/investigations" className="overview-card">
              <h3 className="overview-card__title">Investigations</h3>
              <p className="overview-card__description">Incident investigations</p>
            </Link>
            <Link to="/safety/incidents/analytics" className="overview-card">
              <h3 className="overview-card__title">Analytics</h3>
              <p className="overview-card__description">Safety metrics and trends</p>
            </Link>
          </div>
        </div>

        {/* Training Section */}
        <div className="overview-section">
          <div className="overview-section__header">
            <h2 className="overview-section__title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              Training
            </h2>
          </div>
          <div className="overview-cards">
            <Link to="/safety/training/programs" className="overview-card">
              <h3 className="overview-card__title">Programs</h3>
              <p className="overview-card__description">Safety training programs</p>
            </Link>
            <Link to="/safety/training/certifications" className="overview-card">
              <h3 className="overview-card__title">Certifications</h3>
              <p className="overview-card__description">Employee certifications</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
