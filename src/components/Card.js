export default class Card {
  constructor(cardData, templateSelector, handleCardClick) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._element = this._getTemplate();
    this._cardElementTitle = this._element.querySelector(".item__title");
    this._cardElementImage = this._element.querySelector(".item__image");
    this._buttonElementLike = this._element.querySelector(".item__like");
    this._buttonElementDelete = this._element.querySelector(".item__delete");
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector) //Получаем разметку  по выбранному селектору
      .content.querySelector(".item")
      .cloneNode(true);
  }

  generateCard() {
    this._cardElementImage.src = this._link;
    this._cardElementTitle.textContent = this._name;
    this._cardElementImage.alt = this._name;
    this._setEventListeners(
      this._cardElementImage,
      this._buttonElementLike,
      this._buttonElementDelete
    );
    return this._element;
  }

  _handleLikeButtonClick(buttonElementLike) {
    buttonElementLike.classList.toggle("item__like_active");
  }

  _handleDeleteButtonClick() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners(cardElementImage, buttonElementLike, buttonElementDelete) {
    buttonElementLike.addEventListener("click", () => {
      this._handleLikeButtonClick(buttonElementLike);
    });
    buttonElementDelete.addEventListener("click", () =>
      this._handleDeleteButtonClick()
    );
    cardElementImage.addEventListener("click", () =>
      this._handleCardClick(this._name, this._link)
    );
  }
}
