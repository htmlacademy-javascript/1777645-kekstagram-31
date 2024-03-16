import {isEscapeKey, handlerAdd, handlerRemove} from './util';
import {onDocumentKeydownLoad} from './load-photo';
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
      handlerAdd(document, 'keydown', onDocumentKeydownLoad);
    }

    handlerRemove(document, 'keydown', onDocumentKeydownMessage);
    copyTemplate.remove();
  };

  const closeIfNotMessage = (evt) => {
    if (!evt.target.closest(`.${className}__inner`)) {
      closeMessage();
    }
  };

  function onDocumentKeydownMessage(evt) {
    if (isEscapeKey(evt)) {
      closeMessage();
    }
  }

  const removeMessageAfterDelay = () => {
    setTimeout(() => {
      copyTemplate.remove();
    }, DELAY_TIME);
  };

  const showMessage = () => {
    fragment.append(copyTemplate);
    body.append(fragment);

    if (className === MessageClass.DATA_ERROR) {
      return removeMessageAfterDelay();
    }

    handlerRemove(document, 'keydown', onDocumentKeydownLoad);
    handlerAdd(document, 'keydown', onDocumentKeydownMessage);
    handlerAdd(copyTemplate, 'click', closeIfNotMessage);
    handlerAdd(button, 'click', closeMessage);
  };

  showMessage();
};

export {initializeMessage};
