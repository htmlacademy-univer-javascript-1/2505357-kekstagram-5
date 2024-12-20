import { isEscapeKey, closeMessage, showMessage, submitButtonAccess } from './util.js';
import { onDocumentKeydown, submitButtonElement, SUBMIT_BUTTON_DEFAULT_TEXT} from './form.js';

const templateError = document.querySelector('#error').content.querySelector('.error');
const errorContainer = templateError.cloneNode(true);
const errorButton = errorContainer.querySelector('.error__button');
const tempaleSuccess = document.querySelector('#success').content.querySelector('.success');
const successContainer = tempaleSuccess.cloneNode(true);
const successButton = successContainer.querySelector('.success__button');;

const closeSendingSuccess = () => {
  closeMessage(successButton, onSuccessButtonClick, onSuccessContainerEscKeydown ,onSuccessContainerMouseClick, successContainer);
};

function onSuccessButtonClick () {
  closeSendingSuccess();
}

function onSuccessContainerEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSendingSuccess();
  }
}

function onSuccessContainerMouseClick (evt) {
  if (!evt.target.matches('.success__inner')) {
    closeSendingSuccess();
  }
}

const showSendingSuccess = () => {
  showMessage(successContainer, successButton, onSuccessButtonClick, onSuccessContainerEscKeydown, onSuccessContainerMouseClick);
};

const closeSendingError = () => {
  closeMessage(errorButton, onErrorButtonClick, onErrorContainerEscKeydown, onErrorContainerMouseClick, errorContainer);
  submitButtonAccess(submitButtonElement, false, SUBMIT_BUTTON_DEFAULT_TEXT);
  document.addEventListener('keydown', onDocumentKeydown);
};

function onErrorButtonClick () {
  closeSendingError();
}

function onErrorContainerEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSendingError();
  }
}

function onErrorContainerMouseClick (evt) {
  if (!evt.target.matches('.error__inner')) {
    closeSendingError();
  }
}

const showSendingError = () => {
  showMessage(errorContainer, errorButton, onErrorButtonClick, onErrorContainerEscKeydown, onErrorContainerMouseClick);
};

export { showSendingError, showSendingSuccess };
