import {isEscapeKey} from './util.js';
import {resetScale} from './scale.js';
import {resetEffects} from './effect.js';
import {showSuccessMessage} from './message.js';


const form = document.querySelector('.img-upload__form');
const fileField = document.querySelector('#upload-file');
const formUpload = document.querySelector('.img-upload__overlay');
const bodyElement = document.querySelector('body');
const cancelButton = document.querySelector('#upload-cancel');
const hashtagField = form.querySelector('.text__hashtags');
const commentField = form.querySelector('.text__description');
const buttonSubmit = document.querySelector('.img-upload__submit');
const photoPreview = form.querySelector('.img-upload__preview img');
const effectsPreviews = form.querySelectorAll('.effects__preview');

const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const fileType = ['jpg', 'jpeg', 'png'];
const hashtagErrors = {
  UNVALID_HASHTAG: 'Неправильный хэштег',
  UNVALID_COUNT: `Максимум ${MAX_HASHTAG_COUNT} хештегов`,
  NOT_UNIQUE: 'Хэштеги не должны повторяться',
};
const commentErorr = 'Максимальная длина комментария 140 символов';

const buttonSubmitText = {
  IDLE: 'Отправить',
  SENDING: 'Отправляю...'
};

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

const showModal = () => {
  formUpload.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeyDown);
};

const hideFormModal = () => {
  form.reset();
  resetScale();
  resetEffects();
  pristine.reset();
  formUpload.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyDown);
};

function onEscKeyDown (evt) {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    hideFormModal();
  }
}

const isValidType = (file) => {
  const fileName = file.name.toLowerCase();
  return fileType.some((it) => fileName.endsWith(it));
};

function onInputKeydownEscape (evt) {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
}

const onFileInputChange = () => {
  const file = fileField.files[0];

  if (file && isValidType(file)) {
    photoPreview.src = URL.createObjectURL(file);
    effectsPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url('${photoPreview.src}')`;
    });
  }
  showModal();
};

const onCancelButtonClick = () => {
  hideFormModal();
};
const togleSubmitButton = (isDisabled) => {
  buttonSubmit.disabled = isDisabled;
  buttonSubmit.textContent = isDisabled
    ? buttonSubmitText.SUBMITTING
    : buttonSubmitText.IDLE;
};

const setUserFormSubmit = (callback) => {
  form.addEventListener('submit', async(evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      togleSubmitButton(true);
      await callback(new FormData(form));
      togleSubmitButton();
    }
  });
};

const showSuccessHandler = () => {
  hideFormModal();
  showSuccessMessage();
};

const prepareHashtags = (inputTag) => inputTag.trim().split(' ').filter((tag) => tag.length > 0);

const isHashtagsValid = (value) => prepareHashtags(value).every((tag) => VALID_SYMBOLS.test(tag));

const isHashtagsCount = (value) => prepareHashtags(value).length <= MAX_HASHTAG_COUNT;

const isHashtagUnique = (value) => {
  const lowerCaseTags = prepareHashtags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const isCommentLengthValid = (inputComment) => inputComment.length <= MAX_COMMENT_LENGTH;

pristine.addValidator(hashtagField, isHashtagsCount, hashtagErrors.UNVALID_COUNT, 3, true);

pristine.addValidator(hashtagField, isHashtagUnique, hashtagErrors.NOT_UNIQUE, 2, true);

pristine.addValidator(hashtagField, isHashtagsValid, hashtagErrors.UNVALID_HASHTAG, 1, true);

pristine.addValidator(commentField, isCommentLengthValid, commentErorr);

hashtagField.addEventListener('keydown', onInputKeydownEscape);
commentField.addEventListener('keydown', onInputKeydownEscape);

fileField.addEventListener('change', onFileInputChange);
cancelButton.addEventListener('click', onCancelButtonClick);

export {setUserFormSubmit, hideFormModal, showSuccessHandler};


