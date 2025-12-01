#!/usr/bin/env node

/**
 * CSS Documentation Template Generator
 * Adds standardized documentation headers to CSS files
 * Usage: node scripts/css-doc-template.js <css-file-path> [component-name] [description]
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);

if (args.length === 0) {
  console.log(`
CSS Documentation Template Generator
=====================================

Usage: node scripts/css-doc-template.js <options>

Options:
  <file-path>              Path to CSS file to document
  [component-name]         Name of component (optional, derived from filename)
  [description]            Brief description (optional)

Examples:
  node scripts/css-doc-template.js src/pages/Fleet/FleetTrucks.css
  node scripts/css-doc-template.js src/pages/Fleet/FleetTrucks.css "Fleet Trucks Page" "Truck management interface"

The script will:
1. Read existing CSS file
2. Add proper documentation headers if missing
3. Preserve all existing CSS rules
4. Create backup as .css.backup
`);
  process.exit(0);
}

const filePath = args[0];
const componentName = args[1] || deriveComponentName(filePath);
const description = args[2] || 'Component description';

function deriveComponentName(filepath) {
  const filename = path.basename(filepath, '.css');
  // Convert PascalCase or kebab-case to Title Case
  return filename
    .replace(/([A-Z])/g, ' $1')
    .replace(/[-_]/g, ' ')
    .trim()
    .replace(/^\w/, (c) => c.toUpperCase());
}

function generateTemplate(componentName, description) {
  return `/* ============================================
   ${componentName.toUpperCase()}
   ${description}
   ============================================ */

/* --------------------------------------------
   CSS VARIABLES
   Component-specific design tokens
   -------------------------------------------- */


/* --------------------------------------------
   BASE STYLES
   Core component structure and layout
   -------------------------------------------- */


/* --------------------------------------------
   VARIANTS / MODIFIERS
   Different states or versions of component
   -------------------------------------------- */


/* --------------------------------------------
   CHILD ELEMENTS
   Nested elements within component
   -------------------------------------------- */


/* --------------------------------------------
   STATE CLASSES
   Interactive states (hover, focus, active, disabled)
   -------------------------------------------- */


/* --------------------------------------------
   RESPONSIVE
   Media queries for different screen sizes
   -------------------------------------------- */

`;
}

function hasDocumentation(content) {
  return content.includes('============================================') ||
         content.includes('--------------------------------------------');
}

function addDocumentation(filePath, componentName, description) {
  try {
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.error(`❌ Error: File not found: ${filePath}`);
      process.exit(1);
    }

    // Read existing content
    const content = fs.readFileSync(filePath, 'utf8');

    // Check if already documented
    if (hasDocumentation(content)) {
      console.log(`ℹ️  File already has documentation headers: ${filePath}`);
      console.log(`   Skipping to avoid overwriting existing docs.`);
      return;
    }

    // Create backup
    const backupPath = filePath + '.backup';
    fs.writeFileSync(backupPath, content, 'utf8');
    console.log(`📝 Created backup: ${backupPath}`);

    // Generate template
    const template = generateTemplate(componentName, description);

    // Combine template with existing content
    const documented = template + content;

    // Write to file
    fs.writeFileSync(filePath, documented, 'utf8');
    console.log(`✅ Added documentation to: ${filePath}`);
    console.log(`   Component: ${componentName}`);
    console.log(`   Description: ${description}`);
    
  } catch (error) {
    console.error(`❌ Error processing file: ${error.message}`);
    process.exit(1);
  }
}

// Execute
addDocumentation(filePath, componentName, description);
