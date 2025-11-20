import React from 'react';
import './SafetyIncidentsReports.css';

export const SafetyIncidentsReports: React.FC = () => {
  return (
    <>
      <hgroup>
        <div className="hgroup__content">
          <h1>Incident Reports</h1>
          <h3>Document and manage safety incident reports</h3>
        </div>
      </hgroup>
      <div className="page safety-incidents-reports">
        <section className="reports-section">
          <h2>Report Management</h2>
          <p>Create, submit, and review detailed safety incident reports including witness statements and supporting documentation.</p>
        </section>
      </div>
    </>
  );
};

export default SafetyIncidentsReports;
