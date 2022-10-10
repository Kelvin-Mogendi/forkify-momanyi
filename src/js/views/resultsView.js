import Views from './views';
import icons from 'url:../../img/icons.svg';
import previewView from './previewView';
class ResultsView extends Views {
  _parentElement = document.querySelector('.results');
  _errorMessage = `There was no result for your search💔💔`;
  _successMessage = `success`;
  //*METHODS

  _generateMarkup() {
    return this._data
      .map(results => previewView.render(results, false))
      .join('');
  }
}

export default new ResultsView();
