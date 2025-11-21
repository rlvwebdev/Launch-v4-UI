// Mock terminal data for Dry Bulk Daily dashboard

export interface TerminalData {
  id: string;
  name: string;
  region: string;
  today: {
    loadsShipping: number;
    loadsDelivering: number;
    loadsOpen: number;
    loadEvents: number;
    trucksAssigned: number;
    trucksOperational: number;
    trucksOOS: number;
    trucksLTD: number;
    trucksAvailable: number;
    driversAssigned: number;
    driversAvailable: number;
    driversSitting: number;
    driverCallouts: number;
    onTimeDelivery: number;
    totalMiles: number;
    estimatedRevenue: number;
    fuelSurchargeRate: number;
  };
  tomorrow: {
    loadsShipping: number;
    loadsDelivering: number;
    loadsOpen: number;
    loadEvents: number;
    trucksAssigned: number;
    trucksOperational: number;
    trucksOOS: number;
    trucksLTD: number;
    trucksAvailable: number;
    driversAssigned: number;
    driversAvailable: number;
    driversSitting: number;
    driverCallouts: number;
  };
}

const generateTerminalData = (id: string, name: string, region: string): TerminalData => {
  const baseMultiplier = Math.random() * 0.5 + 0.75; // 0.75-1.25
  
  return {
    id,
    name,
    region,
    today: {
      loadsShipping: Math.floor(20 * baseMultiplier),
      loadsDelivering: Math.floor(15 * baseMultiplier),
      loadsOpen: Math.floor(6 * baseMultiplier),
      loadEvents: Math.floor(3 * baseMultiplier),
      trucksAssigned: Math.floor(40 * baseMultiplier),
      trucksOperational: Math.floor(36 * baseMultiplier),
      trucksOOS: Math.floor(4 * baseMultiplier),
      trucksLTD: Math.floor(2 * baseMultiplier),
      trucksAvailable: Math.floor(12 * baseMultiplier),
      driversAssigned: Math.floor(38 * baseMultiplier),
      driversAvailable: Math.floor(14 * baseMultiplier),
      driversSitting: Math.floor(5 * baseMultiplier),
      driverCallouts: Math.floor(2 * baseMultiplier),
      onTimeDelivery: Math.round(90 + Math.random() * 9), // 90-99%
      totalMiles: Math.floor(2500 * baseMultiplier),
      estimatedRevenue: Math.floor(45000 * baseMultiplier),
      fuelSurchargeRate: Math.round((0.40 + Math.random() * 0.10) * 100) / 100, // $0.40-$0.50
    },
    tomorrow: {
      loadsShipping: Math.floor(22 * baseMultiplier),
      loadsDelivering: Math.floor(17 * baseMultiplier),
      loadsOpen: Math.floor(7 * baseMultiplier),
      loadEvents: Math.floor(2 * baseMultiplier),
      trucksAssigned: Math.floor(42 * baseMultiplier),
      trucksOperational: Math.floor(38 * baseMultiplier),
      trucksOOS: Math.floor(4 * baseMultiplier),
      trucksLTD: Math.floor(1 * baseMultiplier),
      trucksAvailable: Math.floor(10 * baseMultiplier),
      driversAssigned: Math.floor(40 * baseMultiplier),
      driversAvailable: Math.floor(12 * baseMultiplier),
      driversSitting: Math.floor(4 * baseMultiplier),
      driverCallouts: Math.floor(1 * baseMultiplier),
    },
  };
};

export const mockTerminals: TerminalData[] = [
  // South Region (7 terminals)
  generateTerminalData('term-001', 'Houston Terminal', 'South'),
  generateTerminalData('term-002', 'Dallas Terminal', 'South'),
  generateTerminalData('term-003', 'San Antonio Terminal', 'South'),
  generateTerminalData('term-004', 'Austin Terminal', 'South'),
  generateTerminalData('term-005', 'Fort Worth Terminal', 'South'),
  generateTerminalData('term-006', 'Corpus Christi Terminal', 'South'),
  generateTerminalData('term-007', 'El Paso Terminal', 'South'),

  // Midwest Region (8 terminals)
  generateTerminalData('term-008', 'Chicago Terminal', 'Midwest'),
  generateTerminalData('term-009', 'Indianapolis Terminal', 'Midwest'),
  generateTerminalData('term-010', 'Detroit Terminal', 'Midwest'),
  generateTerminalData('term-011', 'Milwaukee Terminal', 'Midwest'),
  generateTerminalData('term-012', 'Minneapolis Terminal', 'Midwest'),
  generateTerminalData('term-013', 'St. Louis Terminal', 'Midwest'),
  generateTerminalData('term-014', 'Kansas City Terminal', 'Midwest'),
  generateTerminalData('term-015', 'Columbus Terminal', 'Midwest'),

  // Northeast Region (6 terminals)
  generateTerminalData('term-016', 'New York Terminal', 'Northeast'),
  generateTerminalData('term-017', 'Philadelphia Terminal', 'Northeast'),
  generateTerminalData('term-018', 'Boston Terminal', 'Northeast'),
  generateTerminalData('term-019', 'Baltimore Terminal', 'Northeast'),
  generateTerminalData('term-020', 'Pittsburgh Terminal', 'Northeast'),
  generateTerminalData('term-021', 'Buffalo Terminal', 'Northeast'),

  // West Region (9 terminals)
  generateTerminalData('term-022', 'Los Angeles Terminal', 'West'),
  generateTerminalData('term-023', 'San Francisco Terminal', 'West'),
  generateTerminalData('term-024', 'San Diego Terminal', 'West'),
  generateTerminalData('term-025', 'Phoenix Terminal', 'West'),
  generateTerminalData('term-026', 'Las Vegas Terminal', 'West'),
  generateTerminalData('term-027', 'Seattle Terminal', 'West'),
  generateTerminalData('term-028', 'Portland Terminal', 'West'),
  generateTerminalData('term-029', 'Sacramento Terminal', 'West'),
  generateTerminalData('term-030', 'Denver Terminal', 'West'),

  // Southeast Region (5 terminals)
  generateTerminalData('term-031', 'Atlanta Terminal', 'Southeast'),
  generateTerminalData('term-032', 'Miami Terminal', 'Southeast'),
  generateTerminalData('term-033', 'Tampa Terminal', 'Southeast'),
  generateTerminalData('term-034', 'Charlotte Terminal', 'Southeast'),
  generateTerminalData('term-035', 'Nashville Terminal', 'Southeast'),
];
