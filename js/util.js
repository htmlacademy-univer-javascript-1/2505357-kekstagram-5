const isEscapeKey = (evt) => evt.key === 'Escape';

const closeMessage = (button, onClick, onEsc, onMouseClick, container) => {
  button.removeEventListener('click', onClick);
  document.removeEventListener('keydown', onEsc);
  document.removeEventListener('click', onMouseClick);
  container.remove();
};

const showMessage = (container, button, onClick, onEsc, onMouseClick) => {
  document.body.append(container);
  button.addEventListener('click', onClick);
  document.addEventListener('keydown', onEsc);
  document.addEventListener('click', onMouseClick);
};

const submitButtonAccess = (button, condition, value) => {
  button.disabled = condition;
  button.textContent = value;
};

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {isEscapeKey, closeMessage, showMessage, submitButtonAccess, debounce };
