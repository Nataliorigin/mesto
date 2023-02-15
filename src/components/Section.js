export default class Section {
  constructor({renderer}, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderItems(initialCards) { //отрисовать все карточки циклом
    initialCards.forEach((card) => {
      this._renderer(card);
    });
  }

  addItemsFromServer(initialCard) {
    this._container.append(initialCard);
  }

  addItem(newCardElement) { //Добавить карточку в контейнер
    this._container.prepend(newCardElement);
  }
}
