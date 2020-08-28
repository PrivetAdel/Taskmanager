import SiteMenuView from './view/site-menu';
import BoardPresenter from './presenter/board';
import FilterPresenter from './presenter/filter';
import TasksModel from './model/tasks';
import FilterModel from './model/filter';
import {generateTask} from './mock/task';
import {render} from './utils/render';

const TASKS_COUNT = 22;

const tasks = new Array(TASKS_COUNT).fill().map(generateTask);

const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);

const filterModel = new FilterModel();

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, new SiteMenuView());

const boardPresenter = new BoardPresenter(siteMainElement, tasksModel, filterModel);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, tasksModel);

filterPresenter.init();
boardPresenter.init();

document.querySelector(`#control__new-task`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  boardPresenter.createTask();
});
