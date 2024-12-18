import { showThumbnails } from './thumbnail.js';
import { debounce } from './util.js';

const RANDOM_PHOTOS_COUNT = 10;
const DEBOUNCE_DELAY = 500;

const filtersContainerElement = document.querySelector('.img-filters');
const filterButtonsElement = filtersContainerElement.querySelectorAll('.img-filters__button');

const changeFilter = (filter) => {
  filterButtonsElement.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });
  filter.classList.add('img-filters__button--active');
  return filter.id;
};

const sortArrayByComments = (a, b) => b.comments.length - a.comments.length;

const sortPhotos = (previews, onPhotoClick) => {
  const sortPhotosWithDebounce = debounce((filterType) => {
    let sortingPhotos = previews;
    switch (filterType) {
      case 'filter-random':
        sortingPhotos = previews.slice(0, RANDOM_PHOTOS_COUNT);
        break;
      case 'filter-discussed':
        sortingPhotos = previews.slice().sort(sortArrayByComments);
        break;
      default:
        sortingPhotos = previews;
        break;
    }
    showThumbnails(sortingPhotos, onPhotoClick);
  }, DEBOUNCE_DELAY);

  filterButtonsElement.forEach((button) => {
    button.addEventListener('click', () => {
      const filterType = changeFilter(button);
      sortPhotosWithDebounce(filterType);
    });
  });
};

export { sortPhotos };
