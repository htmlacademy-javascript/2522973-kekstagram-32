import { generateThumbnails } from './thumbnail';
import { showBigPicture } from './big-photo.js';

const container = document.querySelector('.pictures');

const renderPhotos = (pictures) => {
  container.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-thumbnail-id]');
    if (!thumbnail) {
      return;
    }

    evt.preventDefault();
    const picture = pictures.find(
      (item) => item.id === +thumbnail.dataset.thumbnailId
    );
    showBigPicture(picture);
  });

  generateThumbnails(pictures, container);
};

export { renderPhotos };
