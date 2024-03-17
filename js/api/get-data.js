import {getData, MessageClass} from './api';
import {renderMiniatures} from '../miniatures';
import {checkPhotoData} from '../big-photo';
import {initializeMessage} from '../messages';

const processData = async () => {
  try {
    const photos = await getData();
    renderMiniatures(photos);
    checkPhotoData(photos);
  } catch (error) {
    initializeMessage(MessageClass.DATA_ERROR);
  }
};

processData();
