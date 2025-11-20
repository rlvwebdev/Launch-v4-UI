import React from 'react';
import './SafetyTrainingCertifications.css';

export const SafetyTrainingCertifications: React.FC = () => {
  return (
    <>
      <hgroup>
        <div className="hgroup__content">
          <h1>Safety Certifications</h1>
          <h3>Track employee safety certifications and renewals</h3>
        </div>
      </hgroup>
      <div className="page safety-training-certifications">
        <section className="certifications-section">
          <h2>Certification Management</h2>
          <p>Monitor employee safety certifications, track expiration dates, and schedule recertification training.</p>
        </section>
      </div>
    </>
  );
};

export default SafetyTrainingCertifications;
