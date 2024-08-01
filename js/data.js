import './util.js';
import {
  getRandomInteger,
  getRandomArrayElement,
  createIdGenerator,
} from './util.js';

const pictureCount = 25;
const likeMinCount = 15;
const likeMaxCount = 200;
const commentMinCount = 0;
const commentMaxCount = 30;
const avatarMinCount = 1;
const avatarMaxCount = 6;
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
  'Бывает жарко',
];

const commentsLine = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!',
];

const nameAuthor = [
  'Алексей',
  'Настя',
  'Павел',
  'Денис',
  'Юля',
  'Виктория',
  'Василий',
  'Денис',
  'Яна',
  'Николай',
  'Евгений',
  'Дмитрий',
];

const generateRandomId = createIdGenerator();
const createMessage = () => Array.from(
  {length: getRandomInteger(1, 2)},
  () => getRandomArrayElement(commentsLine),
);

const createComment = () => ({
  id: generateRandomId(),
  avatar: `img/avatar-${getRandomInteger(avatarMinCount, avatarMaxCount)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(nameAuthor),
});


const createPicture = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: getRandomArrayElement(description),
  likes: getRandomInteger(likeMinCount, likeMaxCount),
  comments: Array.from(
    {length: getRandomInteger(commentMinCount, commentMaxCount)},
    createComment
  )
});

const getPictures = () => Array.from(
  {length: pictureCount},
  (_, index) => createPicture(index + 1)
);

export{getPictures};

