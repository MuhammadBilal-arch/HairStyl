import React, { createContext, useState } from 'react';

// Create the context
const ModalContext = createContext(false);

// Create the provider component
export const ModalProvider = ({ children }: any) => {
    const [modalStatus, setModalStatus] = useState(false)

    
  const contextValue = {
    modalStatus,
    setModalStatus
  } as any;

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContext;
