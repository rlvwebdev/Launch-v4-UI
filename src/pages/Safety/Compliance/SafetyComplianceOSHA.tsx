import React from 'react';
import './SafetyComplianceOSHA.css';

export const SafetyComplianceOSHA: React.FC = () => {
  return (
    <>
      <hgroup>
        <div className="hgroup__content">
          <h1>OSHA Compliance</h1>
          <h3>Maintain OSHA regulatory compliance</h3>
        </div>
      </hgroup>
      <div className="page safety-compliance-osha">
        <section className="osha-section">
          <h2>OSHA Requirements</h2>
          <p>Ensure compliance with OSHA regulations including recordkeeping, reporting, and workplace safety standards.</p>
        </section>
      </div>
    </>
  );
};

export default SafetyComplianceOSHA;
