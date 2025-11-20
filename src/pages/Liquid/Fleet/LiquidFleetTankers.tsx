import React from 'react';
import './LiquidFleetTankers.css';

export const LiquidFleetTankers: React.FC = () => {
  return (
    <>
      <hgroup>
        <div className="hgroup__content">
          <h1>Liquid Fleet Tankers</h1>
          <h3>Manage and track liquid transport tanker fleet</h3>
        </div>
      </hgroup>
      <div className="page liquid-fleet-tankers">
        <section className="tankers-section">
          <h2>Tanker Fleet Management</h2>
          <p>View tanker inventory, maintenance schedules, and operational status for liquid transport vehicles.</p>
        </section>
      </div>
    </>
  );
};

export default LiquidFleetTankers;
