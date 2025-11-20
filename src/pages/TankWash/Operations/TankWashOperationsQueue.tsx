import React from 'react';
import './TankWashOperationsQueue.css';

export const TankWashOperationsQueue: React.FC = () => {
  return (
    <>
      <hgroup>
        <div className="hgroup__content">
          <h1>Tank Wash Operations Queue</h1>
          <h3>Monitor active tank washing queue and priorities</h3>
        </div>
      </hgroup>
      <div className="page tankwash-operations-queue">
        <section className="queue-section">
          <h2>Active Queue</h2>
          <p>Track tanks in the washing queue, prioritize urgent washes, and monitor operation progress.</p>
        </section>
      </div>
    </>
  );
};

export default TankWashOperationsQueue;
