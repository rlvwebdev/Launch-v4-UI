import React from 'react';
import './MaintenanceFleetPreventive.css';

export const MaintenanceFleetPreventive: React.FC = () => {
  return (
    <>
      <hgroup>
        <div className="hgroup__content">
          <h1>Preventive Maintenance</h1>
          <h3>Schedule and manage preventive maintenance programs</h3>
        </div>
      </hgroup>
      <div className="page maintenance-fleet-preventive">
        <section className="preventive-section">
          <h2>PM Schedule</h2>
          <p>Configure preventive maintenance schedules based on mileage, hours, or time intervals to minimize downtime and extend vehicle life.</p>
        </section>
      </div>
    </>
  );
};

export default MaintenanceFleetPreventive;
