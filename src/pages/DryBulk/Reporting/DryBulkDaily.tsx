import React, { useState } from 'react';
import { mockTerminals, type TerminalData } from '../../../data/mockTerminalData';
import '../../../styles/pages/DryBulkDaily.css';

interface DryBulkDailyProps {
  activeDay: 'today' | 'tomorrow';
  onDayChange: (day: 'today' | 'tomorrow') => void;
}

// Seeded random function for consistent fake data
const seededRandom = (seed: string) => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    hash = hash & hash;
  }
  return () => {
    hash = (hash * 9301 + 49297) % 233280;
    return hash / 233280;
  };
};

export const DryBulkDaily: React.FC<DryBulkDailyProps> = ({ activeDay, onDayChange }) => {
  const [expandedTerminals, setExpandedTerminals] = useState<Set<string>>(new Set());
  const [expandedLoads, setExpandedLoads] = useState<Set<string>>(new Set());
  const filterView = 'all'; // Always show all terminals
  const [selectedView, setSelectedView] = useState<'division' | string>('division'); // 'division' or region name
  
  // Use mock terminal data
  const terminals: TerminalData[] = mockTerminals;

  const toggleTerminal = (terminalId: string) => {
    setExpandedTerminals(prev => {
      const newSet = new Set(prev);
      if (newSet.has(terminalId)) {
        newSet.delete(terminalId);
      } else {
        newSet.add(terminalId);
      }
      return newSet;
    });
  };

  const toggleLoad = (loadId: string) => {
    setExpandedLoads(prev => {
      const newSet = new Set(prev);
      if (newSet.has(loadId)) {
        newSet.delete(loadId);
      } else {
        newSet.add(loadId);
      }
      return newSet;
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  // Group terminals by region
  const terminalsByRegion = terminals.reduce((acc, terminal) => {
    if (!acc[terminal.region]) {
      acc[terminal.region] = [];
    }
    acc[terminal.region].push(terminal);
    return acc;
  }, {} as Record<string, TerminalData[]>);

  // Calculate totals for a set of terminals
  const calculateRegionTotals = (regionTerminals: TerminalData[]) => {
    if (activeDay === 'today') {
      return {
        loadsShipping: regionTerminals.reduce((sum, t) => sum + t.today.loadsShipping, 0),
        loadsDelivering: regionTerminals.reduce((sum, t) => sum + t.today.loadsDelivering, 0),
        loadsOpen: regionTerminals.reduce((sum, t) => sum + t.today.loadsOpen, 0),
        loadEvents: regionTerminals.reduce((sum, t) => sum + t.today.loadEvents, 0),
        trucksAssigned: regionTerminals.reduce((sum, t) => sum + t.today.trucksAssigned, 0),
        trucksOperational: regionTerminals.reduce((sum, t) => sum + t.today.trucksOperational, 0),
        trucksOOS: regionTerminals.reduce((sum, t) => sum + t.today.trucksOOS, 0),
        trucksLTD: regionTerminals.reduce((sum, t) => sum + t.today.trucksLTD, 0),
        trucksAvailable: regionTerminals.reduce((sum, t) => sum + t.today.trucksAvailable, 0),
        trailersAvailable: regionTerminals.reduce((sum, t) => sum + t.today.trailersAvailable, 0),
        trailersOOS: regionTerminals.reduce((sum, t) => sum + t.today.trailersOOS, 0),
        driversAssigned: regionTerminals.reduce((sum, t) => sum + t.today.driversAssigned, 0),
        driversAvailable: regionTerminals.reduce((sum, t) => sum + t.today.driversAvailable, 0),
        driversSitting: regionTerminals.reduce((sum, t) => sum + t.today.driversSitting, 0),
        driverCallouts: regionTerminals.reduce((sum, t) => sum + t.today.driverCallouts, 0),
        totalMiles: regionTerminals.reduce((sum, t) => sum + t.today.totalMiles, 0),
        estimatedRevenue: regionTerminals.reduce((sum, t) => sum + t.today.estimatedRevenue, 0),
        avgOTD: Math.round(regionTerminals.reduce((sum, t) => sum + t.today.onTimeDelivery, 0) / regionTerminals.length),
        avgFSC: regionTerminals.reduce((sum, t) => sum + t.today.fuelSurchargeRate, 0) / regionTerminals.length,
      };
    } else {
      return {
        loadsShipping: regionTerminals.reduce((sum, t) => sum + t.tomorrow.loadsShipping, 0),
        loadsDelivering: regionTerminals.reduce((sum, t) => sum + t.tomorrow.loadsDelivering, 0),
        loadsOpen: regionTerminals.reduce((sum, t) => sum + t.tomorrow.loadsOpen, 0),
        loadEvents: regionTerminals.reduce((sum, t) => sum + t.tomorrow.loadEvents, 0),
        trucksAssigned: regionTerminals.reduce((sum, t) => sum + t.tomorrow.trucksAssigned, 0),
        trucksOperational: regionTerminals.reduce((sum, t) => sum + t.tomorrow.trucksOperational, 0),
        trucksOOS: regionTerminals.reduce((sum, t) => sum + t.tomorrow.trucksOOS, 0),
        trucksLTD: regionTerminals.reduce((sum, t) => sum + t.tomorrow.trucksLTD, 0),
        trucksAvailable: regionTerminals.reduce((sum, t) => sum + t.tomorrow.trucksAvailable, 0),
        trailersAvailable: regionTerminals.reduce((sum, t) => sum + t.tomorrow.trailersAvailable, 0),
        trailersOOS: regionTerminals.reduce((sum, t) => sum + t.tomorrow.trailersOOS, 0),
        driversAssigned: regionTerminals.reduce((sum, t) => sum + t.tomorrow.driversAssigned, 0),
        driversAvailable: regionTerminals.reduce((sum, t) => sum + t.tomorrow.driversAvailable, 0),
        driversSitting: regionTerminals.reduce((sum, t) => sum + t.tomorrow.driversSitting, 0),
        driverCallouts: regionTerminals.reduce((sum, t) => sum + t.tomorrow.driverCallouts, 0),
      };
    }
  };

  return (
    <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">Dry Bulk Daily</h1>
          <p className="page-subtitle">Daily terminal availability and operations dashboard</p>
        </div>

        <div className="dashboard-filters">
          <select 
            className="region-selector"
            value={selectedView}
            onChange={(e) => setSelectedView(e.target.value)}
          >
            <option value="division">📊 Division View</option>
            {Object.keys(terminalsByRegion).sort().map(region => (
              <option key={region} value={region}>📍 {region}</option>
            ))}
          </select>

          <div className="day-toggle">
            <button 
              className={`day-toggle__btn ${activeDay === 'today' ? 'day-toggle__btn--active' : ''}`}
              onClick={() => onDayChange('today')}
            >
              Today
            </button>
            <button 
              className={`day-toggle__btn ${activeDay === 'tomorrow' ? 'day-toggle__btn--active' : ''}`}
              onClick={() => onDayChange('tomorrow')}
            >
              Tomorrow
            </button>
          </div>
        </div>

        {/* Division Totals */}
        {selectedView === 'division' && (
        <div className="division-totals">
          <h2 className="division-title">Dry Bulk Division Totals</h2>
          <div className="terminal-table-wrapper">
            <table className="terminal-table">
              <thead>
                <tr>
                  <th>Division</th>
                  <th title="Loads Shipping" className="section-end">
                    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="#86efac" strokeWidth="3">
                      <path d="M12 19V5M5 12l7-7 7 7"/>
                    </svg>
                    <span className="th-label">LLD</span>
                  </th>
                  <th title="Loads Delivering">
                    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="#c084fc" strokeWidth="3">
                      <path d="M12 5v14M5 12l7 7 7-7"/>
                    </svg>
                    <span className="th-label">LUL</span>
                  </th>
                  <th title="Loads Open">
                    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="3">
                      <rect x="3" y="3" width="18" height="18"/>
                    </svg>
                    <span className="th-label">OPN</span>
                  </th>
                  <th title="Load Events" className="section-end">
                    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="3">
                      <path d="M12 2L2 20h20L12 2z"/>
                      <path d="M12 9v4" stroke="#ef4444" strokeWidth="2"/>
                      <circle cx="12" cy="17" r="1" fill="#ef4444"/>
                    </svg>
                    <span className="th-label">EVT</span>
                  </th>
                  <th title="Trucks Assigned">
                    <svg className="icon" viewBox="0 0 24 24" fill="#94a3b8" stroke="none">
                      <rect x="1" y="8" width="14" height="8"/>
                      <path d="M15 8h4l2 3v3h-2M8 19h6"/>
                      <circle cx="6" cy="19" r="2"/>
                      <circle cx="18" cy="19" r="2"/>
                    </svg>
                    <span className="th-label">ASN</span>
                  </th>
                  <th title="Trucks Operational">
                    <svg className="icon" viewBox="0 0 24 24" fill="#4ade80" stroke="none">
                      <rect x="1" y="8" width="14" height="8"/>
                      <path d="M15 8h4l2 3v3h-2M8 19h6"/>
                      <circle cx="6" cy="19" r="2"/>
                      <circle cx="18" cy="19" r="2"/>
                    </svg>
                    <span className="th-label">OPR</span>
                  </th>
                  <th title="Trucks Out of Service">
                    <svg className="icon" viewBox="0 0 24 24" fill="#fb923c" stroke="none">
                      <rect x="1" y="8" width="14" height="8"/>
                      <path d="M15 8h4l2 3v3h-2M8 19h6"/>
                      <circle cx="6" cy="19" r="2"/>
                      <circle cx="18" cy="19" r="2"/>
                    </svg>
                    <span className="th-label">OOS</span>
                  </th>
                  <th title="Long Term Down">
                    <svg className="icon" viewBox="0 0 24 24" fill="#ef4444" stroke="none">
                      <rect x="1" y="8" width="14" height="8"/>
                      <path d="M15 8h4l2 3v3h-2M8 19h6"/>
                      <circle cx="6" cy="19" r="2"/>
                      <circle cx="18" cy="19" r="2"/>
                    </svg>
                    <span className="th-label">LTD</span>
                  </th>
                  <th title="Trucks Available" className="section-end">
                    <svg className="icon" viewBox="0 0 24 24" fill="#4ade80" stroke="none">
                      <rect x="1" y="8" width="14" height="8"/>
                      <path d="M15 8h4l2 3v3h-2M8 19h6"/>
                      <circle cx="6" cy="19" r="2"/>
                      <circle cx="18" cy="19" r="2"/>
                    </svg>
                    <span className="th-label">AVL</span>
                  </th>
                  <th title="Trailers Available">
                    <svg className="icon" viewBox="0 0 24 24" fill="#4ade80" stroke="none">
                      <rect x="1" y="9" width="18" height="8"/>
                      <circle cx="6" cy="20" r="2"/>
                      <circle cx="14" cy="20" r="2"/>
                    </svg>
                    <span className="th-label">AVL</span>
                  </th>
                  <th title="Trailers Out of Service" className="section-end">
                    <svg className="icon" viewBox="0 0 24 24" fill="#fb923c" stroke="none">
                      <rect x="1" y="9" width="18" height="8"/>
                      <circle cx="6" cy="20" r="2"/>
                      <circle cx="14" cy="20" r="2"/>
                    </svg>
                    <span className="th-label">OOS</span>
                  </th>
                  <th title="Drivers Assigned">
                    <svg className="icon" viewBox="0 0 24 24" fill="#94a3b8" stroke="none">
                      <circle cx="12" cy="8" r="4"/>
                      <path d="M4 20c0-4 4-6 8-6s8 2 8 6"/>
                    </svg>
                    <span className="th-label">ASN</span>
                  </th>
                  <th title="Drivers Available">
                    <svg className="icon" viewBox="0 0 24 24" fill="#4ade80" stroke="none">
                      <circle cx="12" cy="8" r="4"/>
                      <path d="M4 20c0-4 4-6 8-6s8 2 8 6"/>
                    </svg>
                    <span className="th-label">AVL</span>
                  </th>
                  <th title="Drivers Sitting">
                    <svg className="icon" viewBox="0 0 24 24" fill="#94a3b8" stroke="none">
                      <circle cx="12" cy="8" r="4"/>
                      <path d="M4 20c0-4 4-6 8-6s8 2 8 6"/>
                    </svg>
                    <span className="th-label">SIT</span>
                  </th>
                  <th title="Driver Home Time">
                    <svg className="icon" viewBox="0 0 24 24" fill="#ef4444" stroke="none">
                      <circle cx="12" cy="8" r="4"/>
                      <path d="M4 20c0-4 4-6 8-6s8 2 8 6"/>
                    </svg>
                    <span className="th-label">HME</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(terminalsByRegion).map(([region, regionTerminals]) => {
                  const regionTotals = calculateRegionTotals(regionTerminals);
                  return (
                    <tr key={region} className="totals-row">
                      <td className="terminal-name">{region}</td>
                      <td className="section-end">{regionTotals.loadsShipping}</td>
                      <td>{regionTotals.loadsDelivering}</td>
                      <td>{regionTotals.loadsOpen}</td>
                      <td className="section-end" style={{color: 'var(--data-red)'}}>{regionTotals.loadEvents}</td>
                      <td>{regionTotals.trucksAssigned}</td>
                      <td style={{color: 'var(--data-green)'}}>{regionTotals.trucksOperational}</td>
                      <td style={{color: 'var(--data-orange)'}}>{regionTotals.trucksOOS}</td>
                      <td style={{color: 'var(--data-red)'}}>{regionTotals.trucksLTD}</td>
                      <td className="section-end" style={{color: 'var(--data-green)'}}>{regionTotals.trucksAvailable}</td>
                      <td style={{color: 'var(--data-green)'}}>{regionTotals.trailersAvailable}</td>
                      <td className="section-end" style={{color: 'var(--data-orange)'}}>{regionTotals.trailersOOS}</td>
                      <td>{regionTotals.driversAssigned}</td>
                      <td style={{color: 'var(--data-green)'}}>{regionTotals.driversAvailable}</td>
                      <td>{regionTotals.driversSitting}</td>
                      <td style={{color: 'var(--data-red)'}}>{regionTotals.driverCallouts}</td>
                    </tr>
                  );
                })}
                <tr className="totals-row" style={{borderTop: '2px solid var(--border-color)', marginTop: '0.5rem'}}>
                  <td className="terminal-name">Division Total</td>
                  <td className="section-end">{Object.values(terminalsByRegion).flat().reduce((sum, t) => sum + (activeDay === 'today' ? t.today.loadsShipping : t.tomorrow.loadsShipping), 0)}</td>
                  <td>{Object.values(terminalsByRegion).flat().reduce((sum, t) => sum + (activeDay === 'today' ? t.today.loadsDelivering : t.tomorrow.loadsDelivering), 0)}</td>
                  <td>{Object.values(terminalsByRegion).flat().reduce((sum, t) => sum + (activeDay === 'today' ? t.today.loadsOpen : t.tomorrow.loadsOpen), 0)}</td>
                  <td className="section-end" style={{color: 'var(--data-red)'}}>{Object.values(terminalsByRegion).flat().reduce((sum, t) => sum + (activeDay === 'today' ? t.today.loadEvents : t.tomorrow.loadEvents), 0)}</td>
                  <td>{Object.values(terminalsByRegion).flat().reduce((sum, t) => sum + (activeDay === 'today' ? t.today.trucksAssigned : t.tomorrow.trucksAssigned), 0)}</td>
                  <td style={{color: 'var(--data-green)'}}>{Object.values(terminalsByRegion).flat().reduce((sum, t) => sum + (activeDay === 'today' ? t.today.trucksOperational : t.tomorrow.trucksOperational), 0)}</td>
                  <td style={{color: 'var(--data-orange)'}}>{Object.values(terminalsByRegion).flat().reduce((sum, t) => sum + (activeDay === 'today' ? t.today.trucksOOS : t.tomorrow.trucksOOS), 0)}</td>
                  <td style={{color: 'var(--data-red)'}}>{Object.values(terminalsByRegion).flat().reduce((sum, t) => sum + (activeDay === 'today' ? t.today.trucksLTD : t.tomorrow.trucksLTD), 0)}</td>
                  <td className="section-end" style={{color: 'var(--data-green)'}}>{Object.values(terminalsByRegion).flat().reduce((sum, t) => sum + (activeDay === 'today' ? t.today.trucksAvailable : t.tomorrow.trucksAvailable), 0)}</td>
                  <td style={{color: 'var(--data-green)'}}>{Object.values(terminalsByRegion).flat().reduce((sum, t) => sum + (activeDay === 'today' ? t.today.trailersAvailable : t.tomorrow.trailersAvailable), 0)}</td>
                  <td className="section-end" style={{color: 'var(--data-orange)'}}>{Object.values(terminalsByRegion).flat().reduce((sum, t) => sum + (activeDay === 'today' ? t.today.trailersOOS : t.tomorrow.trailersOOS), 0)}</td>
                  <td>{Object.values(terminalsByRegion).flat().reduce((sum, t) => sum + (activeDay === 'today' ? t.today.driversAssigned : t.tomorrow.driversAssigned), 0)}</td>
                  <td style={{color: 'var(--data-green)'}}>{Object.values(terminalsByRegion).flat().reduce((sum, t) => sum + (activeDay === 'today' ? t.today.driversAvailable : t.tomorrow.driversAvailable), 0)}</td>
                  <td>{Object.values(terminalsByRegion).flat().reduce((sum, t) => sum + (activeDay === 'today' ? t.today.driversSitting : t.tomorrow.driversSitting), 0)}</td>
                  <td style={{color: 'var(--data-red)'}}>{Object.values(terminalsByRegion).flat().reduce((sum, t) => sum + (activeDay === 'today' ? t.today.driverCallouts : t.tomorrow.driverCallouts), 0)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        )}

        {Object.entries(terminalsByRegion)
          .filter(([region]) => selectedView === 'division' || selectedView === region)
          .map(([region, regionTerminals]) => {
          // Filter terminals based on selected view
          const filteredTerminals = regionTerminals.filter(terminal => {
            const data = activeDay === 'today' ? terminal.today : terminal.tomorrow;
            if (filterView === 'all') return true;
            if (filterView === 'openLoads') return data.loadsOpen > 0;
            if (filterView === 'trucksOOS') return data.trucksOOS > 0;
            if (filterView === 'trailersOOS') return data.trailersOOS > 0;
            return true;
          });

          // Skip rendering region if no terminals match filter
          if (filteredTerminals.length === 0) return null;

          const regionTotals = calculateRegionTotals(filteredTerminals);
          return (
          <div key={region} className="region-container">
            <div className="terminal-table-wrapper">
              <table className="terminal-table">
                <thead>
                  <tr>
                    <th>{region}</th>
                    <th title="Loads Shipping" className="section-end"><svg className="icon" viewBox="0 0 24 24" fill="none" stroke="#86efac" strokeWidth="3"><path d="M12 19V5M5 12l7-7 7 7"/></svg><span className="th-label">LLD</span></th>
                    <th title="Loads Delivering"><svg className="icon" viewBox="0 0 24 24" fill="none" stroke="#c084fc" strokeWidth="3"><path d="M12 5v14M5 12l7 7 7-7"/></svg><span className="th-label">LUL</span></th>
                    <th title="Loads Open"><svg className="icon" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="3"><rect x="3" y="3" width="18" height="18"/></svg><span className="th-label">OPN</span></th>
                    <th title="Load Events" className="section-end"><svg className="icon" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="3"><path d="M12 2L2 20h20L12 2z"/><path d="M12 9v4" stroke="#ef4444" strokeWidth="2"/><circle cx="12" cy="17" r="1" fill="#ef4444"/></svg><span className="th-label">EVT</span></th>
                    <th title="Trucks Assigned"><svg className="icon" viewBox="0 0 24 24" fill="#94a3b8" stroke="none"><rect x="1" y="8" width="14" height="8"/><path d="M15 8h4l2 3v3h-2M8 19h6"/><circle cx="6" cy="19" r="2"/><circle cx="18" cy="19" r="2"/></svg><span className="th-label">ASN</span></th>
                    <th title="Trucks Operational"><svg className="icon" viewBox="0 0 24 24" fill="#4ade80" stroke="none"><rect x="1" y="8" width="14" height="8"/><path d="M15 8h4l2 3v3h-2M8 19h6"/><circle cx="6" cy="19" r="2"/><circle cx="18" cy="19" r="2"/></svg><span className="th-label">OPR</span></th>
                    <th title="Trucks Out of Service"><svg className="icon" viewBox="0 0 24 24" fill="#fb923c" stroke="none"><rect x="1" y="8" width="14" height="8"/><path d="M15 8h4l2 3v3h-2M8 19h6"/><circle cx="6" cy="19" r="2"/><circle cx="18" cy="19" r="2"/></svg><span className="th-label">OOS</span></th>
                    <th title="Long Term Down"><svg className="icon" viewBox="0 0 24 24" fill="#ef4444" stroke="none"><rect x="1" y="8" width="14" height="8"/><path d="M15 8h4l2 3v3h-2M8 19h6"/><circle cx="6" cy="19" r="2"/><circle cx="18" cy="19" r="2"/></svg><span className="th-label">LTD</span></th>
                    <th title="Trucks Available" className="section-end"><svg className="icon" viewBox="0 0 24 24" fill="#4ade80" stroke="none"><rect x="1" y="8" width="14" height="8"/><path d="M15 8h4l2 3v3h-2M8 19h6"/><circle cx="6" cy="19" r="2"/><circle cx="18" cy="19" r="2"/></svg><span className="th-label">AVL</span></th>
                    <th title="Trailers Available"><svg className="icon" viewBox="0 0 24 24" fill="#4ade80" stroke="none"><rect x="1" y="9" width="18" height="8"/><circle cx="6" cy="20" r="2"/><circle cx="14" cy="20" r="2"/></svg><span className="th-label">AVL</span></th>
                    <th title="Trailers Out of Service" className="section-end"><svg className="icon" viewBox="0 0 24 24" fill="#fb923c" stroke="none"><rect x="1" y="9" width="18" height="8"/><circle cx="6" cy="20" r="2"/><circle cx="14" cy="20" r="2"/></svg><span className="th-label">OOS</span></th>
                    <th title="Drivers Assigned"><svg className="icon" viewBox="0 0 24 24" fill="#94a3b8" stroke="none"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6"/></svg><span className="th-label">ASN</span></th>
                    <th title="Drivers Available"><svg className="icon" viewBox="0 0 24 24" fill="#4ade80" stroke="none"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6"/></svg><span className="th-label">AVL</span></th>
                    <th title="Drivers Sitting"><svg className="icon" viewBox="0 0 24 24" fill="#94a3b8" stroke="none"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6"/></svg><span className="th-label">SIT</span></th>
                    <th title="Driver Home Time"><svg className="icon" viewBox="0 0 24 24" fill="#ef4444" stroke="none"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6"/></svg><span className="th-label">HME</span></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTerminals.map((terminal) => {
                    const data = activeDay === 'today' ? terminal.today : terminal.tomorrow;
                    const isExpanded = expandedTerminals.has(terminal.id);
                    return (
                      <React.Fragment key={terminal.id}>
                        <tr className="terminal-row" onClick={() => toggleTerminal(terminal.id)}>
                          <td className="terminal-name">
                            <span className="expand-icon">{isExpanded ? '▼' : '▶'}</span>
                            {terminal.name}
                          </td>
                          <td className="section-end">{data.loadsShipping}</td>
                          <td>{data.loadsDelivering}</td>
                          <td>{data.loadsOpen}</td>
                          <td className="section-end" style={{color: 'var(--data-red)'}}>{data.loadEvents}</td>
                          <td>{data.trucksAssigned}</td>
                          <td style={{color: 'var(--data-green)'}}>{data.trucksOperational}</td>
                          <td style={{color: 'var(--data-orange)'}}>{data.trucksOOS}</td>
                          <td style={{color: 'var(--data-red)'}}>{data.trucksLTD}</td>
                          <td className="section-end" style={{color: 'var(--data-green)'}}>{data.trucksAvailable}</td>
                          <td style={{color: 'var(--data-green)'}}>{data.trailersAvailable}</td>
                          <td className="section-end" style={{color: 'var(--data-orange)'}}>{data.trailersOOS}</td>
                          <td>{data.driversAssigned}</td>
                          <td style={{color: 'var(--data-green)'}}>{data.driversAvailable}</td>
                          <td>{data.driversSitting}</td>
                          <td style={{color: 'var(--data-red)'}}>{data.driverCallouts}</td>
                        </tr>
                        {isExpanded && (
                          <>
                            {/* Open Loads Detail Rows */}
                            {Array.from({ length: data.loadsOpen }).map((_, idx) => {
                              const loadId = `${terminal.id}-load-${idx}`;
                              const isLoadExpanded = expandedLoads.has(loadId);
                              // Use seeded random for consistent data
                              const rng = seededRandom(loadId);
                              const loadNum = `${Math.floor(1000000 + rng() * 9000000)}`;
                              const bolNum = `${Math.floor(100000000000 + rng() * 900000000000)}`;
                              const baseTime = Date.now();
                              const shipDate = new Date(baseTime + rng() * 86400000 * 2);
                              const deliverDate = new Date(shipDate.getTime() + 86400000 * (1 + rng() * 2));
                              const shippers = ['Dow Chemical', 'BASF', 'DuPont', 'ExxonMobil', 'Shell', 'Chevron'];
                              const products = ['Polyethylene', 'Polypropylene', 'Ethylene', 'Propylene', 'Benzene', 'Toluene'];
                              const cities = ['Houston, TX', 'Baton Rouge, LA', 'Beaumont, TX', 'Port Arthur, TX', 'Lake Charles, LA', 'Corpus Christi, TX'];
                              const shipperIdx = Math.floor(rng() * shippers.length);
                              const productIdx = Math.floor(rng() * products.length);
                              const cityIdx1 = Math.floor(rng() * cities.length);
                              const cityIdx2 = (cityIdx1 + 1 + Math.floor(rng() * (cities.length - 1))) % cities.length;
                              const distance = Math.floor(150 + rng() * 300);
                              
                              return (
                                <React.Fragment key={loadId}>
                                  <tr className="detail-row detail-row--load" onClick={(e) => { e.stopPropagation(); toggleLoad(loadId); }}>
                                    <td className="load-detail" colSpan={17}>
                                      <div className="load-detail__content">
                                        <span className="load-detail__expand-icon">{isLoadExpanded ? '▼' : '▶'}</span>
                                        <span className="load-detail__section">
                                          <strong>LOAD#</strong> {loadNum}
                                          <button className="copy-btn" onClick={(e) => { e.stopPropagation(); copyToClipboard(loadNum); }} title="Copy Load Number">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                                          </button>
                                        </span>
                                        <span className="load-detail__divider">/</span>
                                        <span className="load-detail__section">
                                          <strong>BOL#</strong> {bolNum}
                                          <button className="copy-btn" onClick={(e) => { e.stopPropagation(); copyToClipboard(bolNum); }} title="Copy BOL Number">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                                          </button>
                                        </span>
                                        <span className="load-detail__divider">|</span>
                                        <span className="load-detail__section load-detail__shipper">
                                          <svg className="shipper-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><path d="M9 22V12h6v10"/></svg>
                                          {shippers[shipperIdx]}
                                        </span>
                                        <span className="load-detail__route">
                                          {cities[cityIdx1]} <span className="time-badge">({shipDate.getHours().toString().padStart(2, '0')}00)</span>
                                          <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                                          {cities[cityIdx2]} <span className="time-badge">({deliverDate.getMonth()+1}/{deliverDate.getDate()} {deliverDate.getHours().toString().padStart(2, '0')}00)</span>
                                        </span>
                                        <span className="load-detail__product">{products[productIdx]}</span>
                                        <div className="load-detail__actions">
                                          <button className="action-btn action-btn--recover" onClick={(e) => e.stopPropagation()}>Recover Load</button>
                                          <button className="action-btn action-btn--update" onClick={(e) => e.stopPropagation()}>Update Status</button>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                  {isLoadExpanded && (
                                    <tr className="dispatch-plan-row">
                                      <td colSpan={17}>
                                        <div className="dispatch-plan">
                                          <div className="dispatch-plan__item">
                                            <svg className="dispatch-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6m-6-6h6m6 0h-6"/></svg>
                                            <strong>Pickup:</strong> {cities[cityIdx1]} - {shipDate.toLocaleDateString()} {shipDate.getHours().toString().padStart(2, '0')}:00 (Earliest)
                                          </div>
                                          <div className="dispatch-plan__item">
                                            <svg className="dispatch-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                                            <strong>Delivery:</strong> {cities[cityIdx2]} - {deliverDate.toLocaleDateString()} {deliverDate.getHours().toString().padStart(2, '0')}:00 (Latest)
                                          </div>
                                          <div className="dispatch-plan__item">
                                            <svg className="dispatch-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
                                            <strong>Distance:</strong> {distance} mi
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  )}
                                </React.Fragment>
                              );
                            })}
                            {/* OOS Trucks Detail Rows */}
                            {Array.from({ length: data.trucksOOS }).map((_, idx) => (
                              <tr key={`${terminal.id}-truck-${idx}`} className="detail-row detail-row--truck">
                                <td className="detail-label" colSpan={17}>
                                  <svg className="detail-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M18 18.5a1.5 1.5 0 01-1.5-1.5 1.5 1.5 0 01-1.5 1.5 1.5 1.5 0 01-1.5-1.5H9a1.5 1.5 0 01-3 0H3v-3a2 2 0 012-2h.764l1.236-3H5a2 2 0 01-2-2V5a2 2 0 012-2h9v6h2l3 3v4h1a1.5 1.5 0 011.5 1.5 1.5 1.5 0 01-1.5 1.5z"/></svg>
                                  <strong>OOS Truck:</strong> Unit {terminal.id}-T{String(idx + 1).padStart(3, '0')} - {['Maintenance', 'Breakdown', 'Inspection'][idx % 3]}
                                </td>
                              </tr>
                            ))}
                            {/* OOS Trailers Detail Rows */}
                            {Array.from({ length: data.trailersOOS }).map((_, idx) => (
                              <tr key={`${terminal.id}-trailer-${idx}`} className="detail-row detail-row--trailer">
                                <td className="detail-label" colSpan={17}>
                                  <svg className="detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="6" width="18" height="12" rx="2"/><circle cx="6" cy="18" r="2" fill="currentColor"/><circle cx="14" cy="18" r="2" fill="currentColor"/></svg>
                                  <strong>OOS Trailer:</strong> Unit {terminal.id}-TR{String(idx + 1).padStart(3, '0')} - {['Tire Repair', 'Brake Service', 'DOT Inspection'][idx % 3]}
                                </td>
                              </tr>
                            ))}
                          </>
                        )}
                      </React.Fragment>
                    );
                  })}
                  {/* Region Totals Row */}
                  <tr className="totals-row">
                    <td className="terminal-name">{region} Total</td>
                    <td className="section-end">{regionTotals.loadsShipping}</td>
                    <td>{regionTotals.loadsDelivering}</td>
                    <td>{regionTotals.loadsOpen}</td>
                    <td className="section-end">{regionTotals.loadEvents}</td>
                    <td>{regionTotals.trucksAssigned}</td>
                    <td>{regionTotals.trucksOperational}</td>
                    <td className="text-warning">{regionTotals.trucksOOS}</td>
                    <td className="text-info">{regionTotals.trucksLTD}</td>
                    <td className="text-success section-end">{regionTotals.trucksAvailable}</td>
                    <td className="text-success">{regionTotals.trailersAvailable}</td>
                    <td className="text-warning section-end">{regionTotals.trailersOOS}</td>
                    <td>{regionTotals.driversAssigned}</td>
                    <td className="text-success">{regionTotals.driversAvailable}</td>
                    <td>{regionTotals.driversSitting}</td>
                    <td className="text-warning">{regionTotals.driverCallouts}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
        })}
    </div>
  );
};

// Export the aside content as a separate component
export const DryBulkDailyAside: React.FC<{ activeDay: 'today' | 'tomorrow'; terminals: TerminalData[] }> = ({ terminals }) => {
  // Calculate totals for aside
  const calculateTotals = (day: 'today' | 'tomorrow') => {
    if (day === 'today') {
      const totalLoads = terminals.reduce((sum, t) => sum + t.today.loadsShipping + t.today.loadsDelivering, 0);
      const totalLoadsOpen = terminals.reduce((sum, t) => sum + t.today.loadsOpen, 0);
      const totalTrucksAvailable = terminals.reduce((sum, t) => sum + t.today.trucksAvailable, 0);
      const totalTrucksOOS = terminals.reduce((sum, t) => sum + t.today.trucksOOS, 0);
      const totalDriversAvailable = terminals.reduce((sum, t) => sum + t.today.driversAvailable, 0);
      const totalDriversAssigned = terminals.reduce((sum, t) => sum + t.today.driversAssigned, 0);
      const totalRevenue = terminals.reduce((sum, t) => sum + t.today.estimatedRevenue, 0);
      const totalMiles = terminals.reduce((sum, t) => sum + t.today.totalMiles, 0);
      const driverPercentage = totalDriversAssigned > 0 ? Math.round((totalDriversAvailable / totalDriversAssigned) * 100) : 0;

      return {
        loads: `${totalLoads}/${totalLoadsOpen}`,
        trucks: `${totalTrucksAvailable}/${totalTrucksOOS}`,
        drivers: `${totalDriversAvailable} (${driverPercentage}%)`,
        revenue: `$${(totalRevenue / 1000).toFixed(1)}K`,
        miles: totalMiles.toLocaleString(),
      };
    } else {
      const totalLoads = terminals.reduce((sum, t) => sum + t.tomorrow.loadsShipping + t.tomorrow.loadsDelivering, 0);
      const totalLoadsOpen = terminals.reduce((sum, t) => sum + t.tomorrow.loadsOpen, 0);
      const totalTrucksAvailable = terminals.reduce((sum, t) => sum + t.tomorrow.trucksAvailable, 0);
      const totalTrucksOOS = terminals.reduce((sum, t) => sum + t.tomorrow.trucksOOS, 0);
      const totalDriversAvailable = terminals.reduce((sum, t) => sum + t.tomorrow.driversAvailable, 0);
      const totalDriversAssigned = terminals.reduce((sum, t) => sum + t.tomorrow.driversAssigned, 0);
      const driverPercentage = totalDriversAssigned > 0 ? Math.round((totalDriversAvailable / totalDriversAssigned) * 100) : 0;

      return {
        loads: `${totalLoads}/${totalLoadsOpen}`,
        trucks: `${totalTrucksAvailable}/${totalTrucksOOS}`,
        drivers: `${totalDriversAvailable} (${driverPercentage}%)`,
      };
    }
  };

  const todayTotals = calculateTotals('today');
  const tomorrowTotals = calculateTotals('tomorrow');

  return (
    <>
      <div className="aside-section">
        <h3 className="aside-section__title">Today</h3>
        <div className="aside-stats">
            <div className="aside-stat">
              <div className="aside-stat__label">Loads</div>
              <div className="aside-stat__value">{todayTotals.loads}</div>
              <div className="aside-stat__sublabel">Active / Open</div>
            </div>
            <div className="aside-stat">
              <div className="aside-stat__label">Trucks</div>
              <div className="aside-stat__value">{todayTotals.trucks}</div>
              <div className="aside-stat__sublabel">Available / OOS</div>
            </div>
            <div className="aside-stat">
              <div className="aside-stat__label">Drivers</div>
              <div className="aside-stat__value">{todayTotals.drivers}</div>
              <div className="aside-stat__sublabel">Available</div>
            </div>
            <div className="aside-stat">
              <div className="aside-stat__label">Revenue</div>
              <div className="aside-stat__value">{todayTotals.revenue}</div>
              <div className="aside-stat__sublabel">Daily Estimate</div>
            </div>
            <div className="aside-stat">
              <div className="aside-stat__label">Miles</div>
              <div className="aside-stat__value">{todayTotals.miles}</div>
              <div className="aside-stat__sublabel">Total Today</div>
            </div>
          </div>
        </div>

        <div className="aside-section">
          <h3 className="aside-section__title">Tomorrow</h3>
          <div className="aside-stats">
            <div className="aside-stat">
              <div className="aside-stat__label">Loads</div>
              <div className="aside-stat__value">{tomorrowTotals.loads}</div>
              <div className="aside-stat__sublabel">Active / Open</div>
            </div>
            <div className="aside-stat">
              <div className="aside-stat__label">Trucks</div>
              <div className="aside-stat__value">{tomorrowTotals.trucks}</div>
              <div className="aside-stat__sublabel">Available / OOS</div>
            </div>
            <div className="aside-stat">
              <div className="aside-stat__label">Drivers</div>
              <div className="aside-stat__value">{tomorrowTotals.drivers}</div>
              <div className="aside-stat__sublabel">Available</div>
            </div>
          </div>
        </div>

        <div className="aside-section">
          <h3 className="aside-section__title">Dry Bulk Stats</h3>
          <div className="aside-stats">
            <div className="aside-stat">
              <div className="aside-stat__label">YTD Miles</div>
              <div className="aside-stat__value">2.4M</div>
              <div className="aside-stat__sublabel">Total Miles</div>
            </div>
            <div className="aside-stat">
              <div className="aside-stat__label">YTD Loads</div>
              <div className="aside-stat__value">8,542</div>
              <div className="aside-stat__sublabel">Total Loads</div>
            </div>
            <div className="aside-stat">
              <div className="aside-stat__label">YTD Revenue</div>
              <div className="aside-stat__value">$12.8M</div>
              <div className="aside-stat__sublabel">Total Revenue</div>
            </div>
            <div className="aside-stat">
              <div className="aside-stat__label">OTD</div>
              <div className="aside-stat__value">94.2%</div>
              <div className="aside-stat__sublabel">On-Time Delivery</div>
            </div>
          </div>
        </div>
    </>
  );
};
