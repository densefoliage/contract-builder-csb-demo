import React, { useState, useEffect } from "react";
import Blockly from "blockly";
import beautify from "js-beautify"

import BlocklyPanel from "./blocklyPanel";

import emitEvent from "../js/emitEvent"

const beautifyIgnoreRegex = /(\/\* beautify ignore:)((start)|(end))( \*\/)/g
const allWhitespaceRegex = /\s/g;

const ContractBuilder = ({ socket, config, gotServerXml, setServerXml, serverXml }) => {

    const [blocklyOutput, setblocklyOutput] = useState({});
    const [solcOutput, setSolcOutput] = useState("");
    const [workspaceXml, setWorkspaceXml] = useState("");
  
    useEffect(() => {
      if (gotServerXml && workspaceXml !== serverXml) {
        emitEvent(socket, "xml_update", workspaceXml)
        // setServerXml(workspaceXml);
      }
    }, [workspaceXml, socket])
  
    const workspaceDidChange = (workspace) => {

      try {
        const newBlocklyOutput = JSON.parse(Blockly.JavaScript.workspaceToCode(workspace));
        setblocklyOutput(newBlocklyOutput);
      } catch (error) {
        setblocklyOutput({});
      }

      if (blocklyOutput.solc) {
        setSolcOutput(blocklyOutput.solc)
      } else {
        setSolcOutput("")
      }

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
          <h2>Pseudo Contract</h2>
          <pre>
            <code>
              { JSON.stringify(blocklyOutput, null, 2)}
            </code>
          </pre>
        </div>
        <div>
          <h2>Solidity Code</h2>
          <pre>
            <code>
              {beautify(solcOutput, {
                indent_size: 2,
              }).replace(beautifyIgnoreRegex, "")}
            </code>
          </pre>
        </div>
        <div>
          <h2>Workspace Model</h2>
          <h3>Formatted</h3>
          <pre>
            <code>
              {beautify.html(workspaceXml, {
                indent_size: 2,
              })}
            </code>
          </pre>
          <h3>Raw</h3>
          <pre>
            <code>
              {workspaceXml}
            </code>
          </pre>
        </div>
      </div>
    );
  };

export default ContractBuilder;