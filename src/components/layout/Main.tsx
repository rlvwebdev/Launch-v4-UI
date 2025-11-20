import { ReactNode } from 'react';
import '../../styles/components/Main.css';

interface MainProps {
  children: ReactNode;
  sidebarOpen?: boolean;
  asideOpen?: boolean;
  className?: string;
}

export const Main = ({ 
  children, 
  sidebarOpen = true, 
  asideOpen = false,
  className = '' 
}: MainProps) => {
  return (
    <main 
      id="main-content" 
      className={`main ${sidebarOpen ? 'main--sidebar-open' : ''} ${asideOpen ? 'main--aside-open' : ''} ${className}`}
    >
      {children}
    </main>
  );
};
