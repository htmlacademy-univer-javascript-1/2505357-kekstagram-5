import { getImages } from './data.js';
import { showGallery } from './gallery.js';
import { openForm } from './form.js';

showGallery(getImages());
openForm();
