const message = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!',
];
const nameAuthor = [
  'Алексей',
  'Ольга',
  'Павел',
  'Денис',
  'Юля',
  'Нина',
  'Василий',
  'Денис',
  'Яна',
  'Николай',
  'Евгений',
  'Дмитрий',
];
const description = [
  'Любовь с первого взгляда',
  'Осенний лес',
  'Утром на море',
  'Разгар рабочего дня у Кекса',
  'Будущий олимпиец',
  'Просто обычное фото',
  'Летом в деревне',
  'Позитиффф',
  'Вот оно - счастье!',
  'На старте',
  'Первым делом самолёты...',
  'Бывает жарко)',
];

const massId = [[], [], [], [], [], [], [], []]; //Создаем пустой массив с индексами для каждого рассчета
function createPhoto(min, max) {
  for (let i = 0; i <= max * max; i++) {
    // eslint-disable-next-line no-inner-declarations
    function getRandomNumber() {
      return Math.floor(Math.random() * ((max + 1) - min)) + min;
    }
    const j = getRandomNumber();
    if (!massId[0].includes(j) && max === 25) { //id, url
      massId[0].push(j);
    }
    if (!massId[1].includes(j) && max === 200) { //likes
      massId[1].push(j);
    }
    if (!massId[2].includes(j) && max === 29) { //comments
      massId[2].push(j);
    }
    if (!massId[3].includes(j) && max === 1000) { //id_comments
      massId[3].push(j);
    }
    if (!massId[4].includes(j) && max === 6) { //avatar
      massId[4].push(j);
    }
    if (!massId[5].includes(j) && max === 6) { //message
      massId[5].push(j);
    }
    if (!massId[6].includes(j) && max === 11) { //nameAuthor
      massId[6].push(j);
    }
    if (!massId[7].includes(j) && max === 11) { //Description
      massId[7].push(j);
    }
  }
  return massId;
}


const commentsObject = () => ({
  idComments: createPhoto(1, 1000)[3].shift(),
  avatar: `img/avatar-${createPhoto(1, 6)[4].shift()}.svg`,
  message: message[createPhoto(0, 6)[5].shift()],
  name: nameAuthor[createPhoto(0, 11)[6].shift()]
});

const comments = Array.from({length: createPhoto(0, 29)[2].shift()}, commentsObject);
const describePhoto = () => ({
  id: createPhoto(1, 25)[0].shift(),
  url: `photos/${createPhoto(1, 25)[0].shift()}.jpg`,
  description: description[createPhoto(0, 11)[7].shift()],
  likes: createPhoto(15, 200)[1].shift(),
  comments: comments,
});

// eslint-disable-next-line no-unused-vars
const userPhoto = Array.from({length: 25}, describePhoto);
//console.table(userPhoto);
