import SiteMenuView from './view/site-menu';
import FiltersView from './view/filters';
import BoardView from './view/board';
import SortView from './view/sort';
import BoardTasksView from './view/board-tasks';
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

  taskComponent.getElement().querySelector(`.card__btn--edit`).addEventListener(`click`, () => {
    replaceCardToForm();
  });

  taskEditComponent.getElement().querySelector(`form`).addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToCard();
  });

  render(boardTasksComponent, taskComponent.getElement());
};

render(siteHeaderElement, new SiteMenuView().getElement());
render(siteMainElement, new FiltersView(filters).getElement());
const boardComponent = new BoardView();
render(siteMainElement, boardComponent.getElement());

render(boardComponent.getElement(), new SortView().getElement());

const boardTasksComponent = new BoardTasksView();
render(boardComponent.getElement(), boardTasksComponent.getElement());

for (let i = 0; i < Math.min(tasks.length, TASK_COUNT_PER_STEP); i++) {
  renderTask(boardTasksComponent.getElement(), tasks[i]);
}

if (tasks.length > TASK_COUNT_PER_STEP) {
  let renderTaskCount = TASK_COUNT_PER_STEP;

  const loadMoreButtonComponent = new LoadMoreButtonView();

  render(boardComponent.getElement(), loadMoreButtonComponent.getElement());

  loadMoreButtonComponent.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();
    tasks
      .slice(renderTaskCount, renderTaskCount + TASK_COUNT_PER_STEP)
      .forEach((task) => renderTask(boardTasksComponent.getElement(), task));

    renderTaskCount += TASK_COUNT_PER_STEP;

    if (renderTaskCount >= tasks.length) {
      loadMoreButtonComponent.getElement().remove();
      loadMoreButtonComponent.removeElement();
    }
  });
}
