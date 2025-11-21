import React from 'react';
import { mockTerminals, type TerminalData } from '../../../data/mockTerminalData';
import '../../../styles/pages/DryBulkDaily.css';

interface DryBulkDailyProps {
  activeDay: 'today' | 'tomorrow';
  onDayChange: (day: 'today' | 'tomorrow') => void;
}

export const DryBulkDaily: React.FC<DryBulkDailyProps> = ({ activeDay, onDayChange }) => {
  // Use mock terminal data
  const terminals: TerminalData[] = mockTerminals;

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
        driversAssigned: regionTerminals.reduce((sum, t) => sum + t.tomorrow.driversAssigned, 0),
        driversAvailable: regionTerminals.reduce((sum, t) => sum + t.tomorrow.driversAvailable, 0),
        driversSitting: regionTerminals.reduce((sum, t) => sum + t.tomorrow.driversSitting, 0),
        driverCallouts: regionTerminals.reduce((sum, t) => sum + t.tomorrow.driverCallouts, 0),
      };
    }
  };

  // Calculate division totals
  const divisionTotals = calculateRegionTotals(terminals);

  return (
    <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">Dry Bulk Daily</h1>
          <p className="page-subtitle">Daily terminal availability and operations dashboard</p>
        </div>

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

        {/* Division Totals */}
        <div className="division-totals">
          <h2 className="division-title">Dry Bulk Division Totals</h2>
          <div className="terminal-table-wrapper">
            <table className="terminal-table">
              <thead>
                <tr>
                  <th>Division</th>
                  <th title="Loads Shipping">▲ Ship</th>
                  <th title="Loads Delivering">▼ Del</th>
                  <th title="Loads Open">◆ Open</th>
                  <th title="Load Events">● Evts</th>
                  <th title="Trucks Assigned">■ Asgn</th>
                  <th title="Trucks Operational">✓ Op</th>
                  <th title="Trucks Out of Service">✖ OOS</th>
                  <th title="Trucks Limited">◐ LTD</th>
                  <th title="Trucks Available">✓ Avl</th>
                  <th title="Drivers Assigned">● Asgn</th>
                  <th title="Drivers Available">✓ Avl</th>
                  <th title="Drivers Sitting">◯ Sit</th>
                  <th title="Driver Callouts">✖ Out</th>
                  {activeDay === 'today' && (
                    <>
                      <th title="On-Time Delivery %">▲ OTD</th>
                      <th title="Total Miles">▬ Mi</th>
                      <th title="Revenue">$ Rev</th>
                      <th title="Fuel Surcharge Rate">◆ FSC</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                <tr className="totals-row">
                  <td className="terminal-name">All Terminals</td>
                  <td>{divisionTotals.loadsShipping}</td>
                  <td>{divisionTotals.loadsDelivering}</td>
                  <td>{divisionTotals.loadsOpen}</td>
                  <td>{divisionTotals.loadEvents}</td>
                  <td>{divisionTotals.trucksAssigned}</td>
                  <td>{divisionTotals.trucksOperational}</td>
                  <td className="text-warning">{divisionTotals.trucksOOS}</td>
                  <td className="text-info">{divisionTotals.trucksLTD}</td>
                  <td className="text-success">{divisionTotals.trucksAvailable}</td>
                  <td>{divisionTotals.driversAssigned}</td>
                  <td className="text-success">{divisionTotals.driversAvailable}</td>
                  <td>{divisionTotals.driversSitting}</td>
                  <td className="text-warning">{divisionTotals.driverCallouts}</td>
                  {activeDay === 'today' && 'avgOTD' in divisionTotals && divisionTotals.avgOTD !== undefined && (
                    <>
                      <td className={divisionTotals.avgOTD >= 95 ? 'text-success' : divisionTotals.avgOTD >= 90 ? 'text-info' : 'text-warning'}>
                        {divisionTotals.avgOTD}%
                      </td>
                      <td>{divisionTotals.totalMiles!.toLocaleString()}</td>
                      <td>${(divisionTotals.estimatedRevenue! / 1000).toFixed(1)}K</td>
                      <td>${divisionTotals.avgFSC!.toFixed(2)}</td>
                    </>
                  )}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {Object.entries(terminalsByRegion).map(([region, regionTerminals]) => {
          const regionTotals = calculateRegionTotals(regionTerminals);
          return (
          <div key={region} className="region-container">
            <h2 className="region-title">{region} Region</h2>
            <div className="terminal-table-wrapper">
              <table className="terminal-table">
                <thead>
                  <tr>
                    <th>Terminal</th>
                    <th title="Loads Shipping">▲ Ship</th>
                    <th title="Loads Delivering">▼ Del</th>
                    <th title="Loads Open">◆ Open</th>
                    <th title="Load Events">● Evts</th>
                    <th title="Trucks Assigned">■ Asgn</th>
                    <th title="Trucks Operational">✓ Op</th>
                    <th title="Trucks Out of Service">✖ OOS</th>
                    <th title="Trucks Limited">◐ LTD</th>
                    <th title="Trucks Available">✓ Avl</th>
                    <th title="Drivers Assigned">● Asgn</th>
                    <th title="Drivers Available">✓ Avl</th>
                    <th title="Drivers Sitting">◯ Sit</th>
                    <th title="Driver Callouts">✖ Out</th>
                    {activeDay === 'today' && (
                      <>
                        <th title="On-Time Delivery %">▲ OTD</th>
                        <th title="Total Miles">▬ Mi</th>
                        <th title="Revenue">$ Rev</th>
                        <th title="Fuel Surcharge Rate">◆ FSC</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {regionTerminals.map((terminal) => {
                    const data = activeDay === 'today' ? terminal.today : terminal.tomorrow;
                    return (
                      <tr key={terminal.id}>
                        <td className="terminal-name">{terminal.name}</td>
                        <td>{data.loadsShipping}</td>
                        <td>{data.loadsDelivering}</td>
                        <td>{data.loadsOpen}</td>
                        <td>{data.loadEvents}</td>
                        <td>{data.trucksAssigned}</td>
                        <td>{data.trucksOperational}</td>
                        <td className="text-warning">{data.trucksOOS}</td>
                        <td className="text-info">{data.trucksLTD}</td>
                        <td className="text-success">{data.trucksAvailable}</td>
                        <td>{data.driversAssigned}</td>
                        <td className="text-success">{data.driversAvailable}</td>
                        <td>{data.driversSitting}</td>
                        <td className="text-warning">{data.driverCallouts}</td>
                        {activeDay === 'today' && (
                          <>
                            <td className={terminal.today.onTimeDelivery >= 95 ? 'text-success' : terminal.today.onTimeDelivery >= 90 ? 'text-info' : 'text-warning'}>
                              {Math.round(terminal.today.onTimeDelivery)}%
                            </td>
                            <td>{terminal.today.totalMiles.toLocaleString()}</td>
                            <td>${(terminal.today.estimatedRevenue / 1000).toFixed(1)}K</td>
                            <td>${terminal.today.fuelSurchargeRate.toFixed(2)}</td>
                          </>
                        )}
                      </tr>
                    );
                  })}
                  {/* Region Totals Row */}
                  <tr className="totals-row">
                    <td className="terminal-name">{region} Total</td>
                    <td>{regionTotals.loadsShipping}</td>
                    <td>{regionTotals.loadsDelivering}</td>
                    <td>{regionTotals.loadsOpen}</td>
                    <td>{regionTotals.loadEvents}</td>
                    <td>{regionTotals.trucksAssigned}</td>
                    <td>{regionTotals.trucksOperational}</td>
                    <td className="text-warning">{regionTotals.trucksOOS}</td>
                    <td className="text-info">{regionTotals.trucksLTD}</td>
                    <td className="text-success">{regionTotals.trucksAvailable}</td>
                    <td>{regionTotals.driversAssigned}</td>
                    <td className="text-success">{regionTotals.driversAvailable}</td>
                    <td>{regionTotals.driversSitting}</td>
                    <td className="text-warning">{regionTotals.driverCallouts}</td>
                    {activeDay === 'today' && 'avgOTD' in regionTotals && regionTotals.avgOTD !== undefined && (
                      <>
                        <td className={regionTotals.avgOTD >= 95 ? 'text-success' : regionTotals.avgOTD >= 90 ? 'text-info' : 'text-warning'}>
                          {regionTotals.avgOTD}%
                        </td>
                        <td>{regionTotals.totalMiles!.toLocaleString()}</td>
                        <td>${(regionTotals.estimatedRevenue! / 1000).toFixed(1)}K</td>
                        <td>${regionTotals.avgFSC!.toFixed(2)}</td>
                      </>
                    )}
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
