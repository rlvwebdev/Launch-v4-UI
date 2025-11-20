import React from 'react';
import './HRTimeSchedules.css';

export const HRTimeSchedules: React.FC = () => {
  return (
    <>
      <hgroup>
        <div className="hgroup__content">
          <h1>Employee Schedules</h1>
          <h3>Plan and manage employee work schedules</h3>
        </div>
      </hgroup>
      <div className="page hr-time-schedules">
        <section className="schedules-section">
          <h2>Schedule Management</h2>
          <p>Create and manage employee work schedules, shift assignments, and time-off requests.</p>
        </section>
      </div>
    </>
  );
};

export default HRTimeSchedules;
