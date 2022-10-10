class Searchview {
  _btnSearch = document.querySelector('.search');
  getQuery() {
    const data = this._btnSearch.querySelector('.search__field').value;
    this._btnSearch.querySelector('.search__field').value = '';
    // console.log(data);
    return data;
  }
  addHandler(handler) {
    this._btnSearch.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new Searchview();
