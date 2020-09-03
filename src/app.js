import React from "react";

import Main from "./components/main";

import BlocklyPanel from "./components/blocklyPanel";
import blocklyConfig from "./blocklyConfig/psuedoContractConfig";

const url = 'ws://localhost:3030'
const verbose = true;

const App = () => {

  return (
    <>
      <div className="app">
        {url} ({verbose?"-V true":"-V false"})
        <Main
        url={url}
        verbose={verbose}
        />
      </div>
    </>
  );
};

export default App;