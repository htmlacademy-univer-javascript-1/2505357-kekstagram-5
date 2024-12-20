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

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};


export {isEscapeKey, closeMessage, showMessage, submitButtonAccess, debounce, showAlert };
