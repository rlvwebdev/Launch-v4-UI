# Agent Instructions - TMS Frontend Development

## Project Structure & File Organization

This is a React + TypeScript frontend application for a Transportation Management System (TMS). Follow these guidelines when creating new files and components.

## Directory Structure

```
src/
├── components/    # Reusable UI components
├── pages/         # Page-level components (routes)
├── layouts/       # Layout wrapper components
├── styles/        # Global styles and CSS modules
├── assets/        # Static assets (images, icons, fonts)
├── App.tsx        # Main application component
├── main.tsx       # Application entry point
└── index.css      # Global base styles

public/            # Static files served directly
```

## File Naming Conventions

- **Components**: PascalCase - `Button.tsx`, `LoadCard.tsx`, `DataTable.tsx`
- **Pages**: PascalCase - `Dashboard.tsx`, `LoadsPage.tsx`, `CarriersPage.tsx`
- **Layouts**: PascalCase - `MainLayout.tsx`, `AuthLayout.tsx`
- **Styles**: Match component name - `Button.css`, `LoadCard.module.css`
- **Assets**: lowercase-kebab - `logo.svg`, `truck-icon.png`

## Component Organization

### 1. Reusable Components (`src/components/`)
Place small, reusable UI components here:
- Buttons, inputs, cards, modals, tables
- Form elements, navigation items
- Any component used in multiple places

**Example structure:**
```
src/components/
├── Button/
│   ├── Button.tsx
│   ├── Button.css
│   └── index.ts          # Re-exports Button
├── Card/
│   ├── Card.tsx
│   └── Card.css
└── index.ts              # Barrel exports
```

### 2. Pages (`src/pages/`)
Place page-level components that represent routes:
- Dashboard, LoadsPage, CarriersPage, DriversPage
- Each page = one route in the app

**Example structure:**
```
src/pages/
├── Dashboard/
│   ├── Dashboard.tsx
│   ├── Dashboard.css
│   └── index.ts
├── Loads/
│   ├── LoadsPage.tsx
│   ├── LoadDetail.tsx   # Sub-pages related to loads
│   └── index.ts
└── index.ts
```

### 3. Layouts (`src/layouts/`)
Place layout wrapper components:
- MainLayout (header, sidebar, footer)
- AuthLayout (login/register pages)
- Any structural wrappers

**Example:**
```
src/layouts/
├── MainLayout/
│   ├── MainLayout.tsx
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   └── index.ts
└── index.ts
```

## Creating New Files - Step by Step

### When creating a new component:

1. **Determine the type**: Is it reusable? Page-level? Layout?
2. **Create a folder** (if it needs styles/sub-components)
3. **Create the component file** with this template:

```typescript
// src/components/Button/Button.tsx
import './Button.css';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button = ({ children, onClick, variant = 'primary' }: ButtonProps) => {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick}>
      {children}
    </button>
  );
};
```

4. **Create the style file** (same name as component):
```css
/* src/components/Button/Button.css */
.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary {
  background: #007bff;
  color: white;
}
```

5. **Create index.ts for easy imports**:
```typescript
// src/components/Button/index.ts
export { Button } from './Button';
```

6. **Add to barrel export** (optional but recommended):
```typescript
// src/components/index.ts
export { Button } from './Button';
export { Card } from './Card';
```

### When creating a new page:

1. Create folder in `src/pages/`
2. Create page component (e.g., `LoadsPage.tsx`)
3. Add styles if needed
4. Export from index.ts
5. Add route in `App.tsx` (if using React Router)

## Styling Approach & CSS Guidelines

### File Organization
- **Global styles**: `src/index.css` (resets, typography, colors, CSS variables)
- **Component styles**: Co-located `.css` files (e.g., `Button.css` with `Button.tsx`)
- **CSS Modules**: Use `.module.css` for scoped styles (optional)

### Unified CSS Structure

Every CSS file must follow this hierarchical structure with verbose comments:

