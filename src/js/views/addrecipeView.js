import icons from 'url:../../img/icons.svg';
// import { Fraction } from 'fractional';
import Views from './views.js';
// console.log(Fraction);
class AddRecipeView extends Views {
  _parentElement = document.querySelector('.upload');
  _successMessage =
    'Recipe was succesfully added, find it in the bookmark section';

  btnOpenModal = document.querySelector('.nav__btn--add-recipe');
  _closeModal = document.querySelector('.btn--close-modal');
  _overlay = document.querySelector('.overlay');
  _window = document.querySelector('.add-recipe-window');

  constructor() {
    super();
    this._addHandlerCloseModal();
    this._addHandlerShowModal();
  }
  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }
  _addHandlerShowModal() {
    this.btnOpenModal.addEventListener('click', this.toggleWindow.bind(this));
  }
  _addHandlerCloseModal() {
    this._closeModal.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }
  _addHandlerFormData(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  _generateMarkup() {}
}
export default new AddRecipeView();
