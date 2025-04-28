import { createContext, useContext, useState } from "react";

const DialogContext = createContext();

export const DialogProvider = ({ children }) => {
  const [openDailog, setOpenDailog] = useState(false);
  return (
    <DialogContext.Provider value={{ openDailog, setOpenDailog }}>
      {children}
    </DialogContext.Provider>
  );
};

export const useDialog = () => useContext(DialogContext);
