#!/usr/bin/env node

/**
 * CSS Property Order Auto-Fix Script
 * 
 * Automatically reorders CSS properties according to the standard:
 * 1. Content (content, quotes)
 * 2. Position (position, top, right, bottom, left, z-index)
 * 3. Display (display, flex-*, grid-*, align-*, justify-*)
 * 4. Box Model (width, height, margin, padding, border)
 * 5. Typography (font-*, line-height, text-*, letter-spacing, color)
 * 6. Visual (background, opacity, box-shadow, etc.)
 * 7. Transform (transform, transition, animation)
 * 8. Misc (cursor, pointer-events, user-select, etc.)
 */

const fs = require('fs');
const path = require('path');

// Property order groups (same as linter)
const PROPERTY_ORDER = {
  // Group 1: Content
  content: 1,
  quotes: 1,

  // Group 2: Position
  position: 2,
  top: 2,
  right: 2,
  bottom: 2,
  left: 2,
  'z-index': 2,
  inset: 2,

  // Group 3: Display & Flexbox/Grid
  display: 3,
  visibility: 3,
  'flex-direction': 3,
  'flex-wrap': 3,
  'flex-flow': 3,
  'justify-content': 3,
  'justify-items': 3,
  'justify-self': 3,
  'align-content': 3,
  'align-items': 3,
  'align-self': 3,
  order: 3,
  flex: 3,
  'flex-grow': 3,
  'flex-shrink': 3,
  'flex-basis': 3,
  'grid-template': 3,
  'grid-template-areas': 3,
  'grid-template-rows': 3,
  'grid-template-columns': 3,
  'grid-auto-rows': 3,
  'grid-auto-columns': 3,
  'grid-auto-flow': 3,
  grid: 3,
  'grid-row': 3,
  'grid-column': 3,
  'grid-area': 3,
  gap: 3,
  'row-gap': 3,
  'column-gap': 3,

  // Group 4: Box Model
  'box-sizing': 4,
  width: 4,
  'min-width': 4,
  'max-width': 4,
  height: 4,
  'min-height': 4,
  'max-height': 4,
  margin: 4,
  'margin-top': 4,
  'margin-right': 4,
  'margin-bottom': 4,
  'margin-left': 4,
  padding: 4,
  'padding-top': 4,
  'padding-right': 4,
  'padding-bottom': 4,
  'padding-left': 4,
  border: 4,
  'border-top': 4,
  'border-right': 4,
  'border-bottom': 4,
  'border-left': 4,
  'border-width': 4,
  'border-style': 4,
  'border-color': 4,
  'border-radius': 4,
  'border-top-left-radius': 4,
  'border-top-right-radius': 4,
  'border-bottom-left-radius': 4,
  'border-bottom-right-radius': 4,
  outline: 4,
  'outline-width': 4,
  'outline-style': 4,
  'outline-color': 4,
  'outline-offset': 4,

  // Group 5: Typography
  font: 5,
  'font-family': 5,
  'font-size': 5,
  'font-weight': 5,
  'font-style': 5,
  'font-variant': 5,
  'line-height': 5,
  'letter-spacing': 5,
  'word-spacing': 5,
  'text-align': 5,
  'text-decoration': 5,
  'text-indent': 5,
  'text-transform': 5,
  'text-shadow': 5,
  'white-space': 5,
  'word-wrap': 5,
  'word-break': 5,
  'vertical-align': 5,
  color: 5,

  // Group 6: Visual
  background: 6,
  'background-color': 6,
  'background-image': 6,
  'background-position': 6,
  'background-size': 6,
  'background-repeat': 6,
  'background-attachment': 6,
  'background-clip': 6,
  'background-origin': 6,
  opacity: 6,
  'box-shadow': 6,
  filter: 6,
  'backdrop-filter': 6,

  // Group 7: Transform & Animation
  transform: 7,
  'transform-origin': 7,
  'transform-style': 7,
  perspective: 7,
  'perspective-origin': 7,
  transition: 7,
  'transition-property': 7,
  'transition-duration': 7,
  'transition-timing-function': 7,
  'transition-delay': 7,
  animation: 7,
  'animation-name': 7,
  'animation-duration': 7,
  'animation-timing-function': 7,
  'animation-delay': 7,
  'animation-iteration-count': 7,
  'animation-direction': 7,
  'animation-fill-mode': 7,
  'animation-play-state': 7,

  // Group 8: Miscellaneous
  cursor: 8,
  'pointer-events': 8,
  'user-select': 8,
  overflow: 8,
  'overflow-x': 8,
  'overflow-y': 8,
  resize: 8,
  'list-style': 8,
  'list-style-type': 8,
  'list-style-position': 8,
  'list-style-image': 8,
  'table-layout': 8,
  'border-collapse': 8,
  'border-spacing': 8,
  'empty-cells': 8,
  caption: 8,

  // Group 9: Unknown (will be placed at end)
  unknown: 9,
};

