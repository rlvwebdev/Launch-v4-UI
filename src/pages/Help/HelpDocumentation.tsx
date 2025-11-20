import React from 'react';
import './HelpDocumentation.css';

export const HelpDocumentation: React.FC = () => {
  return (
    <>
      <hgroup>
        <div className="hgroup__content">
          <h1>Documentation</h1>
          <h3>Comprehensive guides and reference materials</h3>
        </div>
      </hgroup>
      <div className="page help-documentation">
        <section className="documentation-section">
          <h2>User Guides</h2>
          <p>Access detailed documentation, tutorials, and best practices for using the TMS platform effectively.</p>
        </section>
      </div>
    </>
  );
};

export default HelpDocumentation;
