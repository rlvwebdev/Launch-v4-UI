import React from 'react';
import './HelpFeedback.css';

export const HelpFeedback: React.FC = () => {
  return (
    <>
      <hgroup>
        <div className="hgroup__content">
          <h1>Feedback</h1>
          <h3>Share your thoughts and suggestions</h3>
        </div>
      </hgroup>
      <div className="page help-feedback">
        <section className="feedback-section">
          <h2>Provide Feedback</h2>
          <p>Help us improve by sharing your experience, suggestions, and feature requests with our product team.</p>
        </section>
      </div>
    </>
  );
};

export default HelpFeedback;
