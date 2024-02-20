const isLengthString = (string, length) => string.length <= length;

const isPalindrome = (string) => {
  let reverseString = '';

  for (let i = 0; i < string.length; i++) {
    reverseString += string.at(-i - 1)
  }
  return reverseString.toLowerCase().replaceAll(' ', '') === string.toLowerCase().replaceAll(' ', '');
};

isLengthString('проверяемая строка', 20);
isPalindrome('Лёша на полке клопа нашёл ');
