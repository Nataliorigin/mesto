import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import {configValidation, initialCard} from "../utils/сonstants.js";
import {
  buttonOpenPopupElementAddItem,
  buttonOpenPopupElementEditProfile,
  cardsContainer,
  cardsSelector,
  formElementAddCard,
  formElementEditProfile,
  popupElementAddCard,
  popupElementEditProfile,
  popupElementOpenImage,
  profileActivityElement,
  profileNameElement,
  templateSelector,
  userActivityInput,
  usernameInput
} from "../utils/elements.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
//Переменные для валидации
const editProfileFormValidator = new FormValidator(configValidation, formElementEditProfile)
const addCardFormValidator = new FormValidator(configValidation, formElementAddCard);

editProfileFormValidator.enableValidation(); //Включить валидацию для формы редактирования профиля
addCardFormValidator.enableValidation(); //Включить валидацию для формы "добавить карточку"

const handleAddedNewCard = (item) => { //Добавить новую карточку в верстку
  cardsContainer.prepend(createCard(item));
}

const popupImage = new PopupWithImage(popupElementOpenImage); // Попап открытия изображений
const handleCardClick = (name, link) => {
  popupImage.open(name, link);
}
popupImage._setEventListeners();

const createCard = (item) => { // Создать новую карточку
  const card = new Card(item, templateSelector, handleCardClick)
  return card.generateCard();
}
const cardList = new Section({ //Отрисовать массив карточек
  initialCards: initialCard,
  renderer: (item) => {
    cardList.addItem(createCard(item));
  }, }, cardsSelector);

cardList.renderItems();
const popupAddCard = new PopupWithForm({ //Сабмит формы  с добавлением карточек
  popupSelector: popupElementAddCard,
  handleFormSubmit: (formData) => {
    handleAddedNewCard(formData);
    console.log(formData);
    popupAddCard.close();
}
});
popupAddCard._setEventListeners();

const userInfo = new UserInfo(
  {    //ПЕРЕДАЕШЬ ОБЪЕКТ - НЕ ЗАБЫВАЙ КЛЮЧ!!!
    usernameSelector: profileNameElement,
    activitySelector: profileActivityElement
  });

const popupEditProfile = new PopupWithForm({ //Сабмит формы редактирования профиля
  popupSelector: popupElementEditProfile,
  handleFormSubmit:(formData) =>  {
  userInfo.setUserInfo(formData.username, formData.activity);
  popupEditProfile.close();
}
});

  const handleGetValuesEditProfile = () =>{ // Получить данные профиля и передать в инпуты
    const {username, activity} = userInfo.getUserInfo();
    usernameInput.value = username;
    userActivityInput.value = activity;

  };
popupEditProfile._setEventListeners();
//Слушатели кнопок
buttonOpenPopupElementEditProfile.addEventListener('click', () => {
  handleGetValuesEditProfile();
  popupEditProfile.open();
});
buttonOpenPopupElementAddItem.addEventListener('click', () => {
  popupAddCard.open();
  addCardFormValidator.resetValidation();
});

