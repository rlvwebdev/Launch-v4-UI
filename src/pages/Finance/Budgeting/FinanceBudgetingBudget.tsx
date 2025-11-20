import React from 'react';
import './FinanceBudgetingBudget.css';

export const FinanceBudgetingBudget: React.FC = () => {
  return (
    <>
      <hgroup>
        <div className="hgroup__content">
          <h1>Budget Management</h1>
          <h3>Create and manage departmental budgets</h3>
        </div>
      </hgroup>
      <div className="page finance-budgeting-budget">
        <section className="budget-section">
          <h2>Budget Planning</h2>
          <p>Develop, track, and manage budgets across departments. Monitor actual vs. budgeted performance.</p>
        </section>
      </div>
    </>
  );
};

export default FinanceBudgetingBudget;
