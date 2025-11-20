import React from 'react';
import './LiquidTerminalOverview.css';

export const LiquidTerminalOverview: React.FC = () => {
  return (
    <>
      <hgroup>
        <div className="hgroup__content">
          <h1>Liquid Terminal Overview</h1>
          <h3>Monitor and analyze liquid transport terminal operations</h3>
        </div>
      </hgroup>
      <div className="page liquid-terminal-overview">
        <section className="overview-section">
          <h2>Terminal Status</h2>
          <p>View real-time status of liquid terminal operations, including active loads, tank capacity, and throughput metrics.</p>
        </section>
      </div>
    </>
  );
};

export default LiquidTerminalOverview;
