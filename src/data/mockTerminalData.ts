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
    trailersAvailable: number;
    trailersOOS: number;
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
    trailersAvailable: number;
    trailersOOS: number;
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
      trailersAvailable: Math.floor(15 * baseMultiplier),
      trailersOOS: Math.floor(3 * baseMultiplier),
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
      trailersAvailable: Math.floor(13 * baseMultiplier),
      trailersOOS: Math.floor(2 * baseMultiplier),
      driversAssigned: Math.floor(40 * baseMultiplier),
      driversAvailable: Math.floor(12 * baseMultiplier),
      driversSitting: Math.floor(4 * baseMultiplier),
      driverCallouts: Math.floor(1 * baseMultiplier),
    },
  };
};

export const mockTerminals: TerminalData[] = [
  // South Region (7 terminals)
  generateTerminalData('term-001', 'Houston', 'South'),
  generateTerminalData('term-002', 'Dallas', 'South'),
  generateTerminalData('term-003', 'San Antonio', 'South'),
  generateTerminalData('term-004', 'Austin', 'South'),
  generateTerminalData('term-005', 'Fort Worth', 'South'),
  generateTerminalData('term-006', 'Corpus Christi', 'South'),
  generateTerminalData('term-007', 'El Paso', 'South'),

  // Midwest Region (8 terminals)
  generateTerminalData('term-008', 'Chicago', 'Midwest'),
  generateTerminalData('term-009', 'Indianapolis', 'Midwest'),
  generateTerminalData('term-010', 'Detroit', 'Midwest'),
  generateTerminalData('term-011', 'Milwaukee', 'Midwest'),
  generateTerminalData('term-012', 'Minneapolis', 'Midwest'),
  generateTerminalData('term-013', 'St. Louis', 'Midwest'),
  generateTerminalData('term-014', 'Kansas City', 'Midwest'),
  generateTerminalData('term-015', 'Columbus', 'Midwest'),

  // Northeast Region (6 terminals)
  generateTerminalData('term-016', 'New York', 'Northeast'),
  generateTerminalData('term-017', 'Philadelphia', 'Northeast'),
  generateTerminalData('term-018', 'Boston', 'Northeast'),
  generateTerminalData('term-019', 'Baltimore', 'Northeast'),
  generateTerminalData('term-020', 'Pittsburgh', 'Northeast'),
  generateTerminalData('term-021', 'Buffalo', 'Northeast'),

  // West Region (9 terminals)
  generateTerminalData('term-022', 'Los Angeles', 'West'),
  generateTerminalData('term-023', 'San Francisco', 'West'),
  generateTerminalData('term-024', 'San Diego', 'West'),
  generateTerminalData('term-025', 'Phoenix', 'West'),
  generateTerminalData('term-026', 'Las Vegas', 'West'),
  generateTerminalData('term-027', 'Seattle', 'West'),
  generateTerminalData('term-028', 'Portland', 'West'),
  generateTerminalData('term-029', 'Sacramento', 'West'),
  generateTerminalData('term-030', 'Denver', 'West'),

  // Southeast Region (5 terminals)
  generateTerminalData('term-031', 'Atlanta', 'Southeast'),
  generateTerminalData('term-032', 'Miami', 'Southeast'),
  generateTerminalData('term-033', 'Tampa', 'Southeast'),
  generateTerminalData('term-034', 'Charlotte', 'Southeast'),
  generateTerminalData('term-035', 'Nashville', 'Southeast'),
];
