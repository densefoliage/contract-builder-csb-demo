import Blockly from "blockly";

import "./psuedoContractGenerators";

import parseXml from "./parseXml";

import blockJson from "./psuedoContractBlocks.json";
import initialXml from "./initialXml";
import theme from "./theme";

Blockly.defineBlocksWithJsonArray(blockJson);

const workspaceXml = initialXml;

const toolboxXml = `
<xml xmlns="http://www.w3.org/1999/xhtml" id="toolbox" style="display: none;">
  <category name="Structure" categorystyle="structure_category">
    <block type="smart_contract">
      <field name="contract_name">Contract Name Test</field>
    </block>
    <block type="contract_section">
    </block>
  </category>
  <category name="Variables" categorystyle="variables_category">
    <block type="object">
    </block>
  </category>
  <category name="Predicates" categorystyle="predicates_category">
    <block type="if_this_do_that">
    </block>
    <block type="if_else">
    </block>
    <block type="is_near">
    </block>
    <block type="is_far">
    </block>
    <block type="time_is">
    </block>
    <block type="does">
    </block>
  </category>
  <category name="Actions" categorystyle="actions_category">
    <block type="action">
    </block>
    <block type="custom_action">
    </block>
    <block type="message">
    </block>
  </category>
  <category name="Comment" categorystyle="other_category">
    <block type="comment">
    </block>
  </category>
</xml>
`;

const toolboxCategories = parseXml(toolboxXml);

const workspaceOptions = {
  collapse: true,
  comments: true,
  disable: true,
  maxBlocks: Infinity,
  trashcan: true,
  horizontalLayout: false,
  toolboxPosition: "start",
  css: true,
  media: "https://blockly-demo.appspot.com/static/media/",
  rtl: false,
  scrollbars: true,
  sounds: false,
  oneBasedIndex: true,
  theme,
  grid: {
    spacing: 20,
    length: 3,
    colour: "#ccc",
    snap: false,
  },
  zoom: {
    controls: true,
    startScale: 0.75,
  }
};

const config = {
   blockJson,
   workspaceXml,
   toolboxXml,
   toolboxCategories,
   workspaceOptions,
};

export default config;
