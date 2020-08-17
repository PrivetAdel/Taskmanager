import {createElement} from '../utils';

export default class BoardTasks {
  constructor() {
    this._element = null;
  }

  _createBoardTasksTemplate() {
    return (
      `<div class="board__tasks"></div>`
    );
  }

  getTemplate() {
    return this._createBoardTasksTemplate();
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
