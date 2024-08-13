import { renderPhotos } from './photos.js';
import { showAlert, debounce } from './util.js';
import { setUserFormSubmit, hideFormModal } from './form.js';
import { getData, sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './message.js';
import { initial as initFilter, getFilteredPictures } from './filter.js';

setUserFormSubmit(async (data) => {
  try {
    await sendData(data);
    hideFormModal();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});

try {
  const data = await getData();
  const debounceRenderGallery = debounce(renderPhotos);
  initFilter(data, debounceRenderGallery);
  renderPhotos(getFilteredPictures());
} catch {
  showAlert();
}
