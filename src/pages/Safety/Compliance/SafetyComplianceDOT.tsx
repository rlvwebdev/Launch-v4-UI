import React from 'react';
import './SafetyComplianceDOT.css';

export const SafetyComplianceDOT: React.FC = () => {
  return (
    <>
      <hgroup>
        <div className="hgroup__content">
          <h1>DOT Compliance</h1>
          <h3>Maintain DOT regulatory compliance</h3>
        </div>
      </hgroup>
      <div className="page safety-compliance-dot">
        <section className="dot-section">
          <h2>DOT Requirements</h2>
          <p>Ensure compliance with Department of Transportation regulations including hours of service, vehicle inspections, and driver qualifications.</p>
        </section>
      </div>
    </>
  );
};

export default SafetyComplianceDOT;
