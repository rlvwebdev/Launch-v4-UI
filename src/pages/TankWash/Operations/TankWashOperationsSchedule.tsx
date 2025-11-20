import React from 'react';
import './TankWashOperationsSchedule.css';

export const TankWashOperationsSchedule: React.FC = () => {
  return (
    <>
      <hgroup>
        <div className="hgroup__content">
          <h1>Tank Wash Operations Schedule</h1>
          <h3>Manage and schedule tank washing operations</h3>
        </div>
      </hgroup>
      <div className="page tankwash-operations-schedule">
        <section className="schedule-section">
          <h2>Wash Schedule</h2>
          <p>View and manage scheduled tank washing operations, including timing, resources, and tank assignments.</p>
        </section>
      </div>
    </>
  );
};

export default TankWashOperationsSchedule;
