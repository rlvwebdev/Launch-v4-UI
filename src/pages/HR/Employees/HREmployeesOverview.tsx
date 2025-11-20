import React from 'react';
import './HREmployeesOverview.css';

export const HREmployeesOverview: React.FC = () => {
  return (
    <>
      <hgroup>
        <div className="hgroup__content">
          <h1>Employees Overview</h1>
          <h3>Monitor employee workforce and organizational structure</h3>
        </div>
      </hgroup>
      <div className="page hr-employees-overview">
        <section className="overview-section">
          <h2>Workforce Dashboard</h2>
          <p>View comprehensive employee data including headcount, department distribution, and key workforce metrics.</p>
        </section>
      </div>
    </>
  );
};

export default HREmployeesOverview;
