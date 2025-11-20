import React from 'react';
import './MaintenanceFleetWorkOrders.css';

export const MaintenanceFleetWorkOrders: React.FC = () => {
  return (
    <>
      <hgroup>
        <div className="hgroup__content">
          <h1>Maintenance Work Orders</h1>
          <h3>Manage and track fleet maintenance work orders</h3>
        </div>
      </hgroup>
      <div className="page maintenance-fleet-work-orders">
        <section className="work-orders-section">
          <h2>Active Work Orders</h2>
          <p>Create, assign, and track maintenance work orders for fleet vehicles including status, priority, and completion dates.</p>
        </section>
      </div>
    </>
  );
};

export default MaintenanceFleetWorkOrders;
