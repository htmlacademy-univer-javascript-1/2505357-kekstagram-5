const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_DEFAULT = 100;
const SCALE_STEP = 25;

const imagePreviewElement = document.querySelector('.img-upload__preview img');
const scaleSizeElement = document.querySelector('.img-upload__scale');
const scaleSizeControlElement = scaleSizeElement.querySelector('.scale__control--value');
const smallerButtonElement = scaleSizeElement.querySelector('.scale__control--smaller');
const biggerButtonElement = scaleSizeElement.querySelector('.scale__control--bigger');
let currentScale = SCALE_DEFAULT;

const setNewScale = (value) => {
  imagePreviewElement.style.transform = `scale(${value / 100})`;
  scaleSizeControlElement.value = `${value}%`;
};

const onSmallerButtonClick = () => {
  currentScale = parseInt(scaleSizeControlElement .value, 10);
  let newScale = currentScale - SCALE_STEP;
  if (newScale < SCALE_MIN) {
    newScale = SCALE_MIN;
  }
  setNewScale(newScale);
};

const onBiggerButtonClick = () => {
  currentScale = parseInt(scaleSizeControlElement.value, 10);
  let newScale = currentScale + SCALE_STEP;
  if (newScale > SCALE_MAX) {
    newScale = SCALE_MAX;
  }
  setNewScale(newScale);
};

const initImageScale = () => {
  smallerButtonElement.addEventListener('click', onSmallerButtonClick);
  biggerButtonElement.addEventListener('click', onBiggerButtonClick);
};

const scaleReset = () => {
  setNewScale(SCALE_DEFAULT);
  smallerButtonElement.removeEventListener('click', initImageScale(onSmallerButtonClick));
  biggerButtonElement.removeEventListener('click', initImageScale(onBiggerButtonClick));
};

export { initImageScale, scaleReset };
