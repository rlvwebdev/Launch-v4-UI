import React from 'react';
import './AccountProfile.css';

export const AccountProfile: React.FC = () => {
  return (
    <>
      <hgroup>
        <div className="hgroup__content">
          <h1>Profile</h1>
          <h3>Manage your personal information and preferences</h3>
        </div>
      </hgroup>
      <div className="page account-profile">
        <section className="profile-section">
          <h2>Personal Information</h2>
          <p>View and update your profile details including name, email, phone number, and contact preferences.</p>
        </section>
      </div>
    </>
  );
};

export default AccountProfile;
