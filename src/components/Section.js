export default class Section {
  constructor({initialCards, renderer}, selector) {
  this._initialCards = initialCards;
  this._renderer = renderer;
  this._container = document.querySelector(selector);
  }

  renderItems() { //публичный метод, который отвечает за отрисовку всех элементов
    this._initialCards.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(cardElement) {   //публичный метод addItem, который принимает DOM-элемент и добавляет его в контейнер.
    this._container.prepend(cardElement);
  }
}