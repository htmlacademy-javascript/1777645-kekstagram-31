const SYMBOL = /^#[a-zа-яё0-9]{1,19}/i;
const HASHTAG_MAX_COUNT = 5;
const HASHTAG_MAX_LENGTH = 20;
const MessageError = {
  NAME: 'Хэштег начинается с символа # (решётка)',
  COUNT: 'Нельзя указать больше 5 хэштегов',
  DUPLICATE: 'Один и тот же хэштег не может быть использован дважды',
  LENGTH: 'Максимальная длина одного хэштега 20 символов, включая решётку'
};
const body = document.body;
const imgUploadForm = body.querySelector('.img-upload__form');
const textHashtags = imgUploadForm.querySelector('.text__hashtags');

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const createArrayHashtag = (value) => value.toLowerCase().split(' ').filter((hashtag) => hashtag);

const checkNameHashtag = (value) => createArrayHashtag(value).every((hashtag) => SYMBOL.test(hashtag));

const checkLengthHashtag = (value) => createArrayHashtag(value).every((hashtag) => hashtag.length <= HASHTAG_MAX_LENGTH);

const checkCountHashtag = (value) => createArrayHashtag(value).length <= HASHTAG_MAX_COUNT;

const checkDuplicateHashtag = (value) => new Set(createArrayHashtag(value)).size === createArrayHashtag(value).length;

pristine.addValidator(textHashtags, checkNameHashtag, MessageError.NAME);
pristine.addValidator(textHashtags, checkLengthHashtag, MessageError.LENGTH);
pristine.addValidator(textHashtags, checkCountHashtag, MessageError.COUNT);
pristine.addValidator(textHashtags, checkDuplicateHashtag, MessageError.DUPLICATE);

imgUploadForm.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});

export {pristine};
