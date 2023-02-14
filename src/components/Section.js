export default class Section {
  constructor({renderer}, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderItems(initialCards) { //отрисовать все карточки циклом
    initialCards.reverse().forEach((card) => {
      this._renderer(card);
    });
  }

  addItem(cardElement) { //Добавить карточку в контейнер
    this._container.prepend(cardElement);
  }
}
