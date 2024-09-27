function isLongerOrShoter(string, maxLength) {
  return string.length <= maxLength;
}

function isPalindrom(string) {
  let newString = string.replaceAll(' ', '').toUpperCase();
  let invertedString = '';
  for (let i = newString.length - 1; i >= 0; i--) {
    invertedString += newString[i]
  }
  if (newString === invertedString) {
    return true;
  }
  return false;
}

function getNumber(string) {
  string = string.toString();
  let number = '';
  for (let i = 0; i <= string.length - 1; i++) {
    if (string[i] >= '0' && string[i] <= '9') {
      number += string[i];
    }
  }
  if (parseInt(number)) {
    return parseInt(number);
  }
  return NaN;
}
