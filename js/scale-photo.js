const ScaleParameters = {
  DEFAULT: 1,
  DEFAULT_VALUE: 100,
  STEP: 0.25,
  STEP_VALUE: 25,
};
const body = document.body;
const imgUploadOverlay = body.querySelector('.img-upload__overlay');
const imgUploadScale = imgUploadOverlay.querySelector('.img-upload__scale');
const scaleControlValue = imgUploadScale.querySelector('.scale__control--value');
const imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview img');
let currentScale = ScaleParameters.DEFAULT;
let currentScaleValue = ScaleParameters.DEFAULT_VALUE;

const updateScale = () => {
  imgUploadPreview.style.transform = `scale(${currentScale})`;
  scaleControlValue.value = `${currentScaleValue}%`;
};

const scalePhoto = (evt) => {
  if (evt.target.matches('.scale__control--smaller') && currentScale > ScaleParameters.STEP) {
    currentScale -= ScaleParameters.STEP;
    currentScaleValue -= ScaleParameters.STEP_VALUE;
  } else if (evt.target.matches('.scale__control--bigger') && currentScale < ScaleParameters.DEFAULT) {
    currentScale += ScaleParameters.STEP;
    currentScaleValue += ScaleParameters.STEP_VALUE;
  }
  updateScale();
};

const defaultScale = () => {
  currentScale = ScaleParameters.DEFAULT;
  currentScaleValue = ScaleParameters.DEFAULT_VALUE;
  updateScale();
};

export {scalePhoto, defaultScale};
