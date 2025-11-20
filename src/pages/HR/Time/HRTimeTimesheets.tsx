import React from 'react';
import './HRTimeTimesheets.css';

export const HRTimeTimesheets: React.FC = () => {
  return (
    <>
      <hgroup>
        <div className="hgroup__content">
          <h1>Timesheets</h1>
          <h3>Track and approve employee time entries</h3>
        </div>
      </hgroup>
      <div className="page hr-time-timesheets">
        <section className="timesheets-section">
          <h2>Time Entry Management</h2>
          <p>Review employee time submissions, approve hours worked, and track overtime and paid time off.</p>
        </section>
      </div>
    </>
  );
};

export default HRTimeTimesheets;
