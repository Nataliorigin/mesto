export default class UserInfo {
constructor({usernameSelector, activitySelector}) {
this._usernameSelector = usernameSelector;
this._activitySelector = activitySelector;
}

  getUserInfo() {
  const userInfo = {};
      userInfo.username = this._usernameSelector.textContent;
      userInfo.activity = this._activitySelector.textContent;
return userInfo;
  }
  setUserInfo(username, activity) {
    this._usernameSelector.textContent = username;
    this._activitySelector.textContent = activity;
  }
}
