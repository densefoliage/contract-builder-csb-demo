const leadingNumbersRegex = /^[0-9]+/;
const nonAlphanumericRegex = /[^\w]|_/g;
const followingWhitespaceRegex = /\s+(.)/g;
const firstCharRegex = /./;

const toCamelCase = (string) => {
    return string.toLowerCase().replace(followingWhitespaceRegex, (match, group) => { 
      return group.toUpperCase()  
    }).replace(leadingNumbersRegex, "").replace(firstCharRegex, (match) => { 
      return match.toLowerCase()
    }).replace(nonAlphanumericRegex,"");
  }

export default toCamelCase;