import { isEscapeKey, submitButtonAccess } from './util.js';
import { scaleReset } from './scale.js';
import { resetEffects, initSlider, resetSlider } from './effects.js';
import { showSendingError, showSendingSuccess } from './errors-and-success.js';
import { sendData } from './api.js';
import { uploadPhoto } from './photo-upload.js';

const COMMENT_MAXLENGTH = 140;
const HASHTAGS_MAXCOUNT = 5;
const VALID_HASHTAG_STRING = /^#[a-zа-яё0-9]{1,19}$/i;
const SUBMIT_BUTTON_DEFAULT_TEXT = 'ОПУБЛИКОВАТЬ';
const SUBMIT_BUTTON_SENDING_TEXT = 'ПУБЛИКУЮ...';
const errorMessages = {
  INVALID_HASHTAG_STRING: 'Хэш-тег должен начинаться с #, состоять из букв и чисел без пробелов, максимальная длина одного хэш-тега 20 символов, включая #',
  COMMENT_MAXLENGTH_ERROR: `Длина комментария не может составлять больше ${COMMENT_MAXLENGTH} символов`,
  COUNT_HASHTAGS_ERROR: `Нельзя указать больше ${HASHTAGS_MAXCOUNT} хэш-тегов`,
  UNIQUENESS_ERROR: 'Хэш-теги не должны повторяться',
};
const bodyElement = document.querySelector('body');
const uploadFormElement = document.querySelector('.img-upload__form');
const uploadInputElement = uploadFormElement.querySelector('.img-upload__input');
const uploadOverlayElement = uploadFormElement.querySelector('.img-upload__overlay');
const uploadCancelButtonElement = uploadFormElement.querySelector('.img-upload__cancel');
const uploadHashtagElement = uploadFormElement.querySelector('.text__hashtags');
const uploadCommentElement = uploadFormElement.querySelector('.text__description');
const submitButtonElement = uploadFormElement.querySelector('.img-upload__submit');

const pristine = new Pristine(uploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'
});

const checkComment = (value) => value.length <= COMMENT_MAXLENGTH;

pristine.addValidator(uploadCommentElement, checkComment, errorMessages.COMMENT_MAXLENGTH_ERROR);

const getHashtags = (value) => {
  const hashtags = value.trim().split(/\s+/).filter(Boolean);
  return hashtags;
};

const checkSymbols = (value) => getHashtags(value).every((hashtag) => VALID_HASHTAG_STRING.test(hashtag));

const checkCount = (value) => getHashtags(value).length <= HASHTAGS_MAXCOUNT;

const checkUniqueness = (value) => {
  const hashtags = getHashtags(value);
  const lowerHashtags = hashtags.map((hashtag) => hashtag.toLowerCase());
  return lowerHashtags.length === new Set(lowerHashtags).size;
};

pristine.addValidator(uploadHashtagElement, checkSymbols, errorMessages.INVALID_HASHTAG_STRING);
pristine.addValidator(uploadHashtagElement, checkCount, errorMessages.COUNT_HASHTAGS_ERROR);
pristine.addValidator(uploadHashtagElement, checkUniqueness, errorMessages.UNIQUENESS_ERROR);

const isInputOnFocus = () =>
  document.activeElement === uploadHashtagElement || document.activeElement === uploadCommentElement;

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !isInputOnFocus()) {
    evt.preventDefault();
    closeForm();
  }
};

const openForm = () => {
  uploadInputElement.addEventListener('change', () => {
    uploadOverlayElement.classList.remove('hidden');
    document.addEventListener('keydown', onDocumentKeydown);
    bodyElement.classList.add('modal-open');
    uploadCancelButtonElement.addEventListener('click', closeForm);
    initSlider();
    uploadPhoto();
  });
};

function closeForm() {
  uploadFormElement.reset();
  pristine.reset();
  scaleReset();
  resetEffects();
  resetSlider();
  uploadOverlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  submitButtonAccess(submitButtonElement, false, SUBMIT_BUTTON_DEFAULT_TEXT);
}

const cleanPristineErrors = () => {
  uploadHashtagElement.addEventListener('keydown', () => {
    if (uploadHashtagElement.value !== '' || uploadCommentElement.value !== '') {
      pristine.reset();
    }
  });
};

const sendFormSubmit = (data) => {
  document.removeEventListener('keydown', onDocumentKeydown);
  cleanPristineErrors();
  submitButtonAccess(submitButtonElement, false, SUBMIT_BUTTON_SENDING_TEXT);
  sendData(new FormData(data))
    .then(() => {
      showSendingSuccess();
      closeForm();
    })
    .catch(() => {
      showSendingError();
    })
    .finally(submitButtonAccess(submitButtonElement, true, SUBMIT_BUTTON_SENDING_TEXT));
};

const checkFormSubmit = () => {
  uploadFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (pristine.validate()) {
      sendFormSubmit(evt.target);
    }
  });
};

export { onDocumentKeydown, openForm, checkFormSubmit, closeForm, submitButtonElement, SUBMIT_BUTTON_DEFAULT_TEXT };
