// Finance Navigation Configuration

export const financeNavigation = [
  {
    id: 'accounts',
    title: 'Accounts',
    items: [
      { id: 'receivable', label: 'Accounts Receivable', path: '/finance/accounts/receivable', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>' },
      { id: 'payable', label: 'Accounts Payable', path: '/finance/accounts/payable', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>' },
    ],
  },
  {
    id: 'reporting',
    title: 'Reporting',
    items: [
      { id: 'overview', label: 'Overview', path: '/finance/reporting/overview', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>' },
      { id: 'p-and-l', label: 'P&L Statements', path: '/finance/reporting/p-and-l', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>' },
      { id: 'balance-sheet', label: 'Balance Sheet', path: '/finance/reporting/balance-sheet', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>' },
    ],
  },
  {
    id: 'budgeting',
    title: 'Budgeting',
    items: [
      { id: 'budget', label: 'Budget', path: '/finance/budgeting/budget', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>' },
      { id: 'forecasting', label: 'Forecasting', path: '/finance/budgeting/forecasting', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>' },
    ],
  },
];
