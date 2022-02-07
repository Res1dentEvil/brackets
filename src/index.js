module.exports = function check(str, bracketsConfig) {
  let openBrackets = []
  let bracketsPair = {}

  bracketsConfig.map((subArr) => openBrackets.push(subArr[0]))
  bracketsConfig.forEach((subArr) => (bracketsPair[subArr[1]] = subArr[0]))

  let stack = []
  for (let i = 0; i < str.length; i++) {
    let currentBracket = str[i];
    if (openBrackets.includes(currentBracket)) {
      if (Object.keys(bracketsPair).includes(currentBracket) && stack[stack.length - 1] === currentBracket) {
        stack.pop();
      } else {
        stack.push(currentBracket);
      }

    } else {
      if (stack.length === 0) {
        return false;
      }
      let lastElement = stack[stack.length - 1];
      if (bracketsPair[currentBracket] === lastElement) {
        stack.pop();
      } else {
        return false;
      }
    }
  }
  return stack.length === 0;
};



/*
check('()', [['(', ')']]) // -> true
check('((()))()', [['(', ')']]) // -> true
check('())(', [['(', ')']]) // -> false
check('([{}])', [['(', ')'], ['[', ']'], ['{', '}']]) // -> true
check('[(])', [['(', ')'], ['[', ']']]) // -> false
check('[]()', [['(', ')'], ['[', ']']]) // -> true
check('[]()(', [['(', ')'], ['[', ']']]) // -> false

// special case: opening and closing bracket can be the same :)

check('||', [['|', '|']]) // -> true
check('|()|', [['(', ')'], ['|', '|']]) // -> true
check('|(|)', [['(', ')'], ['|', '|']]) // -> false
check('|()|(||)||', [['(', ')'], ['|', '|']]) // -> true
*/