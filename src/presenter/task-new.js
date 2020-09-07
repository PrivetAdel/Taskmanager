import TaskEditView from '../view/task-edit';
import {render, remove} from '../utils/render';
import {UserAction, UpdateType} from '../const';
import {generateId} from '../utils/task';

export default class TaskNew {
  constructor(boardTasksComponent, changeData) {
    this._boardTasksComponent = boardTasksComponent;
    this._changeData = changeData;

    this._taskEditComponent = null;
    this._destroyCallback = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escDownHandler = this._escDownHandler.bind(this);
  }

  init(callback) {
    this._destroyCallback = callback;

    if (this._taskEditComponent !== null) {
      return;
    }

    this._taskEditComponent = new TaskEditView();
    this._taskEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._taskEditComponent.setDeleteClickHandler(this._handleDeleteClick);

    render(this._boardTasksComponent, this._taskEditComponent, `afterbegin`);

    document.addEventListener(`keydown`, this._escDownHandler);
  }

  destroy() {
    if (this._taskEditComponent === null) {
      return;
    }

    if (this._destroyCallback !== null) {
      this._destroyCallback();
    }

    remove(this._taskEditComponent);
    this._taskEditComponent = null;

    document.removeEventListener(`keydown`, this._escDownHandler);
  }

  _handleFormSubmit(task) {
    this._changeData(
        UserAction.ADD_TASK,
        UpdateType.MINOR,
        Object.assign({id: generateId()}, task)
    );
    this.destroy();
  }

  _handleDeleteClick() {
    this.destroy();
  }

  _escDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this.destroy();
    }
  }
}
