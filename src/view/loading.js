import AbstractView from './abstract';

export default class Loading extends AbstractView {
  _createNoTaskTemplate() {
    return `<p class="board__no-tasks">
      Loading...
    </p>`;
  }

  getTemplate() {
    return this._createNoTaskTemplate();
  }
}
