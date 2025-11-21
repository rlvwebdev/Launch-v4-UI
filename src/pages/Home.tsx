import { Link } from 'react-router-dom';
import '../styles/pages/Home.css';

export const Home = () => {
  const dashboards = [
    {
      id: 'drybulk',
      name: 'Dry Bulk',
      description: 'Manage dry bulk terminal operations, fleet, and dispatch',
      icon: '🚛',
      path: '/drybulk/terminal/overview',
      color: '#3b82f6'
    },
    {
      id: 'liquid',
      name: 'Liquid',
      description: 'Oversee liquid cargo operations and tanker fleet',
      icon: '🚢',
      path: '/liquid/terminal/overview',
      color: '#06b6d4'
    },
    {
      id: 'tankwash',
      name: 'Tank Wash',
      description: 'Schedule and manage tank cleaning operations',
      icon: '💧',
      path: '/tankwash/operations/schedule',
      color: '#14b8a6'
    },
    {
      id: 'maintenance',
      name: 'Maintenance',
      description: 'Track fleet maintenance, work orders, and inventory',
      icon: '🔧',
      path: '/maintenance/fleet/work-orders',
      color: '#8b5cf6'
    },
    {
      id: 'quality',
      name: 'Quality',
      description: 'Manage inspections, audits, and compliance',
      icon: '✓',
      path: '/quality/inspections/overview',
      color: '#10b981'
    },
    {
      id: 'safety',
      name: 'Safety',
      description: 'Monitor incidents, training, and safety compliance',
      icon: '🛡️',
      path: '/safety/incidents/overview',
      color: '#f59e0b'
    },
    {
      id: 'hr',
      name: 'Human Resources',
      description: 'Manage employees, time, and payroll',
      icon: '👥',
      path: '/hr/employees/overview',
      color: '#ec4899'
    },
    {
      id: 'finance',
      name: 'Finance',
      description: 'Track accounts, reporting, and budgeting',
      icon: '💰',
      path: '/finance/reporting/overview',
      color: '#6366f1'
    }
  ];

  return (
    <div className="home">
      <div className="home__hero">
        <h1 className="home__title">Transportation Management System</h1>
        <p className="home__subtitle">Select a dashboard to get started</p>
      </div>

      <div className="home__dashboards">
        {dashboards.map((dashboard) => (
          <Link
            key={dashboard.id}
            to={dashboard.path}
            className="home__dashboard-card"
            style={{ '--card-color': dashboard.color } as React.CSSProperties}
          >
            <div className="home__dashboard-icon">{dashboard.icon}</div>
            <h2 className="home__dashboard-name">{dashboard.name}</h2>
            <p className="home__dashboard-description">{dashboard.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