function getPropertyGroup(property) {
  return PROPERTY_ORDER[property] || 9;
}

function parseCSSFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  return content;
}

function fixPropertyOrder(cssContent) {
  // Match CSS rules with their properties
  const ruleRegex = /([^{}]+)\s*\{([^}]+)\}/g;
  
  let fixedContent = cssContent;
  const matches = [...cssContent.matchAll(ruleRegex)];
  
  // Process matches in reverse to maintain correct string positions
  for (let i = matches.length - 1; i >= 0; i--) {
    const match = matches[i];
    const selector = match[1].trim();
    const propertiesBlock = match[2];
    const fullMatch = match[0];
    const matchStart = match.index;
    
    // Skip @keyframes content and similar at-rules
    if (selector.includes('@keyframes') || selector.includes('@media') || 
        selector.includes('@supports') || selector.match(/^\d+%$/) || 
        selector === 'from' || selector === 'to') {
      continue;
    }
    
    // Parse properties
    const properties = [];
    const propertyRegex = /([a-z-]+)\s*:\s*([^;]+);?/gi;
    let propMatch;
    
    while ((propMatch = propertyRegex.exec(propertiesBlock)) !== null) {
      const property = propMatch[1].trim();
      const value = propMatch[2].trim();
      properties.push({
        property,
        value,
        group: getPropertyGroup(property),
        original: propMatch[0]
      });
    }
    
    if (properties.length === 0) continue;
    
    // Sort properties by group
    properties.sort((a, b) => {
      if (a.group !== b.group) {
        return a.group - b.group;
      }
      // Maintain original order within same group
      return 0;
    });
    
    // Rebuild the rule with sorted properties
    const indent = propertiesBlock.match(/^\s*/)?.[0] || '  ';
    const sortedProperties = properties
      .map(p => `${indent}${p.property}: ${p.value};`)
      .join('\n');
    
    const newRule = `${selector} {\n${sortedProperties}\n}`;
    
    // Replace in content
    fixedContent = 
      fixedContent.substring(0, matchStart) + 
      newRule + 
      fixedContent.substring(matchStart + fullMatch.length);
  }
  
  return fixedContent;
}

function fixCSSFile(filePath) {
  try {
    // Create backup
    const backupPath = `${filePath}.backup`;
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(filePath, backupPath);
    }
    
    // Read and fix
    const originalContent = parseCSSFile(filePath);
    const fixedContent = fixPropertyOrder(originalContent);
    
    // Only write if changed
    if (originalContent !== fixedContent) {
      fs.writeFileSync(filePath, fixedContent, 'utf-8');
      return { success: true, changed: true };
    }
    
    return { success: true, changed: false };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

function findCSSFiles(dir) {
  let results = [];
  
  try {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        results = results.concat(findCSSFiles(fullPath));
      } else if (item.endsWith('.css') && !item.endsWith('.backup')) {
        results.push(fullPath);
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error.message);
  }
  
  return results;
}

// Main execution
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log('Usage: node css-property-fixer.cjs <file-or-directory>');
  console.log('Example: node css-property-fixer.cjs src/styles/pages/MyDashboard.css');
  console.log('Example: node css-property-fixer.cjs src/styles');
  process.exit(1);
}

const target = path.resolve(args[0]);

if (!fs.existsSync(target)) {
  console.error(`❌ Path not found: ${target}`);
  process.exit(1);
}

const stat = fs.statSync(target);
let filesToFix = [];

if (stat.isDirectory()) {
  filesToFix = findCSSFiles(target);
  console.log(`🔍 Found ${filesToFix.length} CSS files in: ${target}\n`);
} else if (target.endsWith('.css')) {
  filesToFix = [target];
} else {
  console.error('❌ Target must be a CSS file or directory');
  process.exit(1);
}

let fixed = 0;
let unchanged = 0;
let errors = 0;

console.log('🔧 Fixing CSS property order...\n');

for (const file of filesToFix) {
  const result = fixCSSFile(file);
  const relativePath = path.relative(process.cwd(), file);
  
  if (result.success) {
    if (result.changed) {
      console.log(`✅ Fixed: ${relativePath}`);
      fixed++;
    } else {
      console.log(`⏭️  No changes: ${relativePath}`);
      unchanged++;
    }
  } else {
    console.log(`❌ Error: ${relativePath} - ${result.error}`);
    errors++;
  }
}

console.log('\n========================================');
console.log('📊 Auto-Fix Complete');
console.log('========================================');
console.log(`✅ Fixed: ${fixed}`);
console.log(`⏭️  Unchanged: ${unchanged}`);
console.log(`❌ Errors: ${errors}`);
console.log(`📁 Total: ${filesToFix.length}`);
console.log('\n💡 Tip: Backups created as .backup files');
