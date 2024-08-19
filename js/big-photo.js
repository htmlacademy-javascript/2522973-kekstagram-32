const COMMENTS_PER_PORTION = 5;
const bodyElement = document.querySelector('body');
const bigPhotoElement = document.querySelector('.big-picture');
const commentShownCountElement = bigPhotoElement.querySelector('.social__comment-shown-count');
const commentTotalCountElement = bigPhotoElement.querySelector('.social__comment-total-count');
const commentListElement = bigPhotoElement.querySelector('.social__comments');
const commentsLoaderElement = bigPhotoElement.querySelector('.comments-loader');
const cancelButtonElement = bigPhotoElement.querySelector('.big-picture__cancel');
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
  bigPhotoElement.classList.add('hidden');
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

const onCancelButtonClick = () => {
  hideBigPicture();
};

const onLoadCommentsClick = () => renderComments();

const renderPictureDetails = ({ url, likes, description }) => {
  bigPhotoElement.querySelector('.big-picture__img img').src = url;
  bigPhotoElement.querySelector('.likes-count').textContent = likes;
  bigPhotoElement.querySelector('.social__caption').textContent = description;
};

const showBigPicture = (data) => {
  bigPhotoElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  commentsLoaderElement.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  renderPictureDetails(data);
  comments = data.comments;
  if (comments.length > 0) {
    renderComments();
  }
};

cancelButtonElement.addEventListener('click', onCancelButtonClick);
commentsLoaderElement.addEventListener('click', onLoadCommentsClick);

export { showBigPicture };
