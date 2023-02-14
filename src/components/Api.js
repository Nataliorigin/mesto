export default class Api {
  constructor({url, headers}) {
    this._url = url;
    this._headers = headers;
  }

  _handleCheckResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  getInfoUser = () => { //Получить данные о пользователе
    return fetch(`${this._url}users/me`, {
      headers: this._headers,
    }).then((res) => this._handleCheckResponse(res));
  };

  getCards = () => { //Получить карточки
    return fetch(`${this._url}cards`, {
      headers: this._headers,
    }).then((res) => this._handleCheckResponse(res));
  };

  editProfile = (data) => { //Отправить новые данные пользователя
    return fetch(`${this._url}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => this._handleCheckResponse(res));
  };

  addCard = (data) => { //Отправить новую карточку
    return fetch(`${this._url}cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => this._handleCheckResponse(res));
  };

  deleteCard = (cardId) => { //Удалить карточку
    return fetch(`${this._url}cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._handleCheckResponse(res));
  };

  addLike = (cardId) => { //Добавить свой лайк в массив лайков
    //Постановка лайка
    return fetch(`${this._url}cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => this._handleCheckResponse(res));
  };

  deleteLike = (cardId) => { //Удалить свой лайк из массива лайков
    return fetch(`${this._url}cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._handleCheckResponse(res));
  };

  updateAvatar = (avatar) => { //Отправить новый аватар
    return fetch(`${this._url}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar.avatar,
      }),
    }).then((res) => this._handleCheckResponse(res));
  };
}
