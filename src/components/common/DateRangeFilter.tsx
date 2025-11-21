import { useState } from 'react';
import '../../styles/components/DateRangeFilter.css';
import '../../styles/datepicker.css';

interface DateRangeFilterProps {
  onDateChange?: (startDate: string, endDate: string) => void;
  className?: string;
}

export const DateRangeFilter = ({ onDateChange, className = '' }: DateRangeFilterProps) => {
  // Get today's date in YYYY-MM-DD format for input value
  const getTodayISO = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Open by default on desktop (>1024px), closed on mobile/tablet
  const [isOpen, setIsOpen] = useState(() => window.innerWidth > 1024);
  const [startDate, setStartDate] = useState(getTodayISO());
  const [endDate, setEndDate] = useState(getTodayISO());

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  const handleApply = () => {
    if (onDateChange && startDate && endDate) {
      onDateChange(startDate, endDate);
    }
  };

  return (
    <div className={`date-range-filter ${isOpen ? 'date-range-filter--open' : ''} ${className}`}>
      <div className="date-range-filter__inputs">
        <input 
          type="date"
          className="date-range-filter__input"
          aria-label="Start date"
          value={startDate}
          onChange={handleStartDateChange}
        />
        <span className="date-range-filter__separator">to</span>
        <input 
          type="date"
          className="date-range-filter__input"
          aria-label="End date"
          value={endDate}
          onChange={handleEndDateChange}
        />
        <button 
          className="date-range-filter__apply"
          onClick={handleApply}
          aria-label="Apply date filter"
          type="button"
        >
          Apply
        </button>
      </div>
      <button 
        className={`date-range-filter__toggle ${isOpen ? 'date-range-filter__toggle--active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Filter by date"
        type="button"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      </button>
    </div>
  );
};
