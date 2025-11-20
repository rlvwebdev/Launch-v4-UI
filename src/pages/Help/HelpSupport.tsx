import React from 'react';
import './HelpSupport.css';

export const HelpSupport: React.FC = () => {
  return (
    <>
      <hgroup>
        <div className="hgroup__content">
          <h1>Support</h1>
          <h3>Get assistance from our support team</h3>
        </div>
      </hgroup>
      <div className="page help-support">
        <section className="support-section">
          <h2>Contact Support</h2>
          <p>Submit support tickets, track existing cases, and connect with our support team for technical assistance.</p>
        </section>
      </div>
    </>
  );
};

export default HelpSupport;
