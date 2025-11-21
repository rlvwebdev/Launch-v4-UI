import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/pages/DashboardOverview.css';

export const MaintenanceOverview: React.FC = () => {
  return (
    <div className="dashboard-overview">
      <div className="dashboard-overview__header">
        <h1 className="dashboard-overview__title">Maintenance Management</h1>
        <p className="dashboard-overview__subtitle">Manage fleet maintenance, work orders, and parts inventory</p>
      </div>

      <div className="dashboard-overview__grid">
        {/* Work Orders Section */}
        <div className="overview-section">
          <div className="overview-section__header">
            <h2 className="overview-section__title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
              </svg>
              Work Orders
            </h2>
          </div>
          <div className="overview-cards">
            <Link to="/maintenance/workorders/active" className="overview-card">
              <h3 className="overview-card__title">Active Work Orders</h3>
              <p className="overview-card__description">Current maintenance tasks</p>
            </Link>
            <Link to="/maintenance/workorders/schedule" className="overview-card">
              <h3 className="overview-card__title">Scheduled</h3>
              <p className="overview-card__description">Upcoming maintenance schedule</p>
            </Link>
            <Link to="/maintenance/workorders/history" className="overview-card">
              <h3 className="overview-card__title">History</h3>
              <p className="overview-card__description">Completed work orders</p>
            </Link>
          </div>
        </div>

        {/* Inventory Section */}
        <div className="overview-section">
          <div className="overview-section__header">
            <h2 className="overview-section__title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              </svg>
              Inventory
            </h2>
          </div>
          <div className="overview-cards">
            <Link to="/maintenance/inventory/parts" className="overview-card">
              <h3 className="overview-card__title">Parts</h3>
              <p className="overview-card__description">Parts inventory management</p>
            </Link>
            <Link to="/maintenance/inventory/orders" className="overview-card">
              <h3 className="overview-card__title">Orders</h3>
              <p className="overview-card__description">Parts ordering and tracking</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
