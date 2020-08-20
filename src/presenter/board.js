import BoardView from '../view/board';
import SortView from '../view/sort';
import BoardTasksView from '../view/board-tasks';
import NoTaskView from '../view/no-task';
import TaskEditView from '../view/task-edit';
import TaskView from '../view/task';
import LoadMoreButtonView from '../view/load-more-button';
import {render, replace, remove} from '../utils/render';
import {sortTaskUp, sortTaskDown} from '../utils/task';
import {SortType} from '../const';

const TASK_COUNT_PER_STEP = 8;

export default class Board {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;
    this._renderedTaskCount = TASK_COUNT_PER_STEP;
    this._currentSortType = SortType.DEFAULT;

    this._boardComponent = new BoardView();
    this._sortComponent = new SortView();
    this._boardTasksComponent = new BoardTasksView();
    this._noTaskComponent = new NoTaskView();
    this._loadMoreButtonComponent = new LoadMoreButtonView();

    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(boardTasks) {
    this._boardTasks = boardTasks.slice();
    this._sourcedBoardTasks = boardTasks.slice();
    render(this._boardContainer, this._boardComponent);
    render(this._boardComponent, this._boardTasksComponent);

    this._renderBoard();
  }

  _sortTasks(sortType) {
    switch (sortType) {
      case SortType.DATE_UP:
        this._boardTasks.sort(sortTaskUp);
        break;
      case SortType.DATE_DOWN:
        this._boardTasks.sort(sortTaskDown);
        break;
      default:
        this._boardTasks = this._sourcedBoardTasks.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortTasks(sortType);
    this._clearTasksBoard();
    this._renderTasksBoard();
  }

  _renderSort() {
    render(this._boardComponent, this._sortComponent, `afterbegin`);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderTask(task) {
    const taskComponent = new TaskView(task);
    const taskEditComponent = new TaskEditView(task);

    const replaceCardToForm = () => {
      replace(taskEditComponent, taskComponent);
    };

    const replaceFormToCard = () => {
      replace(taskComponent, taskEditComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    taskComponent.setEditClickHandler(() => {
      replaceCardToForm();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    taskEditComponent.setFormSubmitHandler(() => {
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    render(this._boardTasksComponent, taskComponent);
  }

  _renderTasks(from, to) {
    this._boardTasks
      .slice(from, to)
      .forEach((boardTask) => this._renderTask(boardTask));
  }

  _renderNoTasks() {
    render(this._boardComponent, this._noTaskComponent, `afterbegin`);
  }

  _handleLoadMoreButtonClick() {
    this._renderTasks(this._renderedTaskCount, this._renderedTaskCount + TASK_COUNT_PER_STEP);

    this._renderedTaskCount += TASK_COUNT_PER_STEP;

    if (this._renderedTaskCount >= this._boardTasks.length) {
      remove(this._loadMoreButtonComponent);
    }
  }

  _renderLoadMoreButton() {
    render(this._boardComponent, this._loadMoreButtonComponent);

    this._loadMoreButtonComponent.setClickHandler(this._handleLoadMoreButtonClick);
  }

  _clearTasksBoard() {
    this._boardTasksComponent.getElement().innerHTML = ``;
    this._renderedTaskCount = TASK_COUNT_PER_STEP;
  }

  _renderTasksBoard() {
    this._renderTasks(0, Math.min(this._boardTasks.length, TASK_COUNT_PER_STEP));

    if (this._boardTasks.length > TASK_COUNT_PER_STEP) {
      this._renderLoadMoreButton();
    }
  }

  _renderBoard() {
    if (this._boardTasks.every((task) => task.isArchive)) {
      this._renderNoTasks();
      return;
    }

    this._renderSort();
    this._renderTasksBoard();
  }
}
