import "./geopactBlocks";
import "./geopactGenerators";

import parseXml from "../parseXml";
import theme from "../theme";

const workspaceXml = `
<xml xmlns="http://www.w3.org/1999/xhtml" id="workspaceBlocks" style="display:none">
</xml>
`;

const toolboxXml = `
<xml xmlns="http://www.w3.org/1999/xhtml" id="toolbox" style="display: none;">
  <category name="Structure" categorystyle="structure_category">
    <block type="smart_contract">
      <field name="contract_name">Contract Name</field>
    </block>
    <block type="contract_section">
      <field name="section_message">Section Name</field>
    </block>
    <block type="guard_block"></block>
    <block type="exit_if_predicate_not_satisfied"></block>
    <block type="guard_block_preconditions"></block>
  </category>
  <category name="Actions" categorystyle="actions_category">
    <block type="action">
      <field name="object_id">object</field>
      <field name="action">lock</field>
    </block>
    <block type="message">
      <field name="object_id">object</field>
      <field name="msg">"Hello"</field>
    </block>
  </category>
  <category name="Predicates" categorystyle="predicates_category">
    <block type="create_predicate">
      <field name="predicate_id">id</field>
    </block>
    <block type="anonymous_predicate"></block>
    <block type="predicate_check">
      <field name="predicate_id">predicate_id</field>
    </block>
    <block type="predicate_verify">
      <field name="object_id">object</field>
      <field name="create_action">TRUE</field>
    </block>
    <block type="thing_in_location">
      <field name="object_id">object_id</field>
      <field name="precision">precision</field>
      <field name="location_id">location</field>
    </block>
  </category>
  <category name="Variables" categorystyle="variables_category">
    <block type="object">
      <field name="object_id">id</field>
      <field name="desc">description</field>
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
  sounds: true,
  oneBasedIndex: true,
  theme,
  grid: {
    spacing: 20,
    length: 3,
    colour: "#ccc",
    snap: true,
  },
};

const config = {
  workspaceXml,
  toolboxXml,
  toolboxCategories,
  workspaceOptions,
};

export default config;
