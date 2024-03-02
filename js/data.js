import {getRandomInteger, createIdGenerator, getRandomArrayElement} from './util';

const COUNT_PHOTO = 25;
const COUNT_COMMENT = 30;
const COUNT_AVATAR = 6;
const DESCRIPTIONS = ['Бесконечное море под ясным небом', 'Горы, утопающие в облаках', 'Звездное небо над пустыней', 'Рассвет в лесу', 'Цветущий сад под солнечным светом', 'Туманный город в ранние часы', 'Снежные вершины под ярким солнцем', 'Старый замок на зеленой лужайке', 'Корабль на волнующемся море', 'Поле под золотым закатом'];
const MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
const NAMES = ['Алексей', 'Сергей', 'Мария', 'Екатерина', 'Андрей', 'Дмитрий', 'Ольга', 'Наталья', 'Владимир', 'Анна'];
const CountsLike = {MIN: 15, MAX: 200};

const photoId = createIdGenerator();
const commentId = createIdGenerator();

const createCommentObject = () => ({
  id: commentId(),
  avatar: getRandomInteger(1, COUNT_AVATAR),
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const createPhotoObject = () => {
  const id = photoId();
  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(CountsLike.MIN, CountsLike.MAX),
    comments: Array.from({length: getRandomInteger(0, COUNT_COMMENT)}, createCommentObject),
  };
};

const createPhotos = () => Array.from({length: COUNT_PHOTO}, createPhotoObject);

export {createPhotos};
