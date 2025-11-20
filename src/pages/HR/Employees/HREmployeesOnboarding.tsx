import React from 'react';
import './HREmployeesOnboarding.css';

export const HREmployeesOnboarding: React.FC = () => {
  return (
    <>
      <hgroup>
        <div className="hgroup__content">
          <h1>Employee Onboarding</h1>
          <h3>Manage new hire onboarding process</h3>
        </div>
      </hgroup>
      <div className="page hr-employees-onboarding">
        <section className="onboarding-section">
          <h2>Onboarding Pipeline</h2>
          <p>Track new employee onboarding progress including documentation, training completion, and equipment assignment.</p>
        </section>
      </div>
    </>
  );
};

export default HREmployeesOnboarding;
