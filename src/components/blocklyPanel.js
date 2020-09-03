import React, { useState } from "react";
import PropTypes from "prop-types";

import ReactBlocklyComponent from "react-blockly";

const BlocklyPanel = ({ config, workspaceDidChange }) => {
  
  const [toolboxCategories, setToolboxCategories] = useState(config.toolboxCategories);

  return (
    <div className="blockly-panel" style={{height: "95vh", width: "95vw"}}>
      <div className="inner-blockly-panel" style={{height: "100%", width: "100%"}}>
        <ReactBlocklyComponent.BlocklyEditor
        toolboxCategories={toolboxCategories}
        workspaceConfiguration={config.workspaceOptions}
        initialXml={config.workspaceXml}
        wrapperDivClassName="fill-height"
        workspaceDidChange={workspaceDidChange}
        />
      </div>
    </div>
  );
};

BlocklyPanel.propTypes = {
  config: PropTypes.object,
  workspaceDidChange: PropTypes.func
};

export default BlocklyPanel;