```css
/* ============================================
   COMPONENT NAME
   Brief description of component purpose
   ============================================ */

/* --------------------------------------------
   CSS VARIABLES (if component-specific)
   -------------------------------------------- */
.component-name {
  --component-primary: #007bff;
  --component-spacing: 1rem;
}

/* --------------------------------------------
   BASE STYLES
   Core component structure and layout
   -------------------------------------------- */
.component-name {
  /* Layout */
  display: flex;
  flex-direction: column;
  
  /* Spacing */
  padding: var(--component-spacing);
  margin: 0;
  
  /* Typography */
  font-size: 1rem;
  font-weight: 400;
  
  /* Visual */
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
}

/* --------------------------------------------
   VARIANTS / MODIFIERS
   Different states or versions of component
   -------------------------------------------- */
.component-name--primary {
  background: var(--component-primary);
  color: white;
}

.component-name--large {
  padding: 1.5rem;
  font-size: 1.25rem;
}

/* --------------------------------------------
   CHILD ELEMENTS
   Nested elements within component
   -------------------------------------------- */
.component-name__header {
  /* Header-specific styles */
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.component-name__body {
  /* Body-specific styles */
  flex: 1;
}

.component-name__footer {
  /* Footer-specific styles */
  border-top: 1px solid #eee;
  padding-top: 0.5rem;
}

/* --------------------------------------------
   STATE CLASSES
   Interactive states (hover, focus, active, disabled)
   -------------------------------------------- */
.component-name:hover {
  border-color: var(--component-primary);
}

.component-name:focus {
  outline: 2px solid var(--component-primary);
  outline-offset: 2px;
}

.component-name--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* --------------------------------------------
   RESPONSIVE
   Media queries for different screen sizes
   -------------------------------------------- */
@media (max-width: 768px) {
  .component-name {
    padding: 0.5rem;
    font-size: 0.875rem;
  }
}

@media (max-width: 480px) {
  .component-name {
    padding: 0.25rem;
  }
}
```

### CSS Naming Conventions (BEM-style)

- **Block**: `.component-name` (the main component)
- **Element**: `.component-name__element` (child elements, use double underscore)
- **Modifier**: `.component-name--modifier` (variants, use double dash)

**Examples:**
```css
/* Block */
.load-card { }

/* Elements */
.load-card__header { }
.load-card__title { }
.load-card__status { }

/* Modifiers */
.load-card--highlighted { }
.load-card--compact { }

/* Combined */
.load-card__status--delivered { }
```

### Global CSS Variables (in `src/index.css`)

Define reusable design tokens at the root level:

```css
:root {
  /* Colors - Primary */
  --color-primary: #007bff;
  --color-primary-dark: #0056b3;
  --color-primary-light: #66b3ff;
  
  /* Colors - Semantic */
  --color-success: #28a745;
  --color-warning: #ffc107;
  --color-danger: #dc3545;
  --color-info: #17a2b8;
  
  /* Colors - Neutral */
  --color-text: #212529;
  --color-text-muted: #6c757d;
  --color-border: #dee2e6;
  --color-background: #f8f9fa;
  
  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  
  /* Typography */
  --font-family: system-ui, -apple-system, sans-serif;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.25rem;
  --font-size-xl: 1.5rem;
  
  /* Borders */
  --border-radius: 4px;
  --border-radius-lg: 8px;
  --border-width: 1px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  
  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
  --transition-slow: 350ms ease;
}
```

### CSS Property Order

Always maintain this order for consistency:

1. **Content** - `content`
2. **Position** - `position`, `top`, `right`, `bottom`, `left`, `z-index`
3. **Display** - `display`, `flex-direction`, `justify-content`, `align-items`, `grid-template`, etc.
4. **Box Model** - `width`, `height`, `padding`, `margin`, `border`
5. **Typography** - `font-family`, `font-size`, `line-height`, `color`, `text-align`
6. **Visual** - `background`, `opacity`, `box-shadow`
7. **Transform** - `transform`, `transition`, `animation`
8. **Misc** - `cursor`, `pointer-events`, `overflow`

### Comments in CSS

```css
/* ============================================
   SECTION HEADER (for major sections)
   ============================================ */

/* --------------------------------------------
   Subsection Header (for groups of rules)
   -------------------------------------------- */

/* Single line comment for specific property explanation */

/**
 * Multi-line comment for complex explanations
 * that require more detail about why something
 * is styled a particular way
 */
```

### When Editing Existing CSS Files

1. **Maintain existing structure** - Don't reorganize unless necessary
2. **Add comments** - Explain new additions with clear comments
3. **Follow established patterns** - Match the naming and structure already in place
4. **Group related rules** - Keep related styles together
5. **Update section headers** - If adding new sections, use proper header formatting
6. **Preserve spacing** - Maintain consistent blank lines between sections

