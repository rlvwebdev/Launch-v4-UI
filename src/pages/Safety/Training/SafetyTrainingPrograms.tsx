import React from 'react';
import './SafetyTrainingPrograms.css';

export const SafetyTrainingPrograms: React.FC = () => {
  return (
    <>
      <hgroup>
        <div className="hgroup__content">
          <h1>Safety Training Programs</h1>
          <h3>Manage safety training courses and curriculum</h3>
        </div>
      </hgroup>
      <div className="page safety-training-programs">
        <section className="programs-section">
          <h2>Training Curriculum</h2>
          <p>Design and deliver safety training programs covering topics like hazmat handling, defensive driving, and emergency response.</p>
        </section>
      </div>
    </>
  );
};

export default SafetyTrainingPrograms;
