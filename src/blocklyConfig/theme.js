import Blockly from "blockly";

const theme = Blockly.Theme.defineTheme("geopact", {
  base: Blockly.Themes.Classic,
  componentStyles: {
  },
  categoryStyles: {
    structure_category: {
      colour: "0",
    },
    variables_category: {
      colour: "60",
    },
    predicates_category: {
      colour: "90",
    },
    actions_category: {
      colour: "170",
    },
    other_category: {
      colour: "#222",
    },
  },
  blockStyles: {
    smart_contract_block: {
      colourPrimary: "#703434",
      colourSecondary: "350",
      colourTertiary: "0",
    },
    structure_blocks: {
      colourPrimary: "0",
      colourSecondary: "10",
      colourTertiary: "20",
    },
    variables_blocks: {
      colourPrimary: "45",
      colourSecondary: "55",
      colourTertiary: "65",
    },
    predicates_structure_blocks: {
      colourPrimary: "#5c8755",
      colourSecondary: "100",
      colourTertiary: "110",
    },
    predicates_blocks: {
      colourPrimary: "90",
      colourSecondary: "100",
      colourTertiary: "110",
    },
    actions_blocks: {
      colourPrimary: "170",
      colourSecondary: "180",
      colourTertiary: "190",
    },
    other_blocks: {
      colourPrimary: "#222",
      colourSecondary: "#444",
      colourTertiary: "#666",
    },
  },
  // "startHats": true,
  // "fontStyle" : {},
});

export default theme;
