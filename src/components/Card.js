export default class Card {
  constructor(cardData, templateSelector, handleCardClick) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    return document.querySelector(this._templateSelector) //Получаем разметку  по выбранному селектору
      .content.querySelector('.item')
      .cloneNode(true);
  }

  generateCard() {
    this._element = this._getTemplate();
    const cardElementTitle = this._element.querySelector('.item__title');
    const cardElementImage = this._element.querySelector('.item__image');
    const buttonElementLike = this._element.querySelector('.item__like');
    const buttonElementDelete = this._element.querySelector('.item__delete');
    cardElementImage.src = this._link;
    cardElementTitle.textContent = this._name;
    cardElementImage.alt = this._name;
    this._setEventListeners(cardElementImage, buttonElementLike, buttonElementDelete);
    return this._element;
  }

  _handleLikeButtonClick(buttonElementLike) {
    buttonElementLike.classList.toggle('item__like_active');
  }

  _handleDeleteButtonClick() {
    this._element.remove();
  }

  _setEventListeners(cardElementImage, buttonElementLike, buttonElementDelete) {
    buttonElementLike.addEventListener('click', () => {
      this._handleLikeButtonClick(buttonElementLike);
    });
    buttonElementDelete.addEventListener('click', () => this._handleDeleteButtonClick());
    cardElementImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
  }
}
