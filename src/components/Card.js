export default class Card {
  constructor(
    cardData,
    templateSelector,
    myUserId,
    {handleCardClick, handleSetLikeClick, handleDeleteCardClick}
  ) {
    this._data = cardData;
    this._name = cardData.name;
    this._link = cardData.link;
    this._ownerId = cardData.owner._id; //id владельца карточки
    this._cardId = cardData._id;
    this._likesArr = cardData.likes;
    this._myUserId = myUserId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCardClick = handleDeleteCardClick;
    this._handleSetLikeClick = handleSetLikeClick;
    this._element = this._getTemplate();
    this._cardElementTitle = this._element.querySelector(".item__title");
    this._cardElementImage = this._element.querySelector(".item__image");
    this._buttonElementLike = this._element.querySelector(".item__like-button");
    this._likeCounter = this._element.querySelector(".item__like-count");
    this._buttonElementDelete = this._element.querySelector(".item__delete");
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector) //Получаем и клонируем разметку  по выбранному селектору
      .content.querySelector(".item")
      .cloneNode(true);
  }

  generateCard() {
    this._cardElementImage.src = this._link;
    this._cardElementTitle.textContent = this._name;
    this._cardElementImage.alt = this._name;
    this._likeCounter.textContent = this._likesArr.length; //Записать счетчик лайков
    this._checkMyLike(); // Проверить на мой лайк
    if (this._ownerId !== this._myUserId) { //Удалить мусорку у другого пользователя
      this._buttonElementDelete.remove();
    }
    this._setEventListeners();
    return this._element;
  }

  hasLiked() { //есть мой лайк?
    return this._likesArr.some((like) => like._id === this._myUserId);
  }

  likeCounter(likes) {  //Получить новый массив лайков
    this._likesArr = likes;
    this._checkMyLike();
    this._likeCounter.textContent = this._likesArr.length; //Записать
  }

  _checkMyLike() { //Проверить на мой лайк и закрасить если есть
    if (this.hasLiked()) {
      this._buttonElementLike.classList.add("item__like-button_active");
    } else {
      this._buttonElementLike.classList.remove("item__like-button_active");
    }
  }

  _setEventListeners() {
    this._buttonElementLike.addEventListener("click", () => {
      this._handleSetLikeClick(this._data);
    });
    this._buttonElementLike.addEventListener('mouseover', () => {
        this._buttonElementLike.classList.add('item__like-button_hover');
      }
    )
    this._buttonElementLike.addEventListener('mouseout', () => {
        this._buttonElementLike.classList.remove('item__like-button_hover');
      }
    )
    this._buttonElementDelete.addEventListener("click", () => {
      this._handleDeleteCardClick(this._element, this._cardId);
    });

    this._cardElementImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}
