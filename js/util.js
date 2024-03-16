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

export {isEscapeKey, createElement, classAdd, classRemove, handlerAdd, handlerRemove};
