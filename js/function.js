//Функция для проверки длины строки.
function checkLength (str, length) {
  if (str.length <= length) {
   return true;
  } else {
    return false;
  }
  };
checkLength ('Привет, Денис!!!', 50);

//Функция для проверки на палиндром
function checkPalindrom (string) { //создаем функцию с параметром string
  let normalString = string.toLocaleLowerCase().replaceAll(' ', ''); //убираем пробелы и приводим к нижнему регистру
  let newString = '';
  for (let i = normalString.length - 1; i >= 0; i--) { //начало циклы = длина строки - 1 (c конца строки)
  newString += normalString[i]; //получаем и записываем символ с конца строки normalString в начало строки newString
  }
  if (newString === normalString) { //проверка на строгое равенство
    return true; //является палиндромом
    } else {
      return false; //не палиндром.
      }
  };
  checkPalindrom('Лёша на полке клопа нашёл ');
