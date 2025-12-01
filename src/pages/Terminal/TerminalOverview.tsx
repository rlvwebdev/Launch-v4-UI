import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { mockTerminals } from '../../data/mockTerminalData';
import { Main, Aside } from '../../components/layout';
import { TaskTracker, Task } from '../../components/common';
import './TerminalOverview.css';

// Custom legend component
const CustomLegend = ({ payload, icons, bgColor, textColor }: any) => {
  const filteredPayload = payload.filter((entry: any) => {
    return entry.value && entry.value.trim() !== '' && !entry.dataKey?.includes('Trend');
  });
  
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      gap: '1rem', 
      paddingTop: '10px', 
      fontSize: '10px',
      background: bgColor || 'rgba(15, 23, 42, 0.9)',
      padding: '8px 16px',
      borderRadius: '6px',
      margin: '0 auto',
      width: 'fit-content'
    }}>
      {filteredPayload.map((entry: any, index: number) => (
        <div key={`item-${index}`} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {icons && icons[entry.value] && (
            <svg width="14" height="14" viewBox="0 0 24 24" style={{ marginRight: '2px', color: entry.color }}>
              {icons[entry.value]}
            </svg>
          )}
          <span style={{ color: textColor || 'rgba(248, 250, 252, 0.98)', fontWeight: 500 }}>{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

// Mock maintenance data
interface MaintenanceItem {
  id: string;
  unit: string;
  type: 'Truck' | 'Trailer';
  issue: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Open' | 'In Progress' | 'Parts Ordered';
  daysOpen: number;
  estimatedCost: number;
  assignedTo: string;
}

const mockMaintenanceData: MaintenanceItem[] = [
  { id: 'WO-001', unit: 'T-1043', type: 'Truck', issue: 'Engine overheating', priority: 'High', status: 'In Progress', daysOpen: 3, estimatedCost: 2500, assignedTo: 'Mike J.' },
  { id: 'WO-002', unit: 'T-1087', type: 'Truck', issue: 'Brake system failure', priority: 'High', status: 'Parts Ordered', daysOpen: 5, estimatedCost: 1800, assignedTo: 'Sarah K.' },
  { id: 'WO-003', unit: 'TR-2034', type: 'Trailer', issue: 'Tire replacement needed', priority: 'Medium', status: 'Open', daysOpen: 2, estimatedCost: 800, assignedTo: 'Tom R.' },
  { id: 'WO-004', unit: 'T-1092', type: 'Truck', issue: 'Transmission slipping', priority: 'High', status: 'In Progress', daysOpen: 7, estimatedCost: 3200, assignedTo: 'Mike J.' },
  { id: 'WO-005', unit: 'TR-2056', type: 'Trailer', issue: 'Light system repair', priority: 'Low', status: 'Open', daysOpen: 1, estimatedCost: 350, assignedTo: 'Tom R.' },
  { id: 'WO-006', unit: 'T-1101', type: 'Truck', issue: 'Oil leak - gasket', priority: 'Medium', status: 'Parts Ordered', daysOpen: 4, estimatedCost: 650, assignedTo: 'Sarah K.' },
  { id: 'WO-007', unit: 'T-1055', type: 'Truck', issue: 'AC system not working', priority: 'Low', status: 'Open', daysOpen: 2, estimatedCost: 450, assignedTo: 'Mike J.' },
  { id: 'WO-008', unit: 'TR-2078', type: 'Trailer', issue: 'Door latch broken', priority: 'Medium', status: 'In Progress', daysOpen: 3, estimatedCost: 275, assignedTo: 'Tom R.' },
];

// Mock initial tasks for Terminal Overview
const mockTerminalTasks: Task[] = [
  {
    id: '1',
    title: 'Monthly Compliance Report',
    type: 'Compliance Report',
    priority: 'High',
    status: 'In Progress',
    dueDate: '2025-12-05',
    assignedTo: 'Sarah Mitchell',
    terminal: 'Columbus Terminal',
    notes: 'December safety compliance documentation',
    createdDate: '2025-12-01'
  },
  {
    id: '2',
    title: 'Daily Terminal Operations',
    type: 'Daily Terminal Report',
    priority: 'High',
    status: 'Not Started',
    dueDate: '2025-12-02',
    assignedTo: 'Mike Johnson',
    terminal: 'Columbus Terminal',
    createdDate: '2025-12-01'
  },
  {
    id: '3',
    title: 'Equipment Incident Review',
    type: 'Investigation',
    priority: 'Medium',
    status: 'Not Started',
    dueDate: '2025-12-08',
    assignedTo: 'Tom Roberts',
    terminal: 'Columbus Terminal',
    notes: 'Trailer door malfunction on 11/28',
    createdDate: '2025-11-29'
  },
  {
    id: '4',
    title: 'Driver Time-Off Request',
    type: 'HR Inquiry',
    priority: 'Low',
    status: 'Completed',
    dueDate: '2025-12-01',
    assignedTo: 'Lisa Chen',
    terminal: 'Columbus Terminal',
    createdDate: '2025-11-28'
  }
];

export const TerminalOverview = () => {
  const [selectedTerminal, setSelectedTerminal] = useState<string>('term-001');
  const [timeRange, setTimeRange] = useState<'today' | 'tomorrow' | 'weekly' | 'quarterly'>('today');
  
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    return document.documentElement.getAttribute('data-theme') !== 'light';
  });

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          const theme = document.documentElement.getAttribute('data-theme');
          setIsDarkTheme(theme !== 'light');
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);
  
  const chartTheme = {
    background: isDarkTheme ? 'rgba(15, 23, 42, 0.8)' : 'rgba(248, 250, 252, 0.9)',
    titleColor: isDarkTheme ? 'rgba(226, 232, 240, 0.9)' : 'rgba(15, 23, 42, 0.9)',
    gridColor: isDarkTheme ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
    axisColor: isDarkTheme ? 'rgba(226, 232, 240, 0.7)' : 'rgba(71, 85, 105, 0.7)',
    axisTickColor: isDarkTheme ? 'rgba(226, 232, 240, 0.9)' : 'rgba(15, 23, 42, 0.8)',
    tooltipBg: isDarkTheme ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.98)',
    tooltipBorder: isDarkTheme ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(0, 0, 0, 0.2)',
    tooltipColor: isDarkTheme ? '#fff' : '#0f172a',
    legendBg: isDarkTheme ? 'rgba(15, 23, 42, 0.85)' : 'rgba(15, 23, 42, 0.9)',
    legendColor: isDarkTheme ? 'rgba(226, 232, 240, 0.95)' : 'rgba(248, 250, 252, 0.98)',
  };

  const terminal = mockTerminals.find(t => t.id === selectedTerminal) || mockTerminals[0];
  const data = terminal.today;

  // Generate chart data based on time range
  const generateChartData = () => {
    const baseData = terminal.today;
    
    switch (timeRange) {
      case 'today': {
        const hours = ['12AM', '4AM', '8AM', '12PM', '4PM', '8PM'];
        return hours.map((hour, idx) => {
          const multiplier = idx >= 2 && idx <= 4 ? 0.9 + Math.random() * 0.2 : 0.4 + Math.random() * 0.3;
          return {
            time: hour,
            loads: Math.round(baseData.loadsShipping * multiplier),
            trucks: Math.round(baseData.trucksOperational * multiplier),
            drivers: Math.round(baseData.driversAssigned * multiplier),
          };
        });
      }
      case 'tomorrow': {
        const hours = ['12AM', '4AM', '8AM', '12PM', '4PM', '8PM'];
        return hours.map((hour, idx) => {
          const multiplier = idx >= 2 && idx <= 4 ? 0.85 + Math.random() * 0.2 : 0.35 + Math.random() * 0.3;
          return {
            time: hour,
            loads: Math.round(baseData.loadsShipping * multiplier),
            trucks: Math.round(baseData.trucksOperational * multiplier),
            drivers: Math.round(baseData.driversAssigned * multiplier),
          };
        });
      }
      case 'weekly': {
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        return days.map((day, idx) => {
          const multiplier = idx < 5 ? 0.85 + Math.random() * 0.3 : 0.5 + Math.random() * 0.2;
          return {
            time: day,
            loads: Math.round(baseData.loadsShipping * multiplier),
            trucks: Math.round(baseData.trucksOperational * multiplier),
            drivers: Math.round(baseData.driversAssigned * multiplier),
          };
        });
      }
      case 'quarterly': {
        const weeks = Array.from({ length: 13 }, (_, i) => `W${i + 1}`);
        return weeks.map(() => {
          const multiplier = 0.7 + Math.random() * 0.5;
          return {
            time: weeks[Math.floor(Math.random() * weeks.length)],
            loads: Math.round(baseData.loadsShipping * multiplier * 7),
            trucks: Math.round(baseData.trucksOperational * multiplier),
            drivers: Math.round(baseData.driversAssigned * multiplier),
          };
        });
      }
      default:
        return [];
    }
  };

  const chartData = generateChartData();

  // Maintenance summary
  const maintenanceStats = {
    total: mockMaintenanceData.length,
    high: mockMaintenanceData.filter(m => m.priority === 'High').length,
    trucks: mockMaintenanceData.filter(m => m.type === 'Truck').length,
    trailers: mockMaintenanceData.filter(m => m.type === 'Trailer').length,
    totalCost: mockMaintenanceData.reduce((sum, m) => sum + m.estimatedCost, 0),
  };

  return (
    <>
      <Main>
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">Terminal Overview - {terminal.name}</h1>
          <p className="page-subtitle">Operations and maintenance tracking</p>
        </div>

        {/* Controls */}
        <div className="dashboard-filters">
          <select 
            className="terminal-selector"
            value={selectedTerminal}
            onChange={(e) => setSelectedTerminal(e.target.value)}
            style={{
              padding: '0.625rem 1rem',
              border: '1px solid var(--border-color)',
              borderRadius: '6px',
              background: 'var(--card-background)',
              color: 'var(--text-primary)',
              fontSize: '0.875rem',
              fontWeight: 500,
              cursor: 'pointer',
              minWidth: '200px',
            }}
          >
            {mockTerminals.map(t => (
              <option key={t.id} value={t.id}>📍 {t.name} ({t.region})</option>
            ))}
          </select>

          <div className="day-toggle">
            <button 
              className={`day-toggle__btn ${timeRange === 'today' ? 'day-toggle__btn--active' : ''}`}
              onClick={() => setTimeRange('today')}
              style={{ minWidth: '80px' }}
            >
              Today
            </button>
            <button 
              className={`day-toggle__btn ${timeRange === 'tomorrow' ? 'day-toggle__btn--active' : ''}`}
              onClick={() => setTimeRange('tomorrow')}
              style={{ minWidth: '80px' }}
            >
              Tomorrow
            </button>
            <button 
              className={`day-toggle__btn ${timeRange === 'weekly' ? 'day-toggle__btn--active' : ''}`}
              onClick={() => setTimeRange('weekly')}
              style={{ minWidth: '80px' }}
            >
              Week
            </button>
            <button 
              className={`day-toggle__btn ${timeRange === 'quarterly' ? 'day-toggle__btn--active' : ''}`}
              onClick={() => setTimeRange('quarterly')}
              style={{ minWidth: '80px' }}
            >
              Quarter
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ 
            background: chartTheme.background, 
            padding: '1rem', 
            borderRadius: '8px', 
            border: '1px solid var(--border-color)' 
          }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: 600 }}>LOADS TODAY</div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: chartTheme.titleColor }}>{data.loadsShipping + data.loadsDelivering}</div>
            <div style={{ fontSize: '0.75rem', color: '#4ade80' }}>↑ {data.loadsOpen} Open</div>
          </div>

          <div style={{ 
            background: chartTheme.background, 
            padding: '1rem', 
            borderRadius: '8px', 
            border: '1px solid var(--border-color)' 
          }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: 600 }}>TRUCKS OPERATIONAL</div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: chartTheme.titleColor }}>{data.trucksOperational}</div>
            <div style={{ fontSize: '0.75rem', color: '#fb923c' }}>{data.trucksOOS} OOS</div>
          </div>

          <div style={{ 
            background: chartTheme.background, 
            padding: '1rem', 
            borderRadius: '8px', 
            border: '1px solid var(--border-color)' 
          }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: 600 }}>DRIVERS ASSIGNED</div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: chartTheme.titleColor }}>{data.driversAssigned}</div>
            <div style={{ fontSize: '0.75rem', color: '#4ade80' }}>{data.driversAvailable} Available</div>
          </div>

          <div style={{ 
            background: chartTheme.background, 
            padding: '1rem', 
            borderRadius: '8px', 
            border: '1px solid var(--border-color)' 
          }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: 600 }}>ON-TIME DELIVERY</div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: chartTheme.titleColor }}>{data.onTimeDelivery}%</div>
            <div style={{ fontSize: '0.75rem', color: '#4ade80' }}>Above 90% target</div>
          </div>

          <div style={{ 
            background: chartTheme.background, 
            padding: '1rem', 
            borderRadius: '8px', 
            border: '1px solid var(--border-color)' 
          }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: 600 }}>OPEN WORK ORDERS</div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: chartTheme.titleColor }}>{maintenanceStats.total}</div>
            <div style={{ fontSize: '0.75rem', color: '#ef4444' }}>{maintenanceStats.high} High Priority</div>
          </div>

          <div style={{ 
            background: chartTheme.background, 
            padding: '1rem', 
            borderRadius: '8px', 
            border: '1px solid var(--border-color)' 
          }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: 600 }}>MAINTENANCE COST</div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: chartTheme.titleColor }}>${(maintenanceStats.totalCost / 1000).toFixed(1)}K</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Estimated total</div>
          </div>
        </div>

        {/* Charts */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ background: chartTheme.background, padding: '1.25rem', borderRadius: '8px' }}>
            <h3 style={{ color: chartTheme.titleColor, marginBottom: '1rem', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>📦 Activity Trend</h3>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.gridColor} />
                <XAxis dataKey="time" stroke={chartTheme.axisColor} style={{ fontSize: '11px' }} tick={{ fill: chartTheme.axisTickColor }} />
                <YAxis stroke={chartTheme.axisColor} style={{ fontSize: '10px' }} tick={{ fill: chartTheme.axisTickColor }} />
                <Tooltip contentStyle={{ backgroundColor: chartTheme.tooltipBg, border: chartTheme.tooltipBorder, borderRadius: '4px', color: chartTheme.tooltipColor }} />
                <Legend content={<CustomLegend bgColor={chartTheme.legendBg} textColor={chartTheme.legendColor} icons={null} />} />
                <Line type="monotone" dataKey="loads" stroke="#86efac" strokeWidth={2.5} dot={{ r: 4 }} name="Loads" />
                <Line type="monotone" dataKey="trucks" stroke="#60a5fa" strokeWidth={2.5} dot={{ r: 4 }} name="Trucks" />
                <Line type="monotone" dataKey="drivers" stroke="#fbbf24" strokeWidth={2.5} dot={{ r: 4 }} name="Drivers" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div style={{ background: chartTheme.background, padding: '1.25rem', borderRadius: '8px' }}>
            <h3 style={{ color: chartTheme.titleColor, marginBottom: '1rem', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>🔧 Maintenance by Priority</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={[
                { priority: 'High', count: maintenanceStats.high, fill: '#ef4444' },
                { priority: 'Medium', count: mockMaintenanceData.filter(m => m.priority === 'Medium').length, fill: '#fbbf24' },
                { priority: 'Low', count: mockMaintenanceData.filter(m => m.priority === 'Low').length, fill: '#4ade80' },
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.gridColor} />
                <XAxis dataKey="priority" stroke={chartTheme.axisColor} style={{ fontSize: '11px' }} tick={{ fill: chartTheme.axisTickColor }} />
                <YAxis stroke={chartTheme.axisColor} style={{ fontSize: '10px' }} tick={{ fill: chartTheme.axisTickColor }} />
                <Tooltip contentStyle={{ backgroundColor: chartTheme.tooltipBg, border: chartTheme.tooltipBorder, borderRadius: '4px', color: chartTheme.tooltipColor }} />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {[
                    { priority: 'High', count: maintenanceStats.high, fill: '#ef4444' },
                    { priority: 'Medium', count: mockMaintenanceData.filter(m => m.priority === 'Medium').length, fill: '#fbbf24' },
                    { priority: 'Low', count: mockMaintenanceData.filter(m => m.priority === 'Low').length, fill: '#4ade80' },
                  ].map((entry, index) => (
                    <cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Maintenance Work Orders Table */}
        <div style={{ background: chartTheme.background, padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ color: chartTheme.titleColor, fontSize: '1rem', fontWeight: 600 }}>🔧 Open Shop Repair Orders</h3>
            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              <span>🚛 {maintenanceStats.trucks} Trucks</span>
              <span>🚚 {maintenanceStats.trailers} Trailers</span>
            </div>
          </div>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ 
              width: '100%', 
              borderCollapse: 'collapse',
              fontSize: '0.875rem',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Inter", "Roboto", "Helvetica Neue", Arial, sans-serif'
            }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                  <th style={{ textAlign: 'left', padding: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.8125rem' }}>WO #</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.8125rem' }}>UNIT</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.8125rem' }}>TYPE</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.8125rem' }}>ISSUE</th>
                  <th style={{ textAlign: 'center', padding: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.8125rem' }}>PRIORITY</th>
                  <th style={{ textAlign: 'center', padding: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.8125rem' }}>STATUS</th>
                  <th style={{ textAlign: 'center', padding: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.8125rem' }}>DAYS OPEN</th>
                  <th style={{ textAlign: 'right', padding: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.8125rem' }}>EST. COST</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.8125rem' }}>ASSIGNED TO</th>
                </tr>
              </thead>
              <tbody>
                {mockMaintenanceData.map((item) => (
                  <tr key={item.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '0.75rem', color: chartTheme.titleColor, fontWeight: 600 }}>{item.id}</td>
                    <td style={{ padding: '0.75rem', color: chartTheme.titleColor, fontWeight: 600 }}>{item.unit}</td>
                    <td style={{ padding: '0.75rem', color: chartTheme.titleColor }}>{item.type}</td>
                    <td style={{ padding: '0.75rem', color: chartTheme.titleColor }}>{item.issue}</td>
                    <td style={{ 
                      padding: '0.75rem', 
                      textAlign: 'center',
                      color: item.priority === 'High' ? '#ef4444' : item.priority === 'Medium' ? '#fbbf24' : '#4ade80',
                      fontWeight: 600
                    }}>
                      {item.priority}
                    </td>
                    <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        background: item.status === 'Open' ? 'rgba(239, 68, 68, 0.15)' : 
                                   item.status === 'In Progress' ? 'rgba(251, 146, 60, 0.15)' : 
                                   'rgba(74, 222, 128, 0.15)',
                        color: item.status === 'Open' ? '#ef4444' : 
                               item.status === 'In Progress' ? '#fb923c' : 
                               '#4ade80'
                      }}>
                        {item.status}
                      </span>
                    </td>
                    <td style={{ 
                      padding: '0.75rem', 
                      textAlign: 'center',
                      color: item.daysOpen > 5 ? '#ef4444' : chartTheme.titleColor,
                      fontWeight: item.daysOpen > 5 ? 600 : 500
                    }}>
                      {item.daysOpen}
                    </td>
                    <td style={{ padding: '0.75rem', textAlign: 'right', color: chartTheme.titleColor, fontWeight: 500 }}>
                      ${item.estimatedCost.toLocaleString()}
                    </td>
                    <td style={{ padding: '0.75rem', color: chartTheme.titleColor }}>{item.assignedTo}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr style={{ borderTop: '2px solid var(--border-color)', fontWeight: 700 }}>
                  <td colSpan={7} style={{ padding: '0.75rem', color: chartTheme.titleColor, textAlign: 'right' }}>TOTAL ESTIMATED COST:</td>
                  <td style={{ padding: '0.75rem', textAlign: 'right', color: '#fbbf24', fontWeight: 700 }}>
                    ${maintenanceStats.totalCost.toLocaleString()}
                  </td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
      </Main>
      <Aside>
        <TaskTracker 
          title="Terminal Tasks" 
          defaultTerminal="Columbus Terminal"
          initialTasks={mockTerminalTasks}
        />
      </Aside>
    </>
  );
};
