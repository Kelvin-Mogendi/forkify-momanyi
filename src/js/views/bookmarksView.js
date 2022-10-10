import Views from './views';
import icons from 'url:../../img/icons.svg';
import previewView from './previewView';
class BookmarksView extends Views {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = `There was no recipe in the bookmarks section. Please find a nice recipe and bookmark it`;
  _successMessage = `success`;
  //*METHODS

  _addHanderlerRender(handler) {
    window.addEventListener('load', handler);
  }
  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}
export default new BookmarksView();
