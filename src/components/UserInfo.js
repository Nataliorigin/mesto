export default class UserInfo {
  constructor({usernameSelector, activitySelector, avatarSelector}) {
    this._usernameTitle = document.querySelector(usernameSelector);
    this._activitySubtitle = document.querySelector(activitySelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() { //Получить данные пользователя в форму
    return {
      name: this._usernameTitle.textContent,
      about: this._activitySubtitle.textContent,
    };
  }

  setUserInfo(userInfoData) { //Получить данные с сервера, записать в DOM
    this._usernameTitle.textContent = userInfoData.name;
    this._activitySubtitle.textContent = userInfoData.about;
    this._avatar.src = userInfoData.avatar;
  }
}
