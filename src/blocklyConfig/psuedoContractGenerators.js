import Blockly from "blockly";

const allWhitespaceRegex = /\s/g;
const allLineBreaksRegex = /\n/g;
const lastCommaRegex = /(,)(?!.*\1)/s;

let _blockIdCounter; let _objectIdCounter; let _actionIdCounter; let
  _anonymousPredicateIdCounter;

const ethereumAddressPlaceholder = "0x0000000000000000000000000000000000000000";

const blockIds = new Set();
const objectIds = new Set();

/*
--------------------------------------------------
------------------- Functions --------------------
--------------------------------------------------
*/

const getBlockId = () => {
  const id = `block${_blockIdCounter++}`;
  blockIds.add(id);
  return id;
};

//TODO: Use object names if unique, else use ObjectId.
const getObjectId = () => {
  const id = `object${_objectIdCounter++}`;
  objectIds.add(id);
  return id;
};

const getActionId = () => _actionIdCounter++;

const getAnonymousPredicateId = () => `predicate-${_anonymousPredicateIdCounter++}`;

const resetIds = () => {
  blockIds.clear();
  objectIds.clear();
  _blockIdCounter = 1;
  _objectIdCounter = 1;
  _actionIdCounter = 1;
  _anonymousPredicateIdCounter = 1;
};

const toCamelCase = (string) => {
  const followingWhitespaceRegex = /\s+(.)/g;
  const firstCharRegex = /./;
  return string.replace(followingWhitespaceRegex, (match, group) => { 
    return group.toUpperCase();
  }).replace(firstCharRegex, (match) => { 
    return match.toLowerCase();
  });
};

/*
--------------------------------------------------
------------------- Structure --------------------
--------------------------------------------------
*/

Blockly.JavaScript.smart_contract = function (block) {
  resetIds();

  const blockId = getBlockId();
  const name = block.getFieldValue("name");
  const nameCamel = toCamelCase(name);
  const authors = block.getFieldValue("authors");
  const objects = Blockly.JavaScript.statementToCode(block, "objects");
  const children = Blockly.JavaScript.statementToCode(block, "contract-code");

  let constructorArgs = "";
  let constructorCopy = "";
  objectIds.forEach((id) => {
    constructorArgs += `address _${id}, `;
    constructorCopy += `${id} = _${id};\n`;
  });

  // eslint-disable-next-line
  let objectInitSolc = `${"${objectInitSolc}"}`;
  // eslint-disable-next-line
  let codeBlockInitSolc = `${"${codeBlockInitSolc}"}`;
  // eslint-disable-next-line
  let childSolc = `${"${childSolc}"}`;

  const solc = `
/* beautify ignore:start */pragma solidity ^0.5.0;/* beautify ignore:end */
pragma experimental ABIEncoderV2;
import '../structures/LocationalContractWrapper.sol';
contract ${nameCamel} is LocationalContractWrapper {
  ${objectInitSolc}
  ${codeBlockInitSolc}
  constructor(${constructorArgs}) public {
    ${constructorCopy}
  }
  function main() public returns (bool) {
    ${childSolc}
  }
}
`.replace(allLineBreaksRegex, "");

const code = `
{
  "blockId": "${blockId}",
  "type": "contract-wrapper",
  "name": "${name}",
  "nameCamel": "${nameCamel}",
  "authors": "${authors === "Author(s)" ? "Unattributed" : authors}",
  "objects": [${objects.replace(lastCommaRegex, "")}],
  "children": [${children.replace(lastCommaRegex, "")}],
  "solc": "${solc}"
}`;

  return code;
};

Blockly.JavaScript.contract_section = function (block) {
  const blockId = getBlockId();
  const name = block.getFieldValue("name");
  const nameCamel = toCamelCase(name);
  const children = Blockly.JavaScript.statementToCode(block, "children");

  const code = `
  {
    "blockId": "${blockId}",
    "type": "section",
    "name": "${name}",
    "nameCamel": "${nameCamel}",
    "active": false,
    "complete": false,
    "children": [${children.replace(lastCommaRegex, "")}]
  },
  `;

  return code;
};

/*
--------------------------------------------------
------------------- Variables --------------------
--------------------------------------------------
*/

Blockly.JavaScript.object = function (block) {
  const blockId = getBlockId();
  const name = block.getFieldValue("name");
  const nameCamel = toCamelCase(name);
  const objectId = getObjectId();
  const description = block.getFieldValue("description");

  const code = `
  {
    "blockId": "${blockId}",
    "type": "object",
    "name": "${name}",
    "nameCamel": "${nameCamel}",
    "objectId": "${objectId}",
    "description": "${description === "Description" ? "No Description" : description}",
    "ethereumAddress": "${ethereumAddressPlaceholder}"
  },
  `;

  return code;
};

/*
--------------------------------------------------
-------------------- Actions ---------------------
--------------------------------------------------
*/

Blockly.JavaScript.action = function (block) {
  const target = block.getFieldValue("target");
  const actionType = block.getFieldValue("action");
  const blockId = getBlockId();
  const actionId = getActionId();

  const code = `
  {
    "blockId": "${blockId}",
    "type": "message",
    "target": "${target}",
    "actionType": "${actionType}",
    "actionId": ${actionId},
    "active": false,
    "complete": false
  },
  `;

  return code;
};

Blockly.JavaScript.message = function (block) {
  const target = block.getFieldValue("target");
  const content = block.getFieldValue("content");
  const blockId = getBlockId();
  const actionId = getActionId();

  const code = `
  {
    "blockId": "${blockId}",
    "type": "message",
    "target": "${target}",
    "content": "${content}",
    "actionId": ${actionId},
    "active": false,
    "complete": false
  },
  `;

  return code;
};
