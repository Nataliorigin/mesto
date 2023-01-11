import {initialCard, Card} from "./Card.js";
import {FormValidator} from "./FormValidator.js";

const popups = document.querySelectorAll('.popup');
const escapeButton = 'Escape';
//Переменные для изменения данных профиля
const popupElementEditProfile = document.querySelector('.popup_content_edit-profile');
const buttonOpenPopupElementEditProfile = document.querySelector('.profile__edit-button');
const profileNameElement = document.querySelector('.profile__title');
const profileActivityElement = document.querySelector('.profile__subtitle');
//Переменнные для добавления элемента
const templateSelector = '#item-template';
const popupElementAddCard = document.querySelector('.popup_content_add-item');
const buttonOpenPopupElementAddItem = document.querySelector('.profile__add-button');
const elementsContainer = document.querySelector('.elements__container');
//Переменнные для попапа открытия изображения
const popupElementOpenImage = document.querySelector('.popup_content_open-image');
const popupElementImage = document.querySelector('.popup__img');
const popupElementImgCaption = document.querySelector('.popup__img-caption');
//Переменные форм
const formElementEditProfile = document.forms[name = "profile-edit"];
const usernameInput = formElementEditProfile.elements.username;
const userActivityInput = formElementEditProfile.elements.activity;
const formElementAddCard = document.forms[name = "add-card"];
const titleInput = formElementAddCard.elements.title;
const linkInput = formElementAddCard.elements.link;
//Переменные для валидации
const configValidation = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button-save',
  inactiveButtonClass: 'form__button-save_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};
const addCardFormValidator = new FormValidator(configValidation, formElementAddCard);
const editProfileFormValidator = new FormValidator(configValidation, formElementEditProfile)

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupWithEsc);
}
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupWithEsc);
}
const getDataElementEditProfile = () => {
  usernameInput.value = profileNameElement.textContent;
  userActivityInput.value = profileActivityElement.textContent;
}
const handleProfileFormSubmit = (e) => { //Отправить форму профиля
  e.preventDefault();
  profileNameElement.textContent = usernameInput.value;
  profileActivityElement.textContent = userActivityInput.value;
  closePopup(popupElementEditProfile);
}
const handleCardClick = (name, link) => { //Открыть попап карточки и заполнить
  popupElementImgCaption.textContent = name;
  popupElementImage.src = link;
  openPopup(popupElementOpenImage);
}
const createCard = (item, wrap) => { //Создать и добавить карточку
  const card = new Card(item, templateSelector, handleCardClick)
  const cardElement = card.generateCard();
  wrap.prepend(cardElement);
}
const handleAddCardFormSubmit = (e) => { //Отправить форму "добавить карточку"
  e.preventDefault();
  createCard({
    name: titleInput.value,
    link: linkInput.value,
  }, elementsContainer);
  closePopup(popupElementAddCard);
  e.target.reset();
}
const closePopupWithEsc = (evt) => { //Закрыть попап по кнопке "esc"
  if (evt.key === escapeButton) {
    const openModal = document.querySelector('.popup_opened');
    closePopup(openModal);
  }
}
initialCard.forEach((data) => { //Отобразить дефолтные карточки
  createCard(data, elementsContainer);
})
addCardFormValidator.enableValidation(); //Включить валидацию для формы редактирования профиля
editProfileFormValidator.enableValidation(); //Включить валидацию для формы "добавить карточку"

buttonOpenPopupElementEditProfile.addEventListener('click', () => {
  getDataElementEditProfile();
  openPopup(popupElementEditProfile);
});
buttonOpenPopupElementAddItem.addEventListener('click', () => {
  openPopup(popupElementAddCard);
});
formElementEditProfile.addEventListener('submit', handleProfileFormSubmit);
formElementAddCard.addEventListener('submit', handleAddCardFormSubmit);
//Слушатель на закрытие попапов по клику на оверлей и крестик
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__button-close')) {
      closePopup(popup);
    }
  })
})

