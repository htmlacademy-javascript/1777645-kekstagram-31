import {isEscapeKey, classAdd, classRemove, handlerAdd, handlerRemove} from './util';
import {pristine} from './validation';
import {adjustPhotoScale, resetPhotoScale} from './scale-photo';
import {createEffectSlider, addEffectHandler, removeEffectHandler} from './effects-photo';
import {setUserFormSubmit} from './api/send-data';
import {uploadAndPreviewPhoto, clearPreviewPhoto} from './preview-photo';

const body = document.body;
const imgUploadForm = body.querySelector('.img-upload__form');
const imgUploadInput = imgUploadForm.querySelector('.img-upload__input');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const imgUploadScale = imgUploadOverlay.querySelector('.img-upload__scale');
const imgUploadCancel = imgUploadForm.querySelector('.img-upload__cancel');
const imgUploadText = imgUploadForm.querySelector('.img-upload__text');

const stopPropagationOnInputFocus = (evt) => {
  if (evt.target.matches('.text__hashtags, .text__description')) {
    evt.stopPropagation();
  }
};

const closeUploadModal = () => {
  classRemove(body, 'modal-open');
  classAdd(imgUploadOverlay, 'hidden');
  handlerRemove(document, 'keydown', onDocumentKeydownUploadModal);
  handlerRemove(imgUploadCancel, 'click', closeUploadModal);
  imgUploadForm.reset();
  pristine.reset();
  resetPhotoScale();
  handlerRemove(imgUploadScale, 'click', adjustPhotoScale);
  removeEffectHandler();
  setUserFormSubmit(null, false);
  clearPreviewPhoto();
};

function onDocumentKeydownUploadModal(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadModal();
  }
}

const openUploadModal = () => {
  classAdd(body, 'modal-open');
  classRemove(imgUploadOverlay, 'hidden');
  handlerAdd(document, 'keydown', onDocumentKeydownUploadModal);
  handlerAdd(imgUploadCancel, 'click', closeUploadModal);
  handlerAdd(imgUploadText, 'keydown', stopPropagationOnInputFocus);
  handlerAdd(imgUploadScale, 'click', adjustPhotoScale);
  createEffectSlider();
  addEffectHandler();
  setUserFormSubmit(closeUploadModal, true);
  uploadAndPreviewPhoto();
};

handlerAdd(imgUploadInput, 'change', openUploadModal);

export {closeUploadModal, onDocumentKeydownUploadModal};
