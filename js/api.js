import { showThumbnails} from './thumbnail.js';
import { showGallery } from './gallery.js';
import { sortPhotos } from './filters-change.js';
import { showAlert } from './util.js';

const URL_DATA_GET = 'https://29.javascript.htmlacademy.pro/kekstagram/data';
const URL_DATA_SEND = 'https://29.javascript.htmlacademy.pro/kekstagram/';
const SEND_METHOD = 'POST';

const imagesFiltersElement = document.querySelector('.img-filters');

const getData = () => {
  fetch(URL_DATA_GET)
    .then((response) => response.json())
    .then((pictures) => {
      showThumbnails(pictures);
      showGallery(pictures);
      sortPhotos(pictures);
      imagesFiltersElement.classList.remove('img-filters--inactive');
    })
    .catch((err) => {
      showAlert(err);
    });
};

const sendData = (body) => fetch(
  URL_DATA_SEND,
  {
    method: SEND_METHOD,
    body,
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  })
  .catch(() => {
    throw new Error();
  });

export { getData, sendData };
