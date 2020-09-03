import React, { useState, useEffect } from "react";
import Blockly from "blockly";
import beautify from "js-beautify"

import BlocklyPanel from "./blocklyPanel";

const ContractBuilder = ({ config }) => {

    const [blocklyOutput, setblocklyOutput] = useState({});
    const [solcOutput, setSolcOutput] = useState("");
    const [workspaceXml, setWorkspaceXml] = useState("");

  
    const workspaceDidChange = (workspace) => {
      const newXml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace, true));
      setWorkspaceXml(newXml);
    };
  
    return (
      <div className="contract-builder">
        <h1>Contract Builder</h1>
        <div>
          <h2>Blockly Editor</h2>
          <BlocklyPanel
          config={config}
          workspaceDidChange={workspaceDidChange}
          />
        </div>
        <div>
          <h2>Workspace Model</h2>
          <pre>
            <code>
              {beautify.html(workspaceXml, {
                indent_size: 2,
              })}
            </code>
          </pre>
        </div>
      </div>
    );
  };

export default ContractBuilder;