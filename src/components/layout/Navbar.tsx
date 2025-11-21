import { useState, ReactNode, useRef, useEffect } from 'react';
import '../../styles/components/Navbar.css';

interface NavbarProps {
  onSidebarToggle?: () => void;
  onAsideToggle?: () => void;
  sidebarOpen?: boolean;
  asideOpen?: boolean;
  actions?: Action[];
  showDateFilter?: boolean;
  dateFilter?: ReactNode;
  className?: string;
}

interface Action {
  id: string;
  label: string;
  icon: string;
  onClick: () => void;
  variant?: 'default' | 'primary' | 'danger';
}

export const Navbar = ({
  onSidebarToggle,
  onAsideToggle,
  sidebarOpen = false,
  asideOpen = false,
  actions: _actions = [],
  showDateFilter = false,
  dateFilter,
  className = '',
}: NavbarProps) => {
  const [searchValue, setSearchValue] = useState('');
  const [autoReload, setAutoReload] = useState(false);
  const [mobileActionsOpen, setMobileActionsOpen] = useState(false);
  const mobileActionsRef = useRef<HTMLDivElement>(null);

  // Close mobile actions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileActionsRef.current && !mobileActionsRef.current.contains(event.target as Node)) {
        setMobileActionsOpen(false);
      }
    };

    if (mobileActionsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileActionsOpen]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search submitted:', searchValue);
  };

  return (
    <nav className={`navbar ${className}`}>
      <div className="navbar__left">
        <button
          className={`navbar__toggle ${sidebarOpen ? 'navbar__toggle--active' : ''}`}
          onClick={onSidebarToggle}
          aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
        >
          <span className="navbar__toggle-icon">
            {/* Hamburger icon - shown when sidebar is closed */}
            {!sidebarOpen && (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
            {/* Sidebar with panel icon - shown when sidebar is open */}
            {sidebarOpen && (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <line x1="9" y1="3" x2="9" y2="21" />
              </svg>
            )}
          </span>
        </button>
      </div>

      <div className="navbar__center">
        <form className="navbar__search" onSubmit={handleSearchSubmit}>
          <span className="navbar__search-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </span>
          <input
            type="search"
            className="navbar__search-input"
            placeholder="Search..."
            value={searchValue}
            onChange={handleSearchChange}
          />
        </form>
      </div>

      <div className="navbar__right">
        {(showDateFilter || dateFilter) && (
          <div className="navbar__date-filter-container">
            {dateFilter}
          </div>
        )}

        <button
          className={`navbar__toggle navbar__autoreload ${autoReload ? 'navbar__toggle--active' : ''}`}
          onClick={() => setAutoReload(!autoReload)}
          aria-label={autoReload ? 'Disable auto-reload' : 'Enable auto-reload'}
          title={autoReload ? 'Auto-reload enabled' : 'Auto-reload disabled'}
        >
          <span className="navbar__toggle-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
              <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
            </svg>
          </span>
        </button>

        {/* Mobile actions menu - visible only on mobile */}
        <div className="navbar__mobile-actions" ref={mobileActionsRef}>
          <button
            className="navbar__toggle"
            onClick={() => setMobileActionsOpen(!mobileActionsOpen)}
            aria-label="Toggle actions menu"
          >
            <span className="navbar__toggle-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                <circle cx="12" cy="12" r="1" />
                <circle cx="12" cy="5" r="1" />
                <circle cx="12" cy="19" r="1" />
              </svg>
            </span>
          </button>
          <div className={`navbar__mobile-actions-dropdown ${mobileActionsOpen ? 'navbar__mobile-actions-dropdown--open' : ''}`}>
            <div className="navbar__mobile-actions-item">
              {dateFilter}
            </div>
            <button
              className="navbar__mobile-actions-item navbar__mobile-actions-button"
              onClick={() => {
                setAutoReload(!autoReload);
                setMobileActionsOpen(false);
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
              </svg>
              <span>{autoReload ? 'Disable' : 'Enable'} Auto-reload</span>
            </button>
          </div>
        </div>
        
        <button
          className={`navbar__toggle ${asideOpen ? 'navbar__toggle--active' : ''}`}
          onClick={onAsideToggle}
          aria-label={asideOpen ? 'Hide aside panel' : 'Show aside panel'}
          title={asideOpen ? 'Hide panel' : 'Show panel'}
        >
          <span className="navbar__toggle-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <line x1="15" y1="3" x2="15" y2="21" />
            </svg>
          </span>
        </button>
      </div>
    </nav>
  );
};
