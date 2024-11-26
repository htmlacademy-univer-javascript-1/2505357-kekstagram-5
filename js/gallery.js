import { showThumbnails } from './thumbnail.js';
import { showBigPicture } from './big-picture.js';

const container = document.querySelector('.pictures');

const showGallery = (pictures) => {
  container.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-thumbnail-id]');
    if (thumbnail) {
      evt.preventDefault();
      const pictureId = +thumbnail.dataset.thumbnailId;
      const picture = pictures.find((item) => item.id === pictureId);
      showBigPicture(picture);
    }
  });
  showThumbnails(pictures, container);
};

export { showGallery };
