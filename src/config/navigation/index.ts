// Navigation index - maps dashboard IDs to their navigation configs

import { myDashboardNavigation } from './myDashboardNav';
import { dryBulkNavigation } from './dryBulkNav';
import { liquidNavigation } from './liquidNav';
import { tankWashNavigation } from './tankWashNav';
import { maintenanceNavigation } from './maintenanceNav';
import { qualityNavigation } from './qualityNav';
import { safetyNavigation } from './safetyNav';
import { hrNavigation } from './hrNav';
import { financeNavigation } from './financeNav';

export const navigationMap: Record<string, any[]> = {
  mydashboard: myDashboardNavigation,
  drybulk: dryBulkNavigation,
  liquid: liquidNavigation,
  tankwash: tankWashNavigation,
  maintenance: maintenanceNavigation,
  quality: qualityNavigation,
  safety: safetyNavigation,
  hr: hrNavigation,
  finance: financeNavigation,
};

export { 
  myDashboardNavigation,
  dryBulkNavigation, 
  liquidNavigation, 
  tankWashNavigation,
  maintenanceNavigation,
  qualityNavigation,
  safetyNavigation,
  hrNavigation,
  financeNavigation
};
