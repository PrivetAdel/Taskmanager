import {createElement} from '../utils';

export default class Board {
  constructor() {
    this._element = null;
  }

  _createBoardContainerTemplate() {
    return (
      `<section class="board container"></section>`
    );
  }

  getTemplate() {
    return this._createBoardContainerTemplate();
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
