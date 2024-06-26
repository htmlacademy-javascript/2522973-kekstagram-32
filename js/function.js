//    1. Функция для проверки длины строки.
function checkLength (str, length) {   //Создаем функцию checkLength с параметрами str и length
  if (str.length <= length) {  // условие - длина параметра str <= lenght
   console.log(true);
   } else {
     console.log(false);
   }
  };
 checkLength ('Привет, Денис!!!', 50);   //Вызываем функцию с заданными аргументами



 //    2.  Функция для проверки, является ли строка палиндромом.
 function checkPalindrom (string) {   //создаем функцию с параметром string
  let normalString = string.toLocaleLowerCase().replaceAll(' ', ''); //убираем пробелы и приводим к нижнему регистру
  let newString = '';

  for (let i = normalString.length - 1; i >= 0; i--) {  //начало циклы = длина строки - 1 (c конца строки)

  newString += normalString[i]; //получаем и записываем символ с конца строки normalString в начало строки newString
  }

  if (newString === normalString) {  //проверка на строгое равенство
      console.log('Ура, \"' + string + '"\ является палиндромом!!!')
      }  else {
          console.log('\"' + string + '"\ не палиндром. Попробуйте ещё.')
      }

  };
  checkPalindrom('т опоТ ');
