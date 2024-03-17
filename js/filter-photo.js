import {classAdd, classRemove, handlerAdd} from './util';

const SORT_FACTOR = 0.5;
const PHOTO_COUNT = 10;
const TYPES_FILTER = {RANDOM: 'filter-random', DISCUSSED: 'filter-discussed'};
const imgFilters = document.querySelector('.img-filters');
const imgFiltersForm = imgFilters.querySelector('.img-filters__form');

const randomSort = () => Math.random() - SORT_FACTOR;
const discussedSort = (a, b) => b.comments.length - a.comments.length;

const getPhotosByFilter = (array, filter) => {
  switch (filter) {
    case TYPES_FILTER.RANDOM:
      return [...array].sort(randomSort).slice(0, PHOTO_COUNT);
    case TYPES_FILTER.DISCUSSED:
      return [...array].sort(discussedSort);
    default:
      return array;
  }
};

const applyFilterOnClick = (evt, array, callback) => {
  if (evt.target.matches('.img-filters__button')) {
    imgFiltersForm.querySelectorAll('.img-filters__button').forEach((button) => classRemove(button, 'img-filters__button--active'));
    classAdd(evt.target, 'img-filters__button--active');

    callback(getPhotosByFilter(array, evt.target.id));
  }
};

const initializePhotoFiltering = (array, callback) => {
  classRemove(imgFilters, 'img-filters--inactive');

  handlerAdd(imgFiltersForm, 'click', (evt) => applyFilterOnClick(evt, array, callback));
};

export {initializePhotoFiltering};
