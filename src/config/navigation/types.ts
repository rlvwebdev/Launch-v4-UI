// Navigation type definitions

export interface NavItem {
  id: string;
  label: string;
  path: string;
  icon?: string;
}

export interface NavSection {
  id: string;
  title: string;
  icon: string;
  items: NavItem[];
}

export type NavigationConfig = NavSection[];
