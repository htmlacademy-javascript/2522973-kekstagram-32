import { generateThumbnails } from './thumbnail';
import { showBigPicture } from './big-photo.js';

const container = document.querySelector('.pictures');

let pictures = [];

const onClickContainer = (evt) => {
  const thumbnail = evt.target.closest('[data-thumbnail-id]');
  if (!thumbnail) {
    return;
  }

  evt.preventDefault();
  const picture = pictures.find(
    (item) => item.id === +thumbnail.dataset.thumbnailId
  );
  showBigPicture(picture);
};

const renderPhotos = (currentPictures) => {
  pictures = currentPictures;
  generateThumbnails(pictures, container);
  container.addEventListener('click', onClickContainer);
};

export { renderPhotos };
