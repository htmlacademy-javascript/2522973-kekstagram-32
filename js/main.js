import { renderPhotos } from './photos.js';
import { showAlert } from './util.js';
import {setUserFormSubmit, successHandler} from './form.js';
import {getData} from './api.js';

await getData()
  .then((photos) => {
    renderPhotos(photos);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

await setUserFormSubmit(successHandler);
