module.exports = function check(str, bracketsConfig) {
  const openBrackets = ['(', '{', '[', '|'];
  const bracketsPair = {}
  let equalSymbol = [];

  for (let item of bracketsConfig) {
    //в каждом подмассиве
    for (let i = 0; i < item.length; i += 2) {
      //если символ открытия == символу закрытия, выносим в отдельный массив
      if (item[i] === item[i + 1]) {
        equalSymbol.push(item[i]);
      } else {
        //иначе заносим в объект в виде 'символ закрытия': 'символ открытия'
        bracketsPair[item[i + 1]] = item[i];
      }
    }
  }

  let stack = []
  for (let i = 0; i < str.length; i++) {
    
    let currentBracket = str[i]
    if (openBrackets.includes(currentBracket)) {
      stack.push(currentBracket);
    } else {
      if (str.length === 0) {
        return false
      }

      let lastElement = stack[stack.length - 1];
      
      if (bracketsPair[currentBracket] === lastElement) {
        stack.pop();
      } else {
        return false
      }
    }
  }

  return stack.length === 0
}




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