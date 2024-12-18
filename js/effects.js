import { scaleReset } from './scale.js';

const DEFAULT_EFFECT = {
  name: 'none',
  filter: 'none',
  min: 0,
  max: 100,
  step: 1,
  unit: '',
};

const effectsData = {

  none: {
    filter: DEFAULT_EFFECT.filter,
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },

  chrome: {
    class: 'effects__preview--chrome',
    filter: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },

  sepia: {
    class: 'effects__preview--sepia',
    filter: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },

  marvin: {
    class: 'effects__preview--marvin',
    filter: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },

  phobos: {
    class: 'effects__preview--phobos',
    filter: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },

  heat: {
    class: 'effects__preview--heat',
    filter: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
};

const imagePreviewElement = document.querySelector('.img-upload__preview img');
const effectsLevelContainerElement = document.querySelector('.img-upload__effect-level');
const effectsLevelSliderElement = document.querySelector('.effect-level__slider');
const effectsLevelValueElement = document.querySelector('.effect-level__value');
const effectsContainerElement = document.querySelector('.effects');
let currentEffect = DEFAULT_EFFECT;

const createSlider = () => noUiSlider.create(effectsLevelSliderElement, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  start: DEFAULT_EFFECT.max,
  step: DEFAULT_EFFECT.step,
  connect: 'lower',
});

effectsLevelContainerElement.classList.add('hidden');

const isDefault = () => currentEffect.filter === DEFAULT_EFFECT.filter;

const changeSliderAbility = () => {
  if (isDefault()) {
    effectsLevelContainerElement.classList.add('hidden');
  } else {
    effectsLevelContainerElement.classList.remove('hidden');
  }
};

const changeSlider = () => {
  effectsLevelSliderElement.noUiSlider.updateOptions({
    range: {
      min: currentEffect.min,
      max: currentEffect.max,
    },
    step: currentEffect.step,
    start: currentEffect.max,
    connect: 'lower',
  });
  changeSliderAbility();
};

const onEffectsContainerChange = (evt) => {
  if (!evt.target.matches('input[type="radio"]')) {
    return;
  }
  const effectName = evt.target.value;
  changeCurrentEffect(effectName);
};

function changeCurrentEffect(effect) {
  currentEffect = effectsData[effect];
  changeSlider();
}

const onSliderUpdate = () => {
  const currentEffectValue = effectsLevelSliderElement.noUiSlider.get();
  if (isDefault()) {
    imagePreviewElement.style.filter = 'none';
    scaleReset();
  }
  imagePreviewElement.style.filter = `${currentEffect.filter}(${currentEffectValue}${currentEffect.unit})`;
  effectsLevelValue.value = currentEffectValue;
};

const initSlider = () => {
  createSlider();
  onSliderUpdate();
  effectsContainerElement.addEventListener('change', onEffectsContainerChange);
  effectsLevelSliderElement.noUiSlider.on('update', onSliderUpdate);
};

const resetSlider = () => {
  effectsContainerElement.removeEventListener('change', onEffectsContainerChange);
  effectsLevelSliderElement.noUiSlider.destroy();
};

const resetEffects = () => {
  currentEffect = DEFAULT_EFFECT;
  changeSlider();
};

export { resetEffects, initSlider, resetSlider };
