function isLongerOrShoter(string, maxLength) {
  return string.length <= maxLength;
}
console.log(isLongerOrShoter('проверяемая строка', 20));
console.log(isLongerOrShoter('проверяемая строка', 18));
console.log(isLongerOrShoter('проверяемая строка', 10));

function isPalindrom(string) {
  const newString = string.replaceAll(' ', '').toUpperCase();
  let invertedString = '';
  for (let i = newString.length - 1; i >= 0; i--) {
    invertedString += newString[i];
  }
  if (newString === invertedString) {
    return true;
  }
  return false;
}
console.log(isPalindrom('топот'));
console.log(isPalindrom('ДовОд'));
console.log(isPalindrom('Кекс'));
console.log(isPalindrom('Лёша на полке клопа нашёл '));

function getNumber(string) {
  string = string.toString();
  let number = '';
  for (let i = 0; i <= string.length - 1; i++) {
    if (string[i] >= '0' && string[i] <= '9') {
      number += string[i];
    }
  }
  if (number.length > 0) {
    return parseInt(number, 10);
  }
  return NaN;
}
console.log(getNumber('2023 год'));
console.log(getNumber('ECMAScript 2022'));
console.log(getNumber('1 кефир, 0.5 батона'));
console.log(getNumber('агент 007'));
console.log(getNumber('а я томат'));
console.log(getNumber(2023));
console.log(getNumber(-1));
console.log(getNumber(1.5));
