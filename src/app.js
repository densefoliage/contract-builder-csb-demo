import React from "react";

import ContractBuilder from "./components/contractBuilder";
import config from "./blocklyConfig/psuedoContractConfig";

const App = () => {

  return (
    <div className="app">
      <ContractBuilder
      config={config}
      />
    </div>
  );
};

export default App;