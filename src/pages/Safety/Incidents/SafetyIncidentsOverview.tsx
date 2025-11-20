import React from 'react';
import './SafetyIncidentsOverview.css';

export const SafetyIncidentsOverview: React.FC = () => {
  return (
    <>
      <hgroup>
        <div className="hgroup__content">
          <h1>Safety Incidents Overview</h1>
          <h3>Monitor workplace safety incidents and trends</h3>
        </div>
      </hgroup>
      <div className="page safety-incidents-overview">
        <section className="overview-section">
          <h2>Incident Dashboard</h2>
          <p>Track all safety incidents, near misses, and unsafe conditions across operations. Monitor incident rates and safety performance metrics.</p>
        </section>
      </div>
    </>
  );
};

export default SafetyIncidentsOverview;
