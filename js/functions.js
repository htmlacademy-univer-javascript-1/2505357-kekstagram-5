function isLongerOrShoter(string, maxLength) {
  return string.length <= maxLength;
}
isLongerOrShoter('проверяемая строка', 20);
isLongerOrShoter('проверяемая строка', 18);
isLongerOrShoter('проверяемая строка', 10);

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
isPalindrom('топот');
isPalindrom('ДовОд');
isPalindrom('Кекс');
isPalindrom('Лёша на полке клопа нашёл ');

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
getNumber('2023 год');
getNumber('ECMAScript 2022');
getNumber('1 кефир, 0.5 батона');
getNumber('агент 007');
getNumber('а я томат');
getNumber(2023);
getNumber(-1);
getNumber(1.5);
