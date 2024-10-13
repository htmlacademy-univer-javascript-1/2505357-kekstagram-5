import { getRandomInteger, getRandomArrayElement, createIdGenerator } from './util.js';

const IMAGE_COUNT = 25;
const MIN_LIKE_COUNT = 15;
const MAX_LIKE_COUNT = 200;
const COMMENT_COUNT = 30;
const AVATAR_COUNT = 6;
const MESSAGE_COUNT = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const DESCRIPTION_COUNT = [
  'На берегу моря.',
  'Дети играют на площадке.',
  'Гуляем с друзьями.',
  'Весело проводим время.',
  'На утренней рыблаке.',
  'Прекрасный вид из окна.',
  'Лес зимним утором.',
  'Мир прекрасен.',
  'Вид из окна.',
  'Тишина и спокойствие.',
  'Космос изумителен.',
];
const NAMES = [
  'Алексей',
  'Александр',
  'Антон',
  'Михаил',
  'Николай',
  'Степан',
];

const generateCommentId = createIdGenerator();

const createMessage = () => Array.from(
  {length: getRandomInteger(1, 2)},
  () => getRandomArrayElement(MESSAGE_COUNT),
).join(' ');

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES),
});

const createImage = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: getRandomArrayElement(DESCRIPTION_COUNT),
  likes: getRandomInteger(MIN_LIKE_COUNT, MAX_LIKE_COUNT),
  comments: Array.from({length: getRandomInteger(0, COMMENT_COUNT)}, createComment,),
});

const getImages = () => Array.from(
  {length: IMAGE_COUNT}, (_, imageIndex) => createImage(imageIndex + 1),);

export { getImages };
