import {handlerAdd, handlerRemove} from '../util';
import {sendData, MessageClass} from './api';
import {pristine, imgUploadForm, buttonDisabled, buttonEnabled} from '../validation';
import {initializeMessage} from '../messages';

let handleFormSubmission = null;

const createFormSubmissionHandler = (onSuccess) => (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    buttonDisabled();
    const formData = new FormData(evt.target);

    sendData(formData)
      .then(onSuccess)
      .then(() => initializeMessage(MessageClass.SUCCESS))
      .catch(() => initializeMessage(MessageClass.ERROR))
      .finally(buttonEnabled);
  }
};

const setUserFormSubmit = (onSuccess, handler) => {
  if (handler) {
    handleFormSubmission = createFormSubmissionHandler(onSuccess);
    handlerAdd(imgUploadForm, 'submit', handleFormSubmission);
  } else {
    handlerRemove(imgUploadForm, 'submit', handleFormSubmission);
    handleFormSubmission = null;
  }
};

export {setUserFormSubmit};
