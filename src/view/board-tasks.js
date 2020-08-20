import AbstractView from './abstract';

export default class BoardTasks extends AbstractView {
  _createBoardTasksTemplate() {
    return (
      `<div class="board__tasks"></div>`
    );
  }

  getTemplate() {
    return this._createBoardTasksTemplate();
  }
}
