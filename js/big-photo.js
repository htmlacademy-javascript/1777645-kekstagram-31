import {isEscapeKey, createElement} from './util';
import {dataPhotos} from './miniatures';

const SHOW_COUNT_COMMENT = 5;
const HIDDEN_CLASS = 'hidden';
const body = document.querySelector('body');
const blockPictures = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const socialComments = bigPicture.querySelector('.social__comments');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentShownCount = bigPicture.querySelector('.social__comment-shown-count');

const classAdd = (element, className) => element.classList.add(className);
const classRemove = (element, className) => element.classList.remove(className);

const showComments = (array, count) => {
  for (let i = 0; i < count; i++) {
    classRemove(array[i], HIDDEN_CLASS);
  }
  commentShownCount.textContent = socialComments.children.length - socialComments.querySelectorAll(`.${HIDDEN_CLASS}`).length;
};

const loadComments = () => {
  const hiddenComments = socialComments.querySelectorAll(`.${HIDDEN_CLASS}`);
  if (hiddenComments.length > SHOW_COUNT_COMMENT) {
    showComments(hiddenComments, SHOW_COUNT_COMMENT);
  } else {
    showComments(hiddenComments, hiddenComments.length);
    classAdd(commentsLoader, HIDDEN_CLASS);
  }
};

const closeModal = () => {
  classRemove(body, 'modal-open');
  classAdd(bigPicture, HIDDEN_CLASS);
  bigPictureCancel.removeEventListener('click', closeModal);
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsLoader.removeEventListener('click', loadComments);
  classRemove(commentsLoader, HIDDEN_CLASS);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
}

const openModal = () => {
  classAdd(body, 'modal-open');
  classRemove(bigPicture, HIDDEN_CLASS);
  bigPictureCancel.addEventListener('click', closeModal);
  document.addEventListener('keydown', onDocumentKeydown);
  commentsLoader.addEventListener('click', loadComments);
};

const clearComment = () => {
  socialComments.innerHTML = '';
};

const createComments = (array) => {
  const fragment = document.createDocumentFragment();

  array.forEach(({avatar, name, message}) => {
    const li = createElement('li', 'social__comment');
    classAdd(li, HIDDEN_CLASS);
    const img = createElement('img', 'social__picture');
    img.src = avatar;
    img.alt = name;
    img.width = '35';
    img.height = '35';
    const p = createElement('p', 'social__text', message);
    li.append(img, p);
    fragment.append(li);
  });

  socialComments.append(fragment);
};

const createPhotoData = ({url, description, likes, comments}) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.big-picture__img img').alt = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__comment-total-count').textContent = comments.length;
  bigPicture.querySelector('.social__caption').textContent = description;
};

const showBigPhoto = (evt) => {
  const target = evt.target.closest('.picture');
  if (target) {
    evt.preventDefault();
    const currentPhoto = dataPhotos.find((photo) => photo.id === +target.dataset.id);

    openModal();
    createPhotoData(currentPhoto);
    clearComment();
    createComments(currentPhoto.comments);
    loadComments();
  }
};

blockPictures.addEventListener('click', showBigPhoto);
