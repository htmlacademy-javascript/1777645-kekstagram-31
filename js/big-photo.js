import {isEscapeKey, createElement} from './util';
import {dataPhotos} from './miniatures';

const blockPictures = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const socialComments = bigPicture.querySelector('.social__comments');
const body = document.querySelector('body');

const closeModal = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  bigPictureCancel.removeEventListener('click', closeModal);
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
}

const openModal = () => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  bigPictureCancel.addEventListener('click', closeModal);
  document.addEventListener('keydown', onDocumentKeydown);

  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
};

const clearComment = () => {
  socialComments.innerHTML = '';
};

const createComments = (array) => {
  const fragment = document.createDocumentFragment();

  array.forEach((item) => {
    const li = createElement('li', 'social__comment');
    const img = createElement('img', 'social__picture');
    img.src = item.avatar;
    img.alt = item.name;
    img.width = '35';
    img.height = '35';
    const p = createElement('p', 'social__text', item.message);
    li.append(img, p);
    fragment.append(li);
  });

  socialComments.append(fragment);
};

const showBigPhoto = (evt) => {
  const target = evt.target.closest('.picture');
  if (target) {
    evt.preventDefault();
    const currentPhoto = dataPhotos.find((photo) => photo.id === +target.dataset.id);
    bigPicture.querySelector('.big-picture__img img').src = currentPhoto.url;
    bigPicture.querySelector('.big-picture__img img').alt = currentPhoto.description;
    bigPicture.querySelector('.likes-count').textContent = currentPhoto.likes;
    bigPicture.querySelector('.social__comment-total-count').textContent = currentPhoto.comments.length;
    bigPicture.querySelector('.social__caption').textContent = currentPhoto.description;

    openModal();
    clearComment();
    createComments(currentPhoto.comments);
  }
};

blockPictures.addEventListener('click', showBigPhoto);
