import { useState, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/components/Sidebar.css';
import { navigationMap } from '../../config/navigation';

interface SidebarProps {
  isOpen?: boolean;
  isCollapsed?: boolean;
  className?: string;
}

interface Dashboard {
  id: string;
  name: string;
  icon: string;
}

interface NavItem {
  id: string;
  label: string;
  path: string;
  icon?: string;
}

const dashboards: Dashboard[] = [
  { id: 'drybulk', name: 'Dry Bulk', icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 18.5a1.5 1.5 0 0 1-1 1.415V21a1 1 0 1 1-2 0v-1.08a1.5 1.5 0 0 1-.5-2.92V9.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v7.5a1.5 1.5 0 0 1 .5 1.5Zm-5-.585V21a1 1 0 1 1-2 0v-3.085A1.5 1.5 0 1 1 13 17.915ZM9 18.5a1.5 1.5 0 0 1-1 1.415V21a1 1 0 1 1-2 0v-1.08A1.5 1.5 0 0 1 5.5 17a1.5 1.5 0 0 1 .5 2.915V9.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v7.5a1.5 1.5 0 0 1 .5 1.5ZM21 8V7H2v1a1 1 0 0 0 1 1h17a1 1 0 0 0 1-1ZM3.5 2h16A2.5 2.5 0 0 1 22 4.5v.5H1v-.5A2.5 2.5 0 0 1 3.5 2Zm13 9h-10a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 0-.5-.5Z"/></svg>' },
  { id: 'liquid', name: 'Liquid', icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M1 5.5A2.5 2.5 0 0 1 3.5 3h17A2.5 2.5 0 0 1 23 5.5v1A2.5 2.5 0 0 1 20.5 9h-17A2.5 2.5 0 0 1 1 6.5v-1Zm2 0v1a.5.5 0 0 0 .5.5h17a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-17a.5.5 0 0 0-.5.5ZM16 18.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm-11 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM3.5 11h17a.5.5 0 0 1 .5.5v4.535a3.5 3.5 0 0 0-2-.535 3.5 3.5 0 0 0-3.163 2h-5.674a3.5 3.5 0 0 0-3.163-2 3.5 3.5 0 0 0-2 .535V11.5a.5.5 0 0 1 .5-.5Z"/></svg>' },
  { id: 'tankwash', name: 'Tank Wash', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>' },
  { id: 'maintenance', name: 'Maintenance', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>' },
  { id: 'quality', name: 'Quality', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>' },
  { id: 'safety', name: 'Safety', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>' },
  { id: 'hr', name: 'HR', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>' },
  { id: 'finance', name: 'Finance', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>' },
];

export const Sidebar = ({ isOpen = true, isCollapsed = false, className = '' }: SidebarProps) => {
  const [activeDashboard, setActiveDashboard] = useState('drybulk');
  const [dashboardDropdownOpen, setDashboardDropdownOpen] = useState(false);

  const toggleDashboardDropdown = () => {
    setDashboardDropdownOpen(!dashboardDropdownOpen);
  };

  const selectDashboard = (dashboardId: string) => {
    setActiveDashboard(dashboardId);
    setDashboardDropdownOpen(false);
  };

  const currentDashboard = dashboards.find((d) => d.id === activeDashboard);
  
  // Get navigation sections for active dashboard
  const navSections = useMemo(() => {
    return navigationMap[activeDashboard] || [];
  }, [activeDashboard]);

  return (
    <aside
      className={`sidebar ${isCollapsed ? 'sidebar--collapsed' : ''} ${
        !isOpen ? 'sidebar--hidden' : ''
      } ${className}`}
    >
      {/* Dashboard Selector */}
      <div className="sidebar__dashboard-selector">
        <button
          className="sidebar__dashboard-button"
          onClick={toggleDashboardDropdown}
          aria-expanded={dashboardDropdownOpen}
        >
          <span>
            <span className="sidebar__dashboard-icon" dangerouslySetInnerHTML={{ __html: currentDashboard?.icon || '' }} />
            <span>{currentDashboard?.name}</span>
          </span>
          <span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </button>
        <div
          className={`sidebar__dashboard-dropdown ${
            dashboardDropdownOpen ? 'sidebar__dashboard-dropdown--open' : ''
          }`}
        >
          {dashboards.map((dashboard) => (
            <button
              key={dashboard.id}
              className={`sidebar__dashboard-option ${
                dashboard.id === activeDashboard ? 'sidebar__dashboard-option--active' : ''
              }`}
              onClick={() => selectDashboard(dashboard.id)}
            >
              <span dangerouslySetInnerHTML={{ __html: dashboard.icon }} />
              <span>{dashboard.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar__nav">
        {navSections.map((section) => (
          <div key={section.id} className="sidebar__section">
            <div className="sidebar__section-header">
              <span className="sidebar__section-title">{section.title}</span>
            </div>
            <div className="sidebar__section-items">
              {section.items.map((item: NavItem) => (
                <NavLink
                  key={item.id}
                  to={item.path}
                  className={({ isActive }) =>
                    `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
                  }
                >
                  {item.icon && <span className="sidebar__link-icon" dangerouslySetInnerHTML={{ __html: item.icon }} />}
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
};
