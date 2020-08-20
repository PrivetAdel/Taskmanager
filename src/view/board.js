import AbstractView from './abstract';

export default class Board extends AbstractView {
  _createBoardContainerTemplate() {
    return (
      `<section class="board container"></section>`
    );
  }

  getTemplate() {
    return this._createBoardContainerTemplate();
  }
}
