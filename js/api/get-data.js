import {getData, MessageClass} from './api';
import {renderMiniatures} from '../miniatures';
import {checkPhotoData} from '../big-photo';
import {initializeMessage} from '../messages';

getData()
  .then((photos) => {
    renderMiniatures(photos);
    checkPhotoData(photos);
  })
  .catch(() => initializeMessage(MessageClass.DATA_ERROR));
