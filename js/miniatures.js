import {createPhotos} from './data';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const blockPictures = document.querySelector('.pictures');
const dataPhotos = createPhotos();
const fragment = document.createDocumentFragment();

dataPhotos.forEach(({url, description, likes, comments}) => {
  const photoElement = pictureTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = url;
  photoElement.querySelector('.picture__img').alt = description;
  photoElement.querySelector('.picture__comments').textContent = comments.length;
  photoElement.querySelector('.picture__likes').textContent = likes;

  fragment.append(photoElement);
});

blockPictures.append(fragment);
