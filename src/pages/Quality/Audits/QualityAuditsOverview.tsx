import React from 'react';
import './QualityAuditsOverview.css';

export const QualityAuditsOverview: React.FC = () => {
  return (
    <>
      <hgroup>
        <div className="hgroup__content">
          <h1>Quality Audits Overview</h1>
          <h3>Track quality audit programs and outcomes</h3>
        </div>
      </hgroup>
      <div className="page quality-audits-overview">
        <section className="overview-section">
          <h2>Audit Activity</h2>
          <p>Monitor ongoing and completed quality audits, including internal reviews and external certifications.</p>
        </section>
      </div>
    </>
  );
};

export default QualityAuditsOverview;
