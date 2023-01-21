export const buttonOpenPopupElementEditProfile = document.querySelector(
  ".profile__edit-button"
);
export const buttonOpenPopupElementAddItem = document.querySelector(
  ".profile__add-button"
);
export const cardsContainer = document.querySelector(".cards__container");
//Переменные форм
export const formElementEditProfile = document.forms[(name = "profile-edit")];
export const usernameInput = formElementEditProfile.elements.username;
export const userActivityInput = formElementEditProfile.elements.activity;
export const formElementAddCard = document.forms[(name = "add-card")];
