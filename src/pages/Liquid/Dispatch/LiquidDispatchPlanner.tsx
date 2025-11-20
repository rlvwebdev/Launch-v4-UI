import React from 'react';
import './LiquidDispatchPlanner.css';

export const LiquidDispatchPlanner: React.FC = () => {
  return (
    <>
      <hgroup>
        <div className="hgroup__content">
          <h1>Liquid Dispatch Planner</h1>
          <h3>Plan and optimize liquid transport routes and schedules</h3>
        </div>
      </hgroup>
      <div className="page liquid-dispatch-planner">
        <section className="planner-section">
          <h2>Route Planning</h2>
          <p>Optimize liquid transport routes, schedule deliveries, and allocate resources efficiently.</p>
        </section>
      </div>
    </>
  );
};

export default LiquidDispatchPlanner;
