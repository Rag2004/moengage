
const generateMatchingCodes = (pattern) => {
    const allCodes = [];
    for (let i = 100; i <= 599; i++) {
      allCodes.push(i.toString());
    }
  
    const regexPattern = new RegExp('^' + pattern.replace(/x/g, '\\d') + '$');
    
    return allCodes.filter(code => regexPattern.test(code));
  };
  
  module.exports = { generateMatchingCodes };
  