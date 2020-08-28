import FilterView from '../view/filters';
import {render, replace, remove} from '../utils/render';
import {filter} from '../utils/filter';
import {FilterType, UpdateType} from '../const';

export default class Filter {
  constructor(filterContainer, filterModel, tasksModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._tasksModel = tasksModel;
    this._currentFilter = null;

    this._filterComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._tasksModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._currentFilter = this._filterModel.getFilter();

    const filters = this._getFilters();
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new FilterView(filters, this._currentFilter);
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if (this._currentFilter === filterType) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }

  _getFilters() {
    const tasks = this._tasksModel.getTasks();

    return [
      {
        type: FilterType.ALL,
        name: `All`,
        count: filter[FilterType.ALL](tasks).length
      },
      {
        type: FilterType.OVERDUE,
        name: `Overdue`,
        count: filter[FilterType.OVERDUE](tasks).length
      },
      {
        type: FilterType.TODAY,
        name: `Today`,
        count: filter[FilterType.TODAY](tasks).length
      },
      {
        type: FilterType.FAVORITES,
        name: `Favorites`,
        count: filter[FilterType.FAVORITES](tasks).length
      },
      {
        type: FilterType.REPEATING,
        name: `Repeating`,
        count: filter[FilterType.REPEATING](tasks).length
      },
      {
        type: FilterType.ARCHIVE,
        name: `Archive`,
        count: filter[FilterType.ARCHIVE](tasks).length
      }
    ];
  }
}