### Example of Adding to Existing File

```css
/* Existing code... */

.button {
  display: inline-block;
  padding: var(--spacing-md);
}

/* --------------------------------------------
   NEW SECTION - Button Sizes
   Added: 2025-01-15 - Size variants for buttons
   -------------------------------------------- */
.button--small {
  /* Reduced padding for compact layouts */
  padding: var(--spacing-sm);
  font-size: var(--font-size-sm);
}

.button--large {
  /* Increased padding for emphasis */
  padding: var(--spacing-lg);
  font-size: var(--font-size-lg);
}
```

### Accessibility in CSS

Always include focus states and ensure proper contrast:

```css
/* --------------------------------------------
   ACCESSIBILITY
   Focus states and contrast adjustments
   -------------------------------------------- */
.component:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.component--disabled {
  /* Reduced opacity while maintaining readable text */
  opacity: 0.6;
  cursor: not-allowed;
}
```

### Cohesion Checklist

Before completing any CSS file:
- [ ] All sections have proper header comments
- [ ] Properties are in standard order
- [ ] CSS variables are used for colors, spacing, typography
- [ ] BEM naming convention is followed
- [ ] Responsive breakpoints are included if needed
- [ ] Focus states are defined for interactive elements
- [ ] Comments explain "why" not just "what"

## TypeScript Guidelines

- Always define prop interfaces
- Export interfaces if they're reused
- Use descriptive names: `ButtonProps`, `LoadCardProps`
- Avoid `any` - use proper types

## Questions to Ask Before Creating Files

When I ask you to create components, provide:

1. **Component name and purpose** - "Create a LoadCard to display load information"
2. **Where it belongs** - Is it reusable? Page-level? Layout?
3. **Props/data it needs** - What data does it display/accept?
4. **Styling preferences** - Colors, layout style, any specific design?
5. **Interactions** - Any click handlers, forms, buttons?

## Example Request Format

**Good request:**
"Create a reusable Card component in components/ that accepts a title, content, and optional footer. Style it with a white background, rounded corners, and shadow."

**Better request:**
"Create a LoadCard component in components/ that displays:
- Load number (string)
- Origin and destination (strings)
- Status badge (pending/in-transit/delivered)
- Price (number, formatted as currency)
Make it clickable and accept an onClick handler."

## Common Patterns

### Component with Props
```typescript
interface Props {
  title: string;
  onSave: () => void;
}

export const MyComponent = ({ title, onSave }: Props) => {
  // component code
};
```

### Page Component
```typescript
export const DashboardPage = () => {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      {/* content */}
    </div>
  );
};
```

### Layout Component
```typescript
export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="layout">
      <header>Header</header>
      <main>{children}</main>
      <footer>Footer</footer>
    </div>
  );
};
```

## Build Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

---

## Work Time Tracking

### Important: Log Your Hours
At the END of each work session, you MUST update the `WORK_LOG.md` file to track development hours.

### How to Log Your Time:
1. **Review your conversation history** with the AI agent to find timestamps
2. **Identify your start time** - Look at the timestamp of your first message in the session
3. **Identify your end time** - Look at the timestamp of your last message in the session
4. **Calculate total hours** - Duration between start and end
5. **List tasks completed** - Review what was accomplished during the session
6. **Update WORK_LOG.md** - Add a new entry with the date, times, hours, and tasks

### Why This Matters:
- **Proof of commitment** - Documents time invested in the project
- **Work tracking** - Creates a record of contributions and effort
- **Accountability** - Shows dedication and hours owed by others

### AI Agent Reminder:
When a user indicates they are ending their work session (e.g., "that's it for today", "I'm done", "wrapping up"), **ALWAYS REMIND THEM** to:
1. Check their conversation timestamps to log their work hours
2. Update the WORK_LOG.md file with today's entry
3. Commit the work log update to Git

**Example Reminder:**
> "Before you go, don't forget to update your WORK_LOG.md! Check the timestamps in our conversation to log your start/end times and list the tasks we completed today."

---

**Note**: This is a UI-focused project. Database integration comes later. Focus on creating clean, reusable components that will work with mock data first.
