import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface VisibilityContextType {
  isEventSectionVisible: boolean;
  setEventSectionVisible: (visible: boolean) => void;
  isTitleVisible: boolean;
  setTitleVisible: (visible: boolean) => void;
}

const VisibilityContext = createContext<VisibilityContextType | undefined>(undefined);

export const useVisibility = () => {
  const context = useContext(VisibilityContext);
  if (context === undefined) {
    throw new Error('useVisibility must be used within a VisibilityProvider');
  }
  return context;
};

interface VisibilityProviderProps {
  children: ReactNode;
}

export const VisibilityProvider: React.FC<VisibilityProviderProps> = ({ children }) => {
  const [isEventSectionVisible, setEventSectionVisible] = useState(false);
  const [isTitleVisible, setTitleVisible] = useState(true);

  // Sempre mostrar o título ao carregar a página
  useEffect(() => {
    setTitleVisible(true);
    setEventSectionVisible(false);
  }, []);

  const handleEventSectionVisibility = (visible: boolean) => {
    setEventSectionVisible(visible);
    setTitleVisible(!visible); // Quando EventSection aparece, título some
  };

  const handleTitleVisibility = (visible: boolean) => {
    setTitleVisible(visible);
    setEventSectionVisible(!visible); // Quando título aparece, EventSection some
  };

  return (
    <VisibilityContext.Provider
      value={{
        isEventSectionVisible,
        setEventSectionVisible: handleEventSectionVisibility,
        isTitleVisible,
        setTitleVisible: handleTitleVisibility,
      }}
    >
      {children}
    </VisibilityContext.Provider>
  );
}; 