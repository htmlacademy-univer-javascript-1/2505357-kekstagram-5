import { showThumbnails} from './thumbnail.js';
import { showGallery } from './gallery.js';
import { showDataError } from './errors-and-success.js';


const URL_DATA_GET = 'https://29.javascript.htmlacademy.pro/kekstagram/data';
const URL_DATA_SEND = 'https://29.javascript.htmlacademy.pro/kekstagram/';
const SEND_METHOD = 'POST';


const getData = () => {
  fetch(URL_DATA_GET)
    .then((response) => response.json())
    .then((previews) => {
      showThumbnails(previews);
      showGallery(previews);
    })
    .catch(() => {
      showDataError();
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
  })
  .catch(() => {
    throw new Error();
  });

export { getData, sendData };