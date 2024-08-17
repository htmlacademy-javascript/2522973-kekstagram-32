const COMMENTS_PER_PORTION = 5;
const bodyElement = document.querySelector('body');
const bigPhotoElem = document.querySelector('.big-picture');
const commentShownCountElement = bigPhotoElem.querySelector('.social__comment-shown-count');
const commentTotalCountElement = bigPhotoElem.querySelector('.social__comment-total-count');
const commentListElement = bigPhotoElem.querySelector('.social__comments');
const commentsLoaderElement = bigPhotoElem.querySelector('.comments-loader');
const cancelButtonElement = bigPhotoElem.querySelector('.big-picture__cancel');
const commentElement = document.querySelector('#comment').content.querySelector('.social__comment');

let commentsShown = 0;
let comments = [];

const createComment = ({ avatar, message }) => {
  const comment = commentElement.cloneNode(true);
  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const renderComments = () => {
  commentsShown += COMMENTS_PER_PORTION;

  if (commentsShown >= comments.length) {
    commentsLoaderElement.classList.add('hidden');
    commentsShown = comments.length;
  } else {
    commentsLoaderElement.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShown; i++) {
    const comment = createComment(comments[i]);
    fragment.append(comment);
  }

  commentListElement.innerHTML = '';
  commentListElement.append(fragment);
  commentShownCountElement.textContent = commentsShown;
  commentTotalCountElement.textContent = comments.length;
};

const hideBigPicture = () => {
  bigPhotoElem.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsShown = 0;
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideBigPicture();
  }
}

const clickOnCancelButton = () => {
  hideBigPicture();
};

const clickOnCommentsLoader = () => renderComments();

const renderPictureDetails = ({ url, likes, description }) => {
  bigPhotoElem.querySelector('.big-picture__img img').src = url;
  bigPhotoElem.querySelector('.likes-count').textContent = likes;
  bigPhotoElem.querySelector('.social__caption').textContent = description;
};

const showBigPicture = (data) => {
  bigPhotoElem.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  commentsLoaderElement.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeydown);

  renderPictureDetails(data);
  comments = data.comments;
  if (comments.length > 0) {
    renderComments();
  }
};

cancelButtonElement.addEventListener('click', clickOnCancelButton);
commentsLoaderElement.addEventListener('click', clickOnCommentsLoader);

export { showBigPicture };
