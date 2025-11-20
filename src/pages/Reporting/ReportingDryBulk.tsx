import { useState } from 'react';
import './ReportingDryBulk.css';

export const ReportingDryBulk = () => {
  const [showHistory, setShowHistory] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Mock historical data
  const reportHistory = [
    { id: 1, date: '2025-11-19', time: '08:45 AM', submittedBy: 'John Smith' },
    { id: 2, date: '2025-11-18', time: '09:12 AM', submittedBy: 'Sarah Jones' },
    { id: 3, date: '2025-11-17', time: '08:30 AM', submittedBy: 'John Smith' },
    { id: 4, date: '2025-11-16', time: '09:05 AM', submittedBy: 'Mike Wilson' },
  ];

  return (
    <>
      <hgroup>
        <div className="hgroup__content">
          <h1>Dry Bulk Daily Reporting</h1>
          <h3>Daily Overview of the Dry Bulk fleet and its operational readiness</h3>
        </div>
        <div className="hgroup__actions">
          <button 
            className="btn btn--secondary"
            onClick={() => setShowHistory(!showHistory)}
          >
            Report History
          </button>
          <button 
            className="btn btn--primary"
            onClick={() => setShowForm(true)}
          >
            Submit Daily Report
          </button>
        </div>
      </hgroup>
      <div className="page">
        {showForm && (
          <section className="form-placeholder">
            <div className="form-placeholder__header">
              <h2>Daily Report Form</h2>
              <button 
                className="btn btn--secondary"
                onClick={() => setShowForm(false)}
              >
                Close
              </button>
            </div>
            <p className="form-placeholder__message">
              <strong>Form in Development</strong><br />
              Daily report submission form will be implemented in a future update.
            </p>
          </section>
        )}

        {showHistory && (
          <section className="report-history">
            <div className="report-history__header">
              <h2>Report History</h2>
              <button 
                className="btn btn--secondary"
                onClick={() => setShowHistory(false)}
              >
                Close
              </button>
            </div>
            <div className="report-history__list">
              {reportHistory.map((report) => (
                <div key={report.id} className="report-history__item">
                  <div className="report-history__info">
                    <div className="report-history__date">
                      {new Date(report.date).toLocaleDateString('en-US', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                    <div className="report-history__time">{report.time}</div>
                    <div className="report-history__submitter">Submitted by {report.submittedBy}</div>
                  </div>
                  <div className="report-history__actions">
                    <button className="btn btn--secondary btn--sm">
                      View
                    </button>
                    <button className="btn btn--secondary btn--sm">
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {!showForm && !showHistory && (
          <section>
            {/* Default content */}
            <p>Select an action above to submit a new report or view history.</p>
          </section>
        )}
      </div>
    </>
  );
};
