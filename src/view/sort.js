import AbstractView from './abstract';

export default class Sort extends AbstractView {
  _createSortTemplate() {
    return (
      `<div class="board__filter-list">
        <a href="#" class="board__filter" data-sort-type="default">SORT BY DEFAULT</a>
        <a href="#" class="board__filter" data-sort-type="date-up">SORT BY DATE up</a>
        <a href="#" class="board__filter" data-sort-type="date-down">SORT BY DATE down</a>
      </div>`
    );
  }

  getTemplate() {
    return this._createSortTemplate();
  }
}
