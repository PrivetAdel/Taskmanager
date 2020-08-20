import SiteMenuView from './view/site-menu';
import FiltersView from './view/filters';
import BoardPresenter from './presenter/board';
import {generateTask} from './mock/task';
import {generateFilter} from './mock/filter';
import {render} from './utils/render';

const TASKS_COUNT = 22;

const tasks = new Array(TASKS_COUNT).fill().map(generateTask);
const filters = generateFilter(tasks);

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const boardPresenter = new BoardPresenter(siteMainElement);

render(siteHeaderElement, new SiteMenuView());
render(siteMainElement, new FiltersView(filters));

boardPresenter.init(tasks);
