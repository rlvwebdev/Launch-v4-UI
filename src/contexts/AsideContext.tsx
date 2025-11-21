import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AsideContextType {
  asideContent: ReactNode | null;
  setAsideContent: (content: ReactNode | null) => void;
}

const AsideContext = createContext<AsideContextType | undefined>(undefined);

export const AsideProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [asideContent, setAsideContent] = useState<ReactNode | null>(null);

  return (
    <AsideContext.Provider value={{ asideContent, setAsideContent }}>
      {children}
    </AsideContext.Provider>
  );
};

export const useAside = () => {
  const context = useContext(AsideContext);
  if (context === undefined) {
    throw new Error('useAside must be used within an AsideProvider');
  }
  return context;
};
