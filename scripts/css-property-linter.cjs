#!/usr/bin/env node

/**
 * CSS Property Order Linter
 * Checks if CSS properties follow the standard order
 * Usage: node scripts/css-property-linter.cjs <css-file-or-directory>
 */

const fs = require('fs');
const path = require('path');

// Standard property order
const PROPERTY_ORDER = {
  content: 1,
  position: 2,
  top: 2, right: 2, bottom: 2, left: 2, 'z-index': 2,
  display: 3,
  'flex-direction': 3, 'justify-content': 3, 'align-items': 3, 'align-self': 3,
  'flex-grow': 3, 'flex-shrink': 3, 'flex-basis': 3, flex: 3, 'flex-wrap': 3,
  'grid-template': 3, 'grid-template-columns': 3, 'grid-template-rows': 3,
  'grid-column': 3, 'grid-row': 3, gap: 3, 'grid-gap': 3,
  width: 4, height: 4, 'min-width': 4, 'max-width': 4, 'min-height': 4, 'max-height': 4,
  padding: 4, 'padding-top': 4, 'padding-right': 4, 'padding-bottom': 4, 'padding-left': 4,
  margin: 4, 'margin-top': 4, 'margin-right': 4, 'margin-bottom': 4, 'margin-left': 4,
  border: 4, 'border-top': 4, 'border-right': 4, 'border-bottom': 4, 'border-left': 4,
  'border-width': 4, 'border-style': 4, 'border-color': 4, 'border-radius': 4,
  'font-family': 5, 'font-size': 5, 'font-weight': 5, 'font-style': 5,
  'line-height': 5, color: 5, 'text-align': 5, 'text-decoration': 5,
  'text-transform': 5, 'letter-spacing': 5, 'white-space': 5,
  background: 6, 'background-color': 6, 'background-image': 6,
  opacity: 6, 'box-shadow': 6, visibility: 6,
  transform: 7, transition: 7, animation: 7,
  cursor: 8, 'pointer-events': 8, overflow: 8, 'overflow-x': 8, 'overflow-y': 8,
};

function getPropertyOrder(property) {
  return PROPERTY_ORDER[property] || 9; // Unknown properties go last
}

function parseCSSFile(content) {
  const rules = [];
  // Simple CSS rule parser (not perfect but sufficient for basic checks)
  const ruleRegex = /([^{]+)\{([^}]+)\}/g;
  let match;
  
  while ((match = ruleRegex.exec(content)) !== null) {
    const selector = match[1].trim();
    const declarations = match[2].trim();
    
    // Skip comments and empty rules
    if (selector.startsWith('/*') || !declarations) continue;
    
    // Parse properties
    const properties = declarations
      .split(';')
      .map(p => p.trim())
      .filter(p => p && !p.startsWith('/*'))
      .map(p => {
        const [prop, value] = p.split(':').map(s => s.trim());
        return { property: prop, value };
      })
      .filter(p => p.property);
    
    if (properties.length > 0) {
      rules.push({ selector, properties });
    }
  }
  
  return rules;
}

function checkPropertyOrder(rules) {
  const violations = [];
  
  rules.forEach(rule => {
    const { selector, properties } = rule;
    
    // Check if properties are in order
    let previousOrder = 0;
    
    properties.forEach((prop, index) => {
      const currentOrder = getPropertyOrder(prop.property);
      
      if (currentOrder < previousOrder) {
        violations.push({
          selector,
          property: prop.property,
          currentOrder,
          previousProperty: properties[index - 1].property,
          previousOrder,
          suggestion: `Property '${prop.property}' (group ${currentOrder}) should come before '${properties[index - 1].property}' (group ${previousOrder})`
        });
      }
      
      previousOrder = Math.max(previousOrder, currentOrder);
    });
  });
  
  return violations;
}

function lintFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const rules = parseCSSFile(content);
    const violations = checkPropertyOrder(rules);
    
    return {
      file: filePath,
      totalRules: rules.length,
      violations: violations.length,
      details: violations
    };
  } catch (error) {
    return {
      file: filePath,
      error: error.message
    };
  }
}

function lintDirectory(dirPath) {
  const results = [];
  
  function walkDir(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        walkDir(filePath);
      } else if (file.endsWith('.css')) {
        results.push(lintFile(filePath));
      }
    });
  }
  
  walkDir(dirPath);
  return results;
}

function printResults(results) {
  let totalFiles = 0;
  let totalViolations = 0;
  let filesWithViolations = 0;
  
  console.log('\\n========================================');
  console.log('📋 CSS Property Order Lint Results');
  console.log('========================================\\n');
  
  results.forEach(result => {
    totalFiles++;
    
    if (result.error) {
      console.log(`❌ ${result.file}`);
      console.log(`   Error: ${result.error}\\n`);
      return;
    }
    
    if (result.violations > 0) {
      filesWithViolations++;
      totalViolations += result.violations;
      
      console.log(`⚠️  ${result.file}`);
      console.log(`   Rules: ${result.totalRules} | Violations: ${result.violations}`);
      
      // Show first few violations
      result.details.slice(0, 3).forEach(v => {
        console.log(`   - ${v.selector}`);
        console.log(`     ${v.suggestion}`);
      });
      
      if (result.details.length > 3) {
        console.log(`   ... and ${result.details.length - 3} more violations`);
      }
      console.log('');
    } else {
      console.log(`✅ ${result.file}`);
      console.log(`   Rules: ${result.totalRules} | No violations\\n`);
    }
  });
  
  console.log('========================================');
  console.log('📊 Summary');
  console.log('========================================');
  console.log(`Total Files: ${totalFiles}`);
  console.log(`Files with Violations: ${filesWithViolations}`);
  console.log(`Total Violations: ${totalViolations}`);
  console.log(`Clean Files: ${totalFiles - filesWithViolations}`);
  
  if (totalViolations === 0) {
    console.log('\\n🎉 All CSS files follow proper property order!');
  } else {
    console.log(`\\n⚠️  ${totalViolations} property order violations found`);
    console.log('Consider reordering properties to match the standard:');
    console.log('1. Content, 2. Position, 3. Display, 4. Box Model,');
    console.log('5. Typography, 6. Visual, 7. Transform, 8. Misc');
  }
  console.log('');
}

// Main execution
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log(`
CSS Property Order Linter
==========================

Usage: node scripts/css-property-linter.cjs <path>

Arguments:
  <path>    CSS file or directory to lint

Examples:
  node scripts/css-property-linter.cjs src/styles/components/Header.css
  node scripts/css-property-linter.cjs src/pages
  node scripts/css-property-linter.cjs src

Standard Property Order:
  1. Content (content)
  2. Position (position, top, right, bottom, left, z-index)
  3. Display (display, flex, grid, etc.)
  4. Box Model (width, height, padding, margin, border)
  5. Typography (font, color, text properties)
  6. Visual (background, opacity, shadow)
  7. Transform (transform, transition, animation)
  8. Misc (cursor, pointer-events, overflow)
`);
  process.exit(0);
}

const target = args[0];
const targetPath = path.resolve(target);

if (!fs.existsSync(targetPath)) {
  console.error(`❌ Error: Path not found: ${targetPath}`);
  process.exit(1);
}

const stat = fs.statSync(targetPath);
let results;

if (stat.isDirectory()) {
  console.log(`🔍 Linting CSS files in: ${targetPath}\\n`);
  results = lintDirectory(targetPath);
} else if (targetPath.endsWith('.css')) {
  console.log(`🔍 Linting: ${targetPath}\\n`);
  results = [lintFile(targetPath)];
} else {
  console.error(`❌ Error: Not a CSS file or directory: ${targetPath}`);
  process.exit(1);
}

printResults(results);
