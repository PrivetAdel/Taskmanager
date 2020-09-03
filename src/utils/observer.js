export default class Observer {
  constructor() {
    this._observer = [];
  }

  addObserver(observer) {
    this._observer.push(observer);
  }

  removeObserver(observer) {
    this._observer = this._observer.filter((existedObserver) => existedObserver !== observer);
  }

  _notify(event, payload) {
    this._observer.forEach((observer) => observer(event, payload));
  }
}
