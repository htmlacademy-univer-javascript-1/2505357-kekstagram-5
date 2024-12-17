import { openForm } from './form.js';
import { checkFormSubmit, closeForm } from './form.js';
import { getData } from './api.js';
import { initImageScale } from './scale.js';

openForm(initImageScale());
getData();
checkFormSubmit(closeForm);
