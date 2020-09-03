import Blockly from "blockly";

let code_block_ids = new Set();
let object_ids = new Set();
let anonymous_predicates = new Set();
let extra_code = "";

let action_id = 1;
let block_id = 1;
let anonymous_predicate_id = 1;

function get_action_id() { return action_id++; }

function get_block_id() {
  const id = `block_${block_id++}`;
  code_block_ids.add(id);
  return id;
}

function get_anonymous_predicate_id() {
  const id = `apred_${block_id++}`;
  anonymous_predicates.add(id);
  return id;
}

Blockly.JavaScript.smart_contract = function (block) {
  // Reset counters etc.
  action_id = 1;
  block_id = 1;
  anonymous_predicate_id = 1;
  code_block_ids = new Set();
  object_ids = new Set();

  // Info from blocks
  const text_contract_name = block.getFieldValue("contract_name");
  const statements_contract_objects = Blockly.JavaScript.statementToCode(block, "contract_objects");
  const statements_code = Blockly.JavaScript.statementToCode(block, "code");

  // Generate code for the objects in the code
  let constructor_args = "";
  let constructor_copy = "";
  object_ids.forEach((id) => {
    constructor_args += `address _${id}, `;
    constructor_copy += `${id} = _${id};
  `;
  });
  constructor_args.replace(", $", "");

  // Generate code for all of the code blocks
  let code_block_setup = "";
  code_block_ids.forEach((id) => {
    code_block_setup += `bool ${id} = false;
`;
  });

  const code = `
pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

import "../structures/LocationalContractWrapper.sol";

contract ${text_contract_name.replace(" ", "")} is LocationalContractWrapper {
  ${statements_contract_objects}
  ${code_block_setup}
  constructor(${constructor_args}) public {
${constructor_copy}
  }

  function main() public returns (bool) {
    ${statements_code}
  }


}`;
  return code;
};

Blockly.JavaScript.predicate_check = function (block) {
  const text_predicate_id = block.getFieldValue("predicate_id");
  const code = `(! predicates['${text_predicate_id}'].satisfied ) || `;
  return code;
};

Blockly.JavaScript.exit_if_predicate_not_satisfied = function (block) {
  const statements_checks = Blockly.JavaScript.statementToCode(block, "checks");
  const conditions = statements_checks.replace(/\|\| $/, "");
  const code = `if( ${conditions} ) return false;`;
  return code;
};

Blockly.JavaScript.action = function (block) {
  const text_object_id = block.getFieldValue("object_id");
  const dropdown_action = block.getFieldValue("action");
  const code = `  emit Action(${get_action_id()}, ${text_object_id}, "${dropdown_action}");
`;
  return code;
};

Blockly.JavaScript.message = function (block) {
  const text_object_id = block.getFieldValue("object_id");
  const text_msg = block.getFieldValue("msg");
  const code = `  emit Message(${get_action_id()}, ${text_object_id}, "${text_msg}");
`;
  return code;
};

Blockly.JavaScript.guard_block = function (block) {
  const statements_code = Blockly.JavaScript.statementToCode(block, "code");
  const id = get_block_id();
  const code = `
  if( ! ${id} ) {
    ${id} = true;
    ${statements_code}
  }
  `;
  return code;
};

Blockly.JavaScript.guard_block_preconditions = function (block) {
  const ap = anonymous_predicates;
  const ec = extra_code;
  extra_code = "";
  anonymous_predicates = new Set();
  const statements_preconditions = Blockly.JavaScript.statementToCode(block, "preconditions");
  const preconditions_extra = extra_code;
  extra_code = "";
  const statements_code = Blockly.JavaScript.statementToCode(block, "code");
  const main_code_extra = extra_code;
  const precondition_id = get_block_id();
  const id = get_block_id();

  let guard = "";
  anonymous_predicates.forEach((id) => {
    guard += `if( ! predicates['${id}'].satisfied ) return false;` + "\n";
  });
  const code = `
  if( ! ${precondition_id} ) {
    ${precondition_id} = true;
    ${statements_preconditions}
    ${preconditions_extra}
  }
  ${guard}
  if( ! ${id} ) {
    ${id} = true;
    ${statements_code}
    ${main_code_extra}
  }
  `;
  anonymous_predicates = ap;
  extra_code = ec;
  return code;
};

Blockly.JavaScript.create_predicate = function (block) {
  const text_predicate_id = block.getFieldValue("predicate_id");
  const value_name = Blockly.JavaScript.valueToCode(block, "predicate", Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  const code = `add_predicate( ${text_predicate_id}, ${value_name});
`;
  return code;
};

Blockly.JavaScript.anonymous_predicate = function (block) {
  const anon_id = get_anonymous_predicate_id();
  const value_name = Blockly.JavaScript.valueToCode(block, "predicate", Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  const code = `add_predicate( ${anon_id}, ${value_name});
`;
  return code;
};

Blockly.JavaScript.predicate_verify = function (block) {
  const text_object_id = block.getFieldValue("object_id");
  const checkbox_create_action = block.getFieldValue("create_action") === "TRUE";
  const code = `p_verify(${text_object_id}, "Vbutton")`;
  // TODO: Change ORDER_NONE to the correct strength.
  if (checkbox_create_action) {
    extra_code += `  emit Action(${get_action_id()}, ${text_object_id}, "verify-button");
`;
  }
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript.thing_in_location = function (block) {
  const text_object_id = block.getFieldValue("object_id");
  const text_precision = block.getFieldValue("precision");
  const text_location_id = block.getFieldValue("location_id");
  const code = `p_located(${text_object_id}, '${text_location_id}', ${text_precision})`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript.object = function (block) {
  const text_object_id = block.getFieldValue("object_id");
  const text_desc = block.getFieldValue("desc");
  object_ids.add(text_object_id);
  const code = `
  address ${text_object_id}; //${text_desc}
  `;
  return code;
};

Blockly.JavaScript.contract_section = function (block) {
  const text_section_message = block.getFieldValue("section_message");
  // TODO: Assemble JavaScript into code variable.

  const code = `  emit ContractSubsection(${get_action_id()}, "${text_section_message}");
`;
  return code;
};
