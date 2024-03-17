const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const blockPictures = document.querySelector('.pictures');

const createPhotoElement = ({id, url, description, likes, comments}) => {
  const photoElement = pictureTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = url;
  photoElement.querySelector('.picture__img').alt = description;
  photoElement.querySelector('.picture__comments').textContent = comments.length;
  photoElement.querySelector('.picture__likes').textContent = likes;
  photoElement.dataset.id = id;

  return photoElement;
};

const displayPhotoMiniatures = (arrayPhotos) => {
  blockPictures.querySelectorAll('.picture').forEach((item) => item.remove());
  const fragment = document.createDocumentFragment();

  arrayPhotos.forEach((photo) => {
    const photoElement = createPhotoElement(photo);
    fragment.append(photoElement);
  });

  blockPictures.append(fragment);
};


export {displayPhotoMiniatures};
