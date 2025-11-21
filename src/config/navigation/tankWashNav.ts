// Tank Wash Navigation Configuration

export const tankWashNavigation = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    items: [
      { id: 'overview', label: 'Overview', path: '/tankwash/overview', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>' },
    ],
  },
  {
    id: 'operations',
    title: 'Operations',
    items: [
      { id: 'schedule', label: 'Schedule', path: '/tankwash/operations/schedule', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>' },
      { id: 'queue', label: 'Queue', path: '/tankwash/operations/queue', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>' },
    ],
  },
  {
    id: 'quality',
    title: 'Quality',
    items: [
      { id: 'inspections', label: 'Inspections', path: '/tankwash/quality/inspections', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>' },
    ],
  },
];
