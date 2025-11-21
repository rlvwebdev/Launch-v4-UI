import React, { useState, useEffect } from 'react';
import { DryBulkDaily, DryBulkDailyAside } from './Reporting/DryBulkDaily';
import { mockTerminals } from '../../data/mockTerminalData';
import { useAside } from '../../contexts/AsideContext';

export const DryBulkOverview: React.FC = () => {
  const [activeDay, setActiveDay] = useState<'today' | 'tomorrow'>('today');
  const { setAsideContent } = useAside();

  // Update aside content whenever activeDay changes
  useEffect(() => {
    setAsideContent(<DryBulkDailyAside activeDay={activeDay} terminals={mockTerminals} />);
    
    // Clean up aside content when component unmounts
    return () => setAsideContent(null);
  }, [activeDay, setAsideContent]);

  return <DryBulkDaily activeDay={activeDay} onDayChange={setActiveDay} />;
};
