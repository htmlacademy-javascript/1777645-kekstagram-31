const isLengthString = (string, length) => string.length <= length;

const isPalindrome = (string) => {
  let reverseString = '';

  for (let i = 0; i < string.length; i++) {
    reverseString += string.at(-i - 1);
  }
  return reverseString.toLowerCase().replaceAll(' ', '') === string.toLowerCase().replaceAll(' ', '');
};

const getNumber = (data) => {
  let result = '';

  if (typeof (data) === 'number') {
    return Math.abs(data.toString().replace('.', ''));
  }

  for (let i = 0; i < data.length; i++) {
    if (!Number.isNaN(parseInt(data[i], 10))) {
      result += data[i];
    }
  }

  return parseInt(result, 10);
};

isLengthString('проверяемая строка', 20);
isPalindrome('Лёша на полке клопа нашёл ');
getNumber(-1.5);
