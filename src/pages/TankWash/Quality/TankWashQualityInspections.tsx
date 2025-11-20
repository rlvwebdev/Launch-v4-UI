import React from 'react';
import './TankWashQualityInspections.css';

export const TankWashQualityInspections: React.FC = () => {
  return (
    <>
      <hgroup>
        <div className="hgroup__content">
          <h1>Tank Wash Quality Inspections</h1>
          <h3>Track quality inspections and wash verification</h3>
        </div>
      </hgroup>
      <div className="page tankwash-quality-inspections">
        <section className="inspections-section">
          <h2>Quality Verification</h2>
          <p>Conduct and document post-wash quality inspections to ensure tanks meet cleanliness standards.</p>
        </section>
      </div>
    </>
  );
};

export default TankWashQualityInspections;
