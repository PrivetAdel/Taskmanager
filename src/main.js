import {createSiteMenuTemplate} from './view/site-menu';
import {createFiltersTemplate} from './view/filters';
import {createBoardContainerTemplate} from './view/board';
import {createSortTemplate} from './view/sort';
import {createBoardTasksTemplate} from './view/board-tasks';
import {createTaskEditTemplate} from './view/task-edit';
import {createTaskTemplate} from './view/task';
import {createLoadMoreButtonTemplate} from './view/load-more-button';

const TASKS_COUNT = 5;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
render(siteHeaderElement, createSiteMenuTemplate(), `beforeend`);
render(siteMainElement, createFiltersTemplate(), `beforeend`);
render(siteMainElement, createBoardContainerTemplate(), `beforeend`);

const borderContainerElement = siteMainElement.querySelector(`.board`);
render(borderContainerElement, createSortTemplate(), `beforeend`);
render(borderContainerElement, createBoardTasksTemplate(), `beforeend`);

const boardTasks = siteMainElement.querySelector(`.board__tasks`);
render(boardTasks, createTaskEditTemplate(), `beforeend`);

for (let i = 0; i < TASKS_COUNT; i++) {
  render(boardTasks, createTaskTemplate(), `beforeend`);
}

render(boardTasks, createLoadMoreButtonTemplate(), `beforeend`);
