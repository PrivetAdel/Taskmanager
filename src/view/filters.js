import {createElement} from '../utils';

const createFilterItemTemplate = (filter, isChecked) => {
  const {name, count} = filter;
  return (
    `<input
      type="radio"
      id="filter__${name}"
      class="filter__input visually-hidden"
      name="filter"
      ${isChecked ? `checked` : ``}
      ${count === 0 ? `disabled` : ``}
    />
    <label for="filter__${name}" class="filter__label">
      ${name} <span class="filter__${name}-count">${count}</span></label
    >`
  );
};

export default class Filters {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  _createFiltersTemplate(filterItems) {
    const filterItemsTemplate = filterItems
      .map((filter, index) => createFilterItemTemplate(filter, index === 0))
      .join(``);

    return (
      `<section class="main__filter filter container">
        ${filterItemsTemplate}
      </section>`
    );
  }

  getTemplate() {
    return this._createFiltersTemplate(this._filters);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
