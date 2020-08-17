import SiteMenuView from './view/site-menu';
import FiltersView from './view/filters';
import BoardView from './view/board';
import SortView from './view/sort';
import BoardTasksView from './view/board-tasks';
import NoTaskView from './view/no-task';
import TaskEditView from './view/task-edit';
import TaskView from './view/task';
import LoadMoreButtonView from './view/load-more-button';
import {generateTask} from './mock/task';
import {generateFilter} from './mock/filter';
import {render} from './utils';

const TASKS_COUNT = 22;
const TASK_COUNT_PER_STEP = 8;
const tasks = new Array(TASKS_COUNT).fill().map(generateTask);
const filters = generateFilter(tasks);

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const renderTask = (boardTasksComponent, task) => {
  const taskComponent = new TaskView(task);
  const taskEditComponent = new TaskEditView(task);

  const replaceCardToForm = () => {
    boardTasksComponent.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  };

  const replaceFormToCard = () => {
    boardTasksComponent.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  taskComponent.getElement().querySelector(`.card__btn--edit`).addEventListener(`click`, () => {
    replaceCardToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  taskEditComponent.getElement().querySelector(`form`).addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToCard();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(boardTasksComponent, taskComponent.getElement());
};

const renderBoard = (boardContainer, boardTasks) => {
  const boardComponent = new BoardView();
  const boardTasksComponent = new BoardTasksView();

  render(boardContainer, boardComponent.getElement());

  render(boardComponent.getElement(), boardTasksComponent.getElement());

  if (boardTasks.every((task) => task.isArchive)) {
    render(boardComponent.getElement(), new NoTaskView().getElement(), `afterbegin`);
    return;
  }

  render(boardComponent.getElement(), new SortView().getElement(), `afterbegin`);

  boardTasks
    .slice(0, Math.min(tasks.length, TASK_COUNT_PER_STEP))
    .forEach((boardTask) => renderTask(boardTasksComponent.getElement(), boardTask));

  if (boardTasks.length > TASK_COUNT_PER_STEP) {
    let renderTaskCount = TASK_COUNT_PER_STEP;

    const loadMoreButtonComponent = new LoadMoreButtonView();

    render(boardComponent.getElement(), loadMoreButtonComponent.getElement());

    loadMoreButtonComponent.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      boardTasks
        .slice(renderTaskCount, renderTaskCount + TASK_COUNT_PER_STEP)
        .forEach((boardTask) => renderTask(boardTasksComponent.getElement(), boardTask));

      renderTaskCount += TASK_COUNT_PER_STEP;

      if (renderTaskCount >= tasks.length) {
        loadMoreButtonComponent.getElement().remove();
        loadMoreButtonComponent.removeElement();
      }
    });
  }
};

render(siteHeaderElement, new SiteMenuView().getElement());
render(siteMainElement, new FiltersView(filters).getElement());
const boardComponent = new BoardView();
render(siteMainElement, boardComponent.getElement());
renderBoard(siteMainElement, tasks);
