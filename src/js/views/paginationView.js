import Views from './views';
import icons from 'url:../../img/icons.svg';
class PaginationView extends Views {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    //prettier-ignore
    const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
    const curPage = this._data.page;
    console.log(numPages);

    //&scenario 1
    //* first page and other pages

    if (curPage === 1 && numPages > 1) {
      //prettier-ignore
      return ` <button  data-goto = "${curPage + 1}" class="btn--inline pagination__btn--next">
      <span> page ${curPage + 1}</span>
      <svg class="search__icon">
      <use href="${icons}#icon-arrow-right"></use>
      </svg>`;
    }
    //&scenario2
    //* last page

    if (curPage === numPages && numPages > 1) {
      //prettier-ignore
      return `<button data-goto = "${curPage - 1}" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span> page ${curPage - 1}</span>`;
    }
    //&scenario3
    //*jut just some other page that is not the last or the first page in the list of the pages
    //prettier-ignore
    if (curPage < numPages) {
      return ` <button data-goto = "${curPage - 1}"  class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span> page ${curPage - 1}</span>
    </button>
     <button  data-goto = "${curPage + 1}" class="btn--inline pagination__btn--next">
          <span> page ${curPage + 1}</span>
          <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
          </svg>`;
    }
    //scenarion 4
    return '';
  }

  _addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
      //   const  = e.target;
      console.log(btn);
    });
  }
}

export default new PaginationView();
