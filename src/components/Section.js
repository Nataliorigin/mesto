export default class Section {
  constructor({ renderer }, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderItems(initialCards) {
    //публичный метод, который отвечает за отрисовку всех элементов
    initialCards.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(cardElement) {
    //публичный метод addItem, который принимает DOM-элемент и добавляет его в контейнер.
    this._container.prepend(cardElement);
  }
}
