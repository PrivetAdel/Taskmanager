import {createElement} from '../utils';

export default class LoadMoreButton {
  constructor() {
    this._element = null;
  }

  _createLoadMoreButtonTemplate() {
    return (
      `<button class="load-more" type="button">load more</button>`
    );
  }

  getTemplate() {
    return this._createLoadMoreButtonTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
