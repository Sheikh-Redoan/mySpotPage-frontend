import { useState } from "react";
import { MainContext } from "./Context";

function StateContextProvider({ children }) {
  const [currentTab, setCurrentTab] = useState("Dashboard");

  const stateInfo = {
    currentTab,
    setCurrentTab,
  };

  return (
    <MainContext.Provider value={stateInfo}>{children}</MainContext.Provider>
  );
}

export default StateContextProvider;
