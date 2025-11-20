import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/components/Header.css';

interface HeaderProps {
  className?: string;
  onThemeChange?: (theme: 'light' | 'dark' | 'auto') => void;
  currentTheme?: 'light' | 'dark' | 'auto';
}

export const Header = ({ className = '', onThemeChange, currentTheme = 'light' }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [helpMenuOpen, setHelpMenuOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);

  const accountMenuRef = useRef<HTMLDivElement>(null);
  const helpMenuRef = useRef<HTMLDivElement>(null);
  const themeMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target as Node)) {
        setAccountMenuOpen(false);
      }
      if (helpMenuRef.current && !helpMenuRef.current.contains(event.target as Node)) {
        setHelpMenuOpen(false);
      }
      if (themeMenuRef.current && !themeMenuRef.current.contains(event.target as Node)) {
        setThemeMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const toggleAccountMenu = () => {
    setAccountMenuOpen(!accountMenuOpen);
    setHelpMenuOpen(false);
    setThemeMenuOpen(false);
  };

  const toggleHelpMenu = () => {
    setHelpMenuOpen(!helpMenuOpen);
    setAccountMenuOpen(false);
    setThemeMenuOpen(false);
  };

  const toggleThemeMenu = () => {
    setThemeMenuOpen(!themeMenuOpen);
    setAccountMenuOpen(false);
    setHelpMenuOpen(false);
  };

  const setTheme = (theme: 'light' | 'dark' | 'auto') => {
    if (onThemeChange) {
      onThemeChange(theme);
    }
    setThemeMenuOpen(false);
  };

  return (
    <>
      <a href="#main-content" className="header__skip-link">
        Skip to content
      </a>

      <header className={`header ${className}`}>
        <div className="header__left">
          <Link to="/" className="header__logo-link">
            <span className="header__logo-icon">
              <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
                <path className="rocket-flame" d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" fill="#ff6b35" stroke="#ff6b35" strokeWidth="2" />
                <path className="rocket-body" d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" stroke="#ffffff" strokeWidth="2" />
                <path className="rocket-body" d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" stroke="#ffffff" strokeWidth="2" />
                <path className="rocket-body" d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" stroke="#ffffff" strokeWidth="2" />
              </svg>
            </span>
            <span className="header__logo-text">L<span className="header__logo-text-a">A</span>UNCH</span>
          </Link>
        </div>

        <div className="header__center"></div>

        <div className="header__right">
          <nav className="header__nav">
            <div className="header__menu-container" ref={accountMenuRef}>
              <button
                className="header__menu-button"
                onClick={toggleAccountMenu}
                aria-expanded={accountMenuOpen}
              >
                <span className="header__menu-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                <span>Account</span>
              </button>
              <div className={`header__dropdown ${accountMenuOpen ? 'header__dropdown--open' : ''}`}>
                <Link to="/account/profile" className="header__dropdown-item" onClick={() => setAccountMenuOpen(false)}>Profile</Link>
                <Link to="/account/settings" className="header__dropdown-item" onClick={() => setAccountMenuOpen(false)}>Settings</Link>
                <button className="header__dropdown-item">Sign Out</button>
              </div>
            </div>

            <div className="header__menu-container" ref={helpMenuRef}>
              <button
                className="header__menu-button"
                onClick={toggleHelpMenu}
                aria-expanded={helpMenuOpen}
              >
                <span className="header__menu-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </span>
                <span>Help</span>
              </button>
              <div className={`header__dropdown ${helpMenuOpen ? 'header__dropdown--open' : ''}`}>
                <Link to="/help/documentation" className="header__dropdown-item" onClick={() => setHelpMenuOpen(false)}>Documentation</Link>
                <Link to="/help/support" className="header__dropdown-item" onClick={() => setHelpMenuOpen(false)}>Support</Link>
                <Link to="/help/feedback" className="header__dropdown-item" onClick={() => setHelpMenuOpen(false)}>Feedback</Link>
              </div>
            </div>

            <div className="header__menu-container" ref={themeMenuRef}>
              <button
                className="header__menu-button"
                onClick={toggleThemeMenu}
                aria-expanded={themeMenuOpen}
              >
                <span className="header__menu-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                </span>
                <span>Theme</span>
              </button>
              <div className={`header__dropdown ${themeMenuOpen ? 'header__dropdown--open' : ''}`}>
                <button className="header__dropdown-item" onClick={() => setTheme('light')}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" style={{ display: 'inline-block', marginRight: '0.5rem' }}>
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                  Light
                </button>
                <button className="header__dropdown-item" onClick={() => setTheme('dark')}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" style={{ display: 'inline-block', marginRight: '0.5rem' }}>
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                  Dark
                </button>
                <button className="header__dropdown-item" onClick={() => setTheme('auto')}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" style={{ display: 'inline-block', marginRight: '0.5rem' }}>
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2v20" />
                  </svg>
                  Auto
                </button>
              </div>
            </div>
          </nav>

          <button
            className="header__mobile-toggle"
            onClick={toggleMobileMenu}
            aria-expanded={mobileMenuOpen}
          >
            <div className="header__mobile-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </div>
          </button>
        </div>
      </header>

      <nav className={`header__mobile-nav ${mobileMenuOpen ? 'header__mobile-nav--open' : ''}`}>
        <button className="header__mobile-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18" style={{ display: 'inline-block', marginRight: '0.5rem' }}>
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          Profile
        </button>
        <button className="header__mobile-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18" style={{ display: 'inline-block', marginRight: '0.5rem' }}>
            <circle cx="12" cy="12" r="3" />
            <path d="M12 1v6m0 6v6M4.93 4.93l4.24 4.24m5.66 5.66l4.24 4.24M1 12h6m6 0h6M4.93 19.07l4.24-4.24m5.66-5.66l4.24-4.24" />
          </svg>
          Settings
        </button>
        <button className="header__mobile-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18" style={{ display: 'inline-block', marginRight: '0.5rem' }}>
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
          Documentation
        </button>
        <button className="header__mobile-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18" style={{ display: 'inline-block', marginRight: '0.5rem' }}>
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          Support
        </button>
        <button className="header__mobile-item" onClick={() => setTheme('light')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18" style={{ display: 'inline-block', marginRight: '0.5rem' }}>
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          </svg>
          Light Theme
        </button>
        <button className="header__mobile-item" onClick={() => setTheme('dark')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18" style={{ display: 'inline-block', marginRight: '0.5rem' }}>
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
          Dark Theme
        </button>
        <button className="header__mobile-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18" style={{ display: 'inline-block', marginRight: '0.5rem' }}>
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Sign Out
        </button>
      </nav>
    </>
  );
};
