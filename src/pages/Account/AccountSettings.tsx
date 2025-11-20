import React from 'react';
import './AccountSettings.css';

export const AccountSettings: React.FC = () => {
  return (
    <>
      <hgroup>
        <div className="hgroup__content">
          <h1>Settings</h1>
          <h3>Configure your account preferences and options</h3>
        </div>
      </hgroup>
      <div className="page account-settings">
        <section className="settings-section">
          <h2>Account Settings</h2>
          <p>Manage notifications, privacy settings, security options, and application preferences.</p>
        </section>
      </div>
    </>
  );
};

export default AccountSettings;
