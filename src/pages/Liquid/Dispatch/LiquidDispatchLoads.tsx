import React from 'react';
import './LiquidDispatchLoads.css';

export const LiquidDispatchLoads: React.FC = () => {
  return (
    <>
      <hgroup>
        <div className="hgroup__content">
          <h1>Liquid Dispatch Loads</h1>
          <h3>Track and manage liquid transport load assignments</h3>
        </div>
      </hgroup>
      <div className="page liquid-dispatch-loads">
        <section className="loads-section">
          <h2>Load Management</h2>
          <p>View active and scheduled liquid transport loads, including pickup and delivery details, product types, and load status.</p>
        </section>
      </div>
    </>
  );
};

export default LiquidDispatchLoads;
