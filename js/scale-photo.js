const ScaleParameters = {
  DEFAULT: 1,
  DEFAULT_VALUE: 100,
  STEP: 0.25,
  STEP_VALUE: 25,
};
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadScale = imgUploadOverlay.querySelector('.img-upload__scale');
const scaleControlValue = imgUploadScale.querySelector('.scale__control--value');
const imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview img');
let currentScale = ScaleParameters.DEFAULT;
let currentScaleValue = ScaleParameters.DEFAULT_VALUE;

const applyScaleToPhoto = () => {
  imgUploadPreview.style.transform = `scale(${currentScale})`;
  scaleControlValue.value = `${currentScaleValue}%`;
};

const adjustPhotoScale = (evt) => {
  if (evt.target.matches('.scale__control--smaller') && currentScale > ScaleParameters.STEP) {
    currentScale -= ScaleParameters.STEP;
    currentScaleValue -= ScaleParameters.STEP_VALUE;
  } else if (evt.target.matches('.scale__control--bigger') && currentScale < ScaleParameters.DEFAULT) {
    currentScale += ScaleParameters.STEP;
    currentScaleValue += ScaleParameters.STEP_VALUE;
  }
  applyScaleToPhoto();
};

const resetPhotoScale = () => {
  currentScale = ScaleParameters.DEFAULT;
  currentScaleValue = ScaleParameters.DEFAULT_VALUE;
  applyScaleToPhoto();
};

export {adjustPhotoScale, resetPhotoScale};
