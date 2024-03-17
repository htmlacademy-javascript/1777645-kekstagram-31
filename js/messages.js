import {isEscapeKey, handlerAdd, handlerRemove} from './util';
import {onDocumentKeydownUploadModal} from './upload-photo';
import {MessageClass} from './api/api';

const DELAY_TIME = 5000;
const body = document.body;

const initializeMessage = (className) => {
  const fragment = document.createDocumentFragment();
  const messageTemplate = body.querySelector(`#${className}`).content.querySelector(`.${className}`);
  const copyTemplate = messageTemplate.cloneNode(true);
  const button = copyTemplate.querySelector(`.${className}__button`);

  const closeMessage = () => {
    if (className === MessageClass.ERROR) {
      handlerAdd(document, 'keydown', onDocumentKeydownUploadModal);
    }

    handlerRemove(document, 'keydown', onDocumentKeydownMessage);
    copyTemplate.remove();
  };

  const closeIfClickedOutsideMessage = (evt) => {
    if (!evt.target.closest(`.${className}__inner`)) {
      closeMessage();
    }
  };

  function onDocumentKeydownMessage(evt) {
    if (isEscapeKey(evt)) {
      closeMessage();
    }
  }

  const scheduleMessageRemoval = () => {
    setTimeout(() => {
      copyTemplate.remove();
    }, DELAY_TIME);
  };

  const displayMessage = () => {
    fragment.append(copyTemplate);
    body.append(fragment);

    if (className === MessageClass.DATA_ERROR) {
      return scheduleMessageRemoval();
    }

    handlerRemove(document, 'keydown', onDocumentKeydownUploadModal);
    handlerAdd(document, 'keydown', onDocumentKeydownMessage);
    handlerAdd(copyTemplate, 'click', closeIfClickedOutsideMessage);
    handlerAdd(button, 'click', closeMessage);
  };

  displayMessage();
};

export {initializeMessage};
