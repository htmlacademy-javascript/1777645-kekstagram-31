const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const imgUpload = document.querySelector('.img-upload');
const imgUploadInput = imgUpload.querySelector('.img-upload__input');
const imgUploadPreview = imgUpload.querySelector('.img-upload__preview img');
const effectsPreview = imgUpload.querySelectorAll('.effects__preview');

let objectURL;

const uploadAndPreviewPhoto = () => {
  const file = imgUploadInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    objectURL = URL.createObjectURL(file);
    imgUploadPreview.src = objectURL;
    effectsPreview.forEach((preview) => {
      preview.style.backgroundImage = `url(${objectURL})`;
    });
  }
};

const clearPreviewPhoto = () => {
  if (objectURL) {
    URL.revokeObjectURL(objectURL);
    objectURL = null;
  }

  imgUploadPreview.removeAttribute('src');
  effectsPreview.forEach((preview) => {
    preview.removeAttribute('style');
  });
};

export {uploadAndPreviewPhoto, clearPreviewPhoto};
