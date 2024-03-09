import {isEscapeKey, classAdd, classRemove, handlerAdd, handlerRemove} from './util';
import {pristine} from './validation';

const body = document.body;
const imgUploadForm = body.querySelector('.img-upload__form');
const imgUploadInput = imgUploadForm.querySelector('.img-upload__input');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const imgUploadCancel = imgUploadForm.querySelector('.img-upload__cancel');
const textHashtags = imgUploadForm.querySelector('.text__hashtags');
const textDescription = imgUploadForm.querySelector('.text__description');

const inputInFocus = () => {
  handlerRemove(document, 'keydown', onDocumentKeydown);
};

const inputOutFocus = () => {
  handlerAdd(document, 'keydown', onDocumentKeydown);
};

const addInputHandler = () => {
  handlerAdd(textHashtags, 'focus', inputInFocus);
  handlerAdd(textDescription, 'focus', inputInFocus);
  handlerAdd(textHashtags, 'blur', inputOutFocus);
  handlerAdd(textDescription, 'blur', inputOutFocus);
};

const removeInputHandler = () => {
  handlerRemove(textHashtags, 'focus', inputInFocus);
  handlerRemove(textDescription, 'focus', inputInFocus);
  handlerRemove(textHashtags, 'blur', inputOutFocus);
  handlerRemove(textDescription, 'blur', inputOutFocus);
};

const closeModalLoad = () => {
  classRemove(body, 'modal-open');
  classAdd(imgUploadOverlay, 'hidden');
  handlerRemove(document, 'keydown', onDocumentKeydown);
  handlerRemove(imgUploadCancel, 'click', closeModalLoad);
  imgUploadForm.reset();
  pristine.reset();
  removeInputHandler();
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModalLoad();
  }
}

const openModalLoad = () => {
  classAdd(body, 'modal-open');
  classRemove(imgUploadOverlay, 'hidden');
  handlerAdd(document, 'keydown', onDocumentKeydown);
  handlerAdd(imgUploadCancel, 'click', closeModalLoad);
  addInputHandler();
};

handlerAdd(imgUploadInput, 'change', openModalLoad);
