import {Card} from "./Card.js";
import {FormValidator} from "./FormValidator.js";
import {initialCard, configValidation} from "./Сonstants.js";
import {popups,escapeButton,popupElementEditProfile,buttonOpenPopupElementEditProfile,profileNameElement,
  profileActivityElement,templateSelector,popupElementAddCard,buttonOpenPopupElementAddItem,elementsContainer,
  popupElementOpenImage,popupElementImage,popupElementImgCaption,formElementEditProfile,
  usernameInput,userActivityInput,formElementAddCard,titleInput,linkInput} from "./Elements.js";
//Переменные для валидации
const editProfileFormValidator = new FormValidator(configValidation, formElementEditProfile)
const addCardFormValidator = new FormValidator(configValidation, formElementAddCard);

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
const createCard = (item) => { //Создать и добавить карточку
  const card = new Card(item, templateSelector, handleCardClick)
  const cardElement = card.generateCard();
  return cardElement;
}
const addCard = (cardElement, wrap) => {
  wrap.prepend(cardElement);
}
const handleAddCardFormSubmit = (e) => { //Отправить форму "добавить карточку"
  e.preventDefault();
 addCard(createCard({
    name: titleInput.value,
    link: linkInput.value,
  }), elementsContainer);

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
  addCard(createCard(data), elementsContainer);
})
addCardFormValidator.enableValidation(); //Включить валидацию для формы редактирования профиля
editProfileFormValidator.enableValidation(); //Включить валидацию для формы "добавить карточку"

buttonOpenPopupElementEditProfile.addEventListener('click', () => {
  getDataElementEditProfile();
  openPopup(popupElementEditProfile);
  editProfileFormValidator.resetValidation();
});
buttonOpenPopupElementAddItem.addEventListener('click', () => {
  openPopup(popupElementAddCard);
  formElementAddCard.reset();
  addCardFormValidator.resetValidation();
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

