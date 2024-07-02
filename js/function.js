// 1. Функция для проверки длины строки.
function checkLength (str, length) {
  if (str.length <= length) {
   console.log(true);
   } else {
     console.log(false);
   }
  }
 checkLength ('Привет, Денис!!!', 50);
 // 2.  Функция для проверки, является ли строка палиндромом.
 function checkPalindrom (string) {
 const normalString = string.toLocaleLowerCase().replaceAll(' ', '');
  for (let i = normalString.length - 1; i >= 0; i--) {
  newString += normalString[i];
  }
  if (newString === normalString) {
      console.log('Ура, ' + string + ' является палиндромом!!!');
      } else {
          console.log(string + 'не палиндром. Попробуйте ещё.');
      }
  }
  checkPalindrom('т опоТ ');
