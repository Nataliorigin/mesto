import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import {cardsSelector, configValidation, initialCard, templateSelector,} from "../utils/сonstants.js";
import {
  buttonOpenPopupElementAddItem,
  buttonOpenPopupElementEditProfile,
  cardsContainer,
  formElementAddCard,
  formElementEditProfile,
  userActivityInput,
  usernameInput,
} from "../utils/elements.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

//Валидаторы форм
const formValidatorEditProfile = new FormValidator(
  configValidation,
  formElementEditProfile
);
const formValidatorAddCard = new FormValidator(
  configValidation,
  formElementAddCard
);
formValidatorEditProfile.enableValidation(); //Включить валидацию для формы редактирования профиля
formValidatorAddCard.enableValidation(); //Включить валидацию для формы "добавить карточку"

const renderCard = (card) => { //Добавить новую карточку в верстку
  cardsContainer.prepend(createCard(card));
};
const popupImage = new PopupWithImage(".popup_content_open-image"); // Попап открытия изображений
const handleCardClick = (name, link) => {
  popupImage.open(name, link);
};
const createCard = (cardsArray) => { // Создать новую карточку
  const card = new Card(cardsArray, templateSelector, handleCardClick);
  return card.generateCard();
};
const cardList = new Section(
  {
    renderer: (cardsArray) => {
      cardList.addItem(createCard(cardsArray));
    },
  },
  cardsSelector
);
cardList.renderItems(initialCard);
const popupAddCard = new PopupWithForm({ //Сабмит формы  с добавлением карточек
  popupSelector: ".popup_content_add-item",
  handleFormSubmit: (formData) => {
    renderCard(formData);
    popupAddCard.close();
  },
});

const userInfo = new UserInfo({//ПЕРЕДАЕШЬ ОБЪЕКТ - НЕ ЗАБЫВАЙ КЛЮЧ!!!
  usernameSelector: ".profile__title",
  activitySelector: ".profile__subtitle",
});
const popupEditProfile = new PopupWithForm({ //Сабмит формы редактирования профиля
  popupSelector: ".popup_content_edit-profile",
  handleFormSubmit: (formData) => {
    userInfo.setUserInfo(formData.username, formData.activity);
    popupEditProfile.close();
  },
});
const handleGetValuesEditProfile = () => { //Получить данные профиля и передать в инпуты
  const {username, activity} = userInfo.getUserInfo();
  usernameInput.value = username;
  userActivityInput.value = activity;
};


//Слушатели на попапы и кнопки
popupAddCard.setEventListeners();
popupEditProfile.setEventListeners();
popupImage.setEventListeners();
buttonOpenPopupElementEditProfile.addEventListener("click", () => {
  handleGetValuesEditProfile();
  formValidatorEditProfile.resetValidation();
  popupEditProfile.open();
});
buttonOpenPopupElementAddItem.addEventListener("click", () => {
  popupAddCard.open();
  formValidatorAddCard.resetValidation();
});
