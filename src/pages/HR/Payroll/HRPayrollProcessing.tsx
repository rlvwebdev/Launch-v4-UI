import React from 'react';
import './HRPayrollProcessing.css';

export const HRPayrollProcessing: React.FC = () => {
  return (
    <>
      <hgroup>
        <div className="hgroup__content">
          <h1>Payroll Processing</h1>
          <h3>Process and manage employee payroll</h3>
        </div>
      </hgroup>
      <div className="page hr-payroll-processing">
        <section className="processing-section">
          <h2>Payroll Management</h2>
          <p>Calculate wages, process deductions, and manage direct deposits for employee compensation.</p>
        </section>
      </div>
    </>
  );
};

export default HRPayrollProcessing;
