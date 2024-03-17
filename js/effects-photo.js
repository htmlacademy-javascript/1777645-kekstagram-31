import {classAdd, classRemove, handlerAdd, handlerRemove} from './util';

const EffectParameters = {
  NONE: {name: 'none', min: 0, max: 0, unit: '', step: 0},
  CHROME: {name: 'grayscale', min: 0, max: 1, unit: '', step: 0.1, },
  SEPIA: {name: 'sepia', min: 0, max: 1, unit: '', step: 0.1, },
  MARVIN: {name: 'invert', min: 0, max: 100, unit: '%', step: 1, },
  PHOBOS: {name: 'blur', min: 0, max: 3, unit: 'px', step: 0.1, },
  HEAT: {name: 'brightness', min: 1, max: 3, unit: '', step: 0.1, }
};
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview img');
const imgUploadEffects = imgUploadOverlay.querySelector('.img-upload__effects');
const imgUploadEffectLevel = imgUploadOverlay.querySelector('.img-upload__effect-level');
const effectLevelValue = imgUploadEffectLevel.querySelector('.effect-level__value');
const effectLevelSlider = imgUploadEffectLevel.querySelector('.effect-level__slider');
let currentEffect = EffectParameters.NONE;

const isNoneEffect = () => currentEffect.name === EffectParameters.NONE.name;

const toggleEffectSliderVisibility = () => isNoneEffect() ? classAdd(imgUploadEffectLevel, 'hidden') : classRemove(imgUploadEffectLevel, 'hidden');

const createEffectSlider = () => {
  const sliderOptions = {
    range: {
      min: currentEffect.min,
      max: currentEffect.max,
    },
    start: currentEffect.max,
    step: currentEffect.step,
    connect: 'lower',
    format: {
      to: (value) => {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: (value) => parseFloat(value)
    },
  };

  if (effectLevelSlider.noUiSlider) {
    effectLevelSlider.noUiSlider.updateOptions(sliderOptions);
  } else {
    noUiSlider.create(effectLevelSlider, sliderOptions);
  }
};

const updateEffectSlider = () => {
  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: currentEffect.min,
      max: currentEffect.max,
    },
    start: currentEffect.max,
    step: currentEffect.step,
  });
};

const applyEffectValue = () => {
  effectLevelValue.value = effectLevelSlider.noUiSlider.get();
  imgUploadPreview.style.filter = `${currentEffect.name}(${effectLevelValue.value}${currentEffect.unit})`;
  toggleEffectSliderVisibility();
};

const updateCurrentEffect = (evt) => {
  if (evt.target.matches('.effects__radio')) {
    const effect = evt.target.value.toUpperCase();
    currentEffect = EffectParameters[effect];
    updateEffectSlider();
  }

  if (isNoneEffect()) {
    imgUploadPreview.removeAttribute('style');
  }
};

const addEffectHandler = () => {
  effectLevelSlider.noUiSlider.on('update', applyEffectValue);
  handlerAdd(imgUploadEffects, 'change', updateCurrentEffect);
};

const removeEffectHandler = () => {
  effectLevelSlider.noUiSlider.destroy();
  handlerRemove(imgUploadEffects, 'change', updateCurrentEffect);
};

export {createEffectSlider, addEffectHandler, removeEffectHandler};
