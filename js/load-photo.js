import {isEscapeKey, classAdd, classRemove, handlerAdd, handlerRemove} from './util';
import {pristine} from './validation';
import {scalePhoto, defaultScale} from './scale-photo';
import {createEffectSlider, addEffectHandler, removeEffectHandler} from './effects-photo';
import {setUserFormSubmit} from './api/send-data';

const body = document.body;
const imgUploadForm = body.querySelector('.img-upload__form');
const imgUploadInput = imgUploadForm.querySelector('.img-upload__input');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const imgUploadScale = imgUploadOverlay.querySelector('.img-upload__scale');
const imgUploadCancel = imgUploadForm.querySelector('.img-upload__cancel');
const imgUploadText = imgUploadForm.querySelector('.img-upload__text');

const inputInFocus = (evt) => {
  if (evt.target.matches('.text__hashtags, .text__description')) {
    evt.stopPropagation();
  }
};

const closeModalLoad = () => {
  classRemove(body, 'modal-open');
  classAdd(imgUploadOverlay, 'hidden');
  handlerRemove(document, 'keydown', onDocumentKeydownLoad);
  handlerRemove(imgUploadCancel, 'click', closeModalLoad);
  imgUploadForm.reset();
  pristine.reset();
  defaultScale();
  handlerRemove(imgUploadScale, 'click', scalePhoto);
  removeEffectHandler();
  setUserFormSubmit(null, false);
};

function onDocumentKeydownLoad(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModalLoad();
  }
}

const openModalLoad = () => {
  classAdd(body, 'modal-open');
  classRemove(imgUploadOverlay, 'hidden');
  handlerAdd(document, 'keydown', onDocumentKeydownLoad);
  handlerAdd(imgUploadCancel, 'click', closeModalLoad);
  handlerAdd(imgUploadText, 'keydown', inputInFocus);
  handlerAdd(imgUploadScale, 'click', scalePhoto);
  createEffectSlider();
  addEffectHandler();
  setUserFormSubmit(closeModalLoad, true);
};

handlerAdd(imgUploadInput, 'change', openModalLoad);

export {closeModalLoad, onDocumentKeydownLoad};
