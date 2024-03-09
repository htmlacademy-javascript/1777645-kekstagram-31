const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createIdGenerator = () => {
  let lastGeneratedId = 1;
  return () => lastGeneratedId++;
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

const createElement = (tag, className, text) => {
  const element = document.createElement(tag);
  element.classList.add(className);
  element.textContent = text ? text : null;
  return element;
};

const classAdd = (element, className) => element.classList.add(className);
const classRemove = (element, className) => element.classList.remove(className);

const handlerAdd = (element, event, handler) => element.addEventListener(event, handler);
const handlerRemove = (element, event, handler) => element.removeEventListener(event, handler);

export {getRandomInteger, createIdGenerator, getRandomArrayElement, isEscapeKey, createElement, classAdd, classRemove, handlerAdd, handlerRemove};
