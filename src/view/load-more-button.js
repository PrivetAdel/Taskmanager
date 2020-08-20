import AbstractView from './abstract';

export default class LoadMoreButton extends AbstractView {
  constructor() {
    super();
    this._clickHandler = this._clickHandler.bind(this);
  }

  _createLoadMoreButtonTemplate() {
    return (
      `<button class="load-more" type="button">load more</button>`
    );
  }

  getTemplate() {
    return this._createLoadMoreButtonTemplate();
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener(`click`, this._clickHandler);
  }
}
