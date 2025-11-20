// Quality Navigation Configuration

export const qualityNavigation = [
  {
    id: 'inspections',
    title: 'Inspections',
    items: [
      { id: 'overview', label: 'Overview', path: '/quality/inspections/overview', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>' },
      { id: 'schedule', label: 'Schedule', path: '/quality/inspections/schedule', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>' },
      { id: 'reports', label: 'Reports', path: '/quality/inspections/reports', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>' },
    ],
  },
  {
    id: 'audits',
    title: 'Audits',
    items: [
      { id: 'overview', label: 'Overview', path: '/quality/audits/overview', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>' },
      { id: 'findings', label: 'Findings', path: '/quality/audits/findings', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>' },
    ],
  },
  {
    id: 'compliance',
    title: 'Compliance',
    items: [
      { id: 'certifications', label: 'Certifications', path: '/quality/compliance/certifications', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>' },
      { id: 'standards', label: 'Standards', path: '/quality/compliance/standards', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>' },
    ],
  },
];
