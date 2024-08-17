import { renderPhotos } from './photos.js';
import { showAlert, useDebounce } from './util.js';
import { setUserFormSubmit, hideFormModal } from './form.js';
import { getData, sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './message.js';
import { useFilters as initFilter, getFilteredPictures } from './filter.js';

setUserFormSubmit(async(data) => {
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
  const useDebounceRenderGallery = useDebounce(renderPhotos);
  initFilter(data, useDebounceRenderGallery);
  renderPhotos(getFilteredPictures());
} catch {
  showAlert();
}
