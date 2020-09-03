import Blockly from "blockly";

import "./psuedoContractGenerators";

import parseXml from "./parseXml";
import theme from "./theme";
import blockJson from "./psuedoContractBlocks.json";

Blockly.defineBlocksWithJsonArray(blockJson);

const workspaceXml = ``;

// const workspaceXml = `<xml xmlns="https://developers.google.com/blockly/xml">
//   <block type="smart_contract" x="-10" y="30">
//     <field name="name">Smart Contract Builder Test</field>
//     <field name="authors">Joe, Dave and Ella</field>
//     <statement name="objects">
//       <block type="object">
//         <field name="name">Default Thing 1</field>
//         <field name="description">A fun throwback to the geopact code.</field>
//         <next>
//           <block type="object">
//             <field name="name">Default Thing 2</field>
//             <field name="description">The same joke repeated.</field>
//           </block>
//         </next>
//       </block>
//     </statement>
//     <statement name="contract-code">
//       <block type="contract_section">
//         <field name="name">Sending a message.</field>
//         <statement name="children">
//           <block type="message">
//             <field name="target">Default Thing 1</field>
//             <field name="content">Test message.</field>
//           </block>
//         </statement>
//         <next>
//           <block type="contract_section">
//             <field name="name">Emitting an action command.</field>
//             <statement name="children">
//               <block type="action">
//                 <field name="target">Default Thing 2</field>
//                 <field name="action">unlock</field>
//                 <next>
//                   <block type="message">
//                     <field name="target">Default Thing 2</field>
//                     <field name="content">This thing just unlocked!</field>
//                   </block>
//                 </next>
//               </block>
//             </statement>
//           </block>
//         </next>
//       </block>
//     </statement>
//   </block>
// </xml>`;

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
    startScale: 0.66,
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
