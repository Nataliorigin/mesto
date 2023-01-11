export const initialCard = [
  {
    name: 'Абхазия',
    link: './img/abhazia.jpg',
  },
  {
    name: 'Дагестан',
    link: './img/dagestan.jpg',
  },
  {
    name: 'Эверест',
    link: './img/everest.jpg',
  },
  {
    name: 'Владивосток',
    link: './img/vladivostok.jpg',
  },
  {
    name: 'Камчатка',
    link: './img/kamchatka.jpg',
  },
  {
    name: 'Сулакский каньон',
    link: './img/sulak_canyon.jpg',
  }
];

export class Card {
  constructor(obj, templateSelector, handleCardClick) {
    this._name = obj.name;
    this._link = obj.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector) //Получаем разметку  по выбранному селектору
      .content.querySelector('.item')
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    const cardElementTitle = this._element.querySelector('.item__title');
    const cardElementImage = this._element.querySelector('.item__image');
    const buttonElementLike = this._element.querySelector('.item__like');
    const buttonElementDelete = this._element.querySelector('.item__delete');
    cardElementTitle.textContent = this._name;
    cardElementImage.src = this._link;
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