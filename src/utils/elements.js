export const buttonOpenPopupElementEditProfile = document.querySelector(
  ".profile__edit-button"
);
export const buttonOpenPopupElementAddItem = document.querySelector(
  ".profile__add-button"
);
export const buttonOpenPopupElementEditAvatar = document.querySelector(
  ".profile__avatar-container"
);
//Переменные форм
export const formElementEditProfile = document.forms[(name = "profile-edit")];
export const usernameInput = formElementEditProfile.elements.name;
export const userActivityInput = formElementEditProfile.elements.about;
export const formElementAddCard = document.forms[(name = "add-card")];
export const formElementAvatarProfile = document.forms[(name = "edit-avatar")];
