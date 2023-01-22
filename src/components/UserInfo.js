export default class UserInfo {
  constructor({usernameSelector, activitySelector}) {
    this._usernameTitle = document.querySelector(usernameSelector);
    this._activitySubtitle = document.querySelector(activitySelector);
  }

  getUserInfo() {
    const userInfo = {};
    userInfo.username = this._usernameTitle.textContent;
    userInfo.activity = this._activitySubtitle.textContent;
    return userInfo;
  }

  setUserInfo(username, activity) {
    this._usernameTitle.textContent = username;
    this._activitySubtitle.textContent = activity;
  }
}
