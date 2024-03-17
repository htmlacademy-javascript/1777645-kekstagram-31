import {getData, MessageClass} from './api';
import {displayPhotoMiniatures} from '../miniatures';
import {initializePhotoDisplay} from '../big-photo';
import {initializeMessage} from '../messages';
import {debounce} from '../util';
import {initializePhotoFiltering} from '../filter-photo';

const RERENDER_DELAY = 500;

const processData = async () => {
  try {
    const arrayPhotos = await getData();
    displayPhotoMiniatures(arrayPhotos);
    initializePhotoDisplay(arrayPhotos);
    initializePhotoFiltering(arrayPhotos, debounce(displayPhotoMiniatures, RERENDER_DELAY));
  } catch (error) {
    initializeMessage(MessageClass.DATA_ERROR);
  }
};

processData();
