import {createSiteMenuTemplate} from './view/site-menu';
import {createFiltersTemplate} from './view/filters';
import {createBoardContainerTemplate} from './view/board';
import {createSortTemplate} from './view/sort';
import {createBoardTasksTemplate} from './view/board-tasks';
import {createTaskEditTemplate} from './view/task-edit';
import {createTaskTemplate} from './view/task';
import {createLoadMoreButtonTemplate} from './view/load-more-button';
import {generateTask} from './mock/task';
import {generateFilter} from './mock/filter';

const TASKS_COUNT = 22;
const TASK_COUNT_PER_STEP = 8;
const tasks = new Array(TASKS_COUNT).fill().map(generateTask);
const filters = generateFilter(tasks);

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
render(siteHeaderElement, createSiteMenuTemplate());
render(siteMainElement, createFiltersTemplate(filters));
render(siteMainElement, createBoardContainerTemplate());

const borderContainerElement = siteMainElement.querySelector(`.board`);
render(borderContainerElement, createSortTemplate());
render(borderContainerElement, createBoardTasksTemplate());

const boardTasks = siteMainElement.querySelector(`.board__tasks`);
render(boardTasks, createTaskEditTemplate(tasks[0]));

for (let i = 1; i < Math.min(tasks.length, TASK_COUNT_PER_STEP); i++) {
  render(boardTasks, createTaskTemplate(tasks[i]));
}

if (tasks.length > TASK_COUNT_PER_STEP) {
  let renderTaskCount = TASK_COUNT_PER_STEP;

  render(borderContainerElement, createLoadMoreButtonTemplate());

  const loadMoreButton = borderContainerElement.querySelector(`.load-more`);

  loadMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    tasks
      .slice(renderTaskCount, renderTaskCount + TASK_COUNT_PER_STEP)
      .forEach((task) => render(boardTasks, createTaskTemplate(task)));

    renderTaskCount += TASK_COUNT_PER_STEP;

    if (renderTaskCount >= tasks.length) {
      loadMoreButton.remove();
    }
  });
}
