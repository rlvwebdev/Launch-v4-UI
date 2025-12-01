#!/usr/bin/env node

/**
 * Batch CSS Documentation Script
 * Documents multiple CSS files at once
 * Usage: node scripts/batch-document-css.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Priority CSS files to document
const priorityFiles = [
  // High traffic pages
  { file: 'src/pages/MyDashboard.tsx', css: 'src/styles/pages/MyDashboard.css', name: 'My Dashboard', desc: 'Personal dashboard with widgets and shortcuts' },
  { file: 'src/pages/Fleet/FleetTrucks.tsx', css: 'src/pages/Fleet/FleetTrucks.css', name: 'Fleet Trucks', desc: 'Truck fleet management interface' },
  { file: 'src/pages/Fleet/FleetDrivers.tsx', css: 'src/pages/Fleet/FleetDrivers.css', name: 'Fleet Drivers', desc: 'Driver management interface' },
  { file: 'src/pages/Dispatch/DispatchLoads.tsx', css: 'src/pages/Dispatch/DispatchLoads.css', name: 'Dispatch Loads', desc: 'Load dispatch and management' },
  { file: 'src/pages/Dispatch/DispatchPlanner.tsx', css: 'src/pages/Dispatch/DispatchPlanner.css', name: 'Dispatch Planner', desc: 'Route and dispatch planning interface' },
  { file: 'src/pages/Terminal/TerminalOverview.tsx', css: 'src/pages/Terminal/TerminalOverview.css', name: 'Terminal Overview', desc: 'Terminal operations dashboard' },
  { file: 'src/pages/Account/AccountProfile.tsx', css: 'src/pages/Account/AccountProfile.css', name: 'Account Profile', desc: 'User profile management' },
  { file: 'src/pages/Account/AccountSettings.tsx', css: 'src/pages/Account/AccountSettings.css', name: 'Account Settings', desc: 'User settings and preferences' },
  { file: 'src/pages/Reporting/ReportingStatus.tsx', css: 'src/pages/Reporting/ReportingStatus.css', name: 'Reporting Status', desc: 'Status reporting interface' },
  { file: 'src/pages/Help/HelpDocumentation.tsx', css: 'src/pages/Help/HelpDocumentation.css', name: 'Help Documentation', desc: 'User documentation and help resources' },
];

console.log('🚀 Starting batch CSS documentation...\n');

let documented = 0;
let skipped = 0;
let errors = 0;

priorityFiles.forEach((item, index) => {
  console.log(`[${index + 1}/${priorityFiles.length}] Processing ${item.name}...`);
  
  const cssPath = path.join(process.cwd(), item.css);
  
  // Check if CSS file exists
  if (!fs.existsSync(cssPath)) {
    console.log(`   ⚠️  CSS file not found, skipping: ${item.css}\n`);
    skipped++;
    return;
  }

  try {
    // Run the documentation script
    const scriptPath = path.join(process.cwd(), 'scripts/css-doc-template.cjs');
    const command = `node "${scriptPath}" "${cssPath}" "${item.name}" "${item.desc}"`;
    
    execSync(command, { stdio: 'inherit' });
    documented++;
    console.log('');
  } catch (error) {
    console.error(`   ❌ Error processing ${item.name}\n`);
    errors++;
  }
});

console.log('=====================================');
console.log('📊 Batch Documentation Complete');
console.log('=====================================');
console.log(`✅ Documented: ${documented}`);
console.log(`⏭️  Skipped: ${skipped}`);
console.log(`❌ Errors: ${errors}`);
console.log(`📁 Total: ${priorityFiles.length}`);
console.log('');
console.log('💡 Tip: Check .backup files if you need to restore originals');
