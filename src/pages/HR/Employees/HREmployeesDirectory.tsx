import React from 'react';
import './HREmployeesDirectory.css';

export const HREmployeesDirectory: React.FC = () => {
  return (
    <>
      <hgroup>
        <div className="hgroup__content">
          <h1>Employee Directory</h1>
          <h3>Search and manage employee information</h3>
        </div>
      </hgroup>
      <div className="page hr-employees-directory">
        <section className="directory-section">
          <h2>Directory</h2>
          <p>Access employee contact information, job titles, department assignments, and reporting relationships.</p>
        </section>
      </div>
    </>
  );
};

export default HREmployeesDirectory;
