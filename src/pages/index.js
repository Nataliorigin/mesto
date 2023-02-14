import "./index.css";
import FormValidator from "../components/FormValidator.js";
import {configValidation} from "../utils/сonstants.js";
import {
  buttonOpenPopupElementAddItem,
  buttonOpenPopupElementEditAvatar,
  buttonOpenPopupElementEditProfile,
  formElementAddCard,
  formElementAvatarProfile,
  formElementEditProfile,
  userActivityInput,
  usernameInput,
} from "../utils/elements.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import Card from "../components/Card.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation";

let currentId; //Текущий id пользователя

//Валидаторы форм
const formValidatorEditProfile = new FormValidator(
  configValidation,
  formElementEditProfile
);
const formValidatorAddCard = new FormValidator(
  configValidation,
  formElementAddCard
);
const formValidatorEditAvatar = new FormValidator(
  configValidation,
  formElementAvatarProfile
);

formValidatorEditProfile.enableValidation(); //Включить валидацию для формы "редактировать профиль"
formValidatorAddCard.enableValidation(); //Включить валидацию для формы "добавить карточку"
formValidatorEditAvatar.enableValidation(); // Включить валидацию для формы "изменить аватар"

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-59/",
  headers: {
    authorization: "7e9bec29-0c4a-4040-905f-685af73cf60c",
    "Content-Type": "application/json",
  },
});

Promise.all([api.getInfoUser(), api.getCards()]) //Карточки должны отображаться только после получения id пользователя
  .then(([resUserInfo, resCards]) => {
    userInfo.setUserInfo(resUserInfo);
    currentId = resUserInfo._id;
    cardList.renderItems(resCards);
  })
  .catch((error) => console.log(error));

const createCard = (cardData) => {
  const newCard = new Card(cardData, "#item-template", currentId, {
    handleCardClick: () => {
      popupImage.open(cardData.name, cardData.link);
    },
    handleSetLikeClick: (card) => {
      console.log(newCard.hasLiked());
      if (newCard.hasLiked()) {
        api
          .deleteLike(card._id)
          .then((data) => {
            newCard.likeCounter(data.likes);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        api
          .addLike(card._id)
          .then((data) => {
            newCard.likeCounter(data.likes);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    handleDeleteCardClick: (element, cardId) => {
      popupWithConfirmation.open({element, cardId});
    },
  });
  return newCard.generateCard();
};

const cardList = new Section(
  {
    renderer: (item) => {
      cardList.addItem(createCard(item));
    },
  },
  ".cards__container"
);

const handleGetValuesEditProfile = () => {
  const userData = userInfo.getUserInfo();
  usernameInput.value = userData.name;
  userActivityInput.value = userData.about;
};
const handleEditProfileFormSubmit = (userData) => {
  //Хендлер для попапа редактирования профиля
  popupEditProfile.renderLoading(true);
  api
    .editProfile(userData)
    .then((res) => {
      userInfo.setUserInfo(res);
      currentId = userData._id;
      popupEditProfile.close();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      popupEditProfile.renderLoading(false);
    });
};
const handleAddCardFormSubmit = (cardData) => {
  //Хендлер для попапа добавления карточки
  popupAddCard.renderLoading(true);
  api
    .addCard(cardData)
    .then((res) => {
      cardList.addItem(createCard(res));
      popupAddCard.close();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      popupAddCard.renderLoading(false);
    });
};

const handleEditAvatarFormSubmit = (avatar) => {
  //Хендлер для попапа аватара
  popupEditAvatar.renderLoading(true);
  api
    .updateAvatar(avatar)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupEditAvatar.close();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      popupEditAvatar.renderLoading(false);
    });
};

const handleDeleteCardSubmit = ({element, cardId}) => {
  popupWithConfirmation.renderLoading(true);
  api
    .deleteCard(cardId)
    .then((res) => {
      element.remove();
      element = null;
      popupWithConfirmation.close();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      popupWithConfirmation.renderLoading(false);
    });
};

const userInfo = new UserInfo({
  usernameSelector: ".profile__title",
  activitySelector: ".profile__subtitle",
  avatarSelector: ".profile__avatar",
});

const popupImage = new PopupWithImage(".popup_content_open-image"); // Попап открытия изображений

const popupEditProfile = new PopupWithForm( //Сабмит формы редактирования профиля
  ".popup_content_edit-profile",
  handleEditProfileFormSubmit
);

const popupAddCard = new PopupWithForm( //Сабмит формы  с добавлением карточек
  ".popup_content_add-item",
  handleAddCardFormSubmit
);

const popupEditAvatar = new PopupWithForm(
  ".popup_content_edit-avatar",
  handleEditAvatarFormSubmit
);

const popupWithConfirmation = new PopupWithConfirmation( //Модалка сделана из существ. компонент (Popup)
  ".popup_content_delete-card",
  handleDeleteCardSubmit
);

//Слушатели на попапы и кнопки
popupAddCard.setEventListeners();
popupEditProfile.setEventListeners();
popupImage.setEventListeners();
popupEditAvatar.setEventListeners();
popupWithConfirmation.setEventListeners();

buttonOpenPopupElementEditProfile.addEventListener("click", () => {
  handleGetValuesEditProfile();
  formValidatorEditProfile.resetValidation();
  popupEditProfile.open();
});
buttonOpenPopupElementAddItem.addEventListener("click", () => {
  formValidatorAddCard.resetValidation();
  popupAddCard.open();
});
buttonOpenPopupElementEditAvatar.addEventListener("click", () => {
  formValidatorEditAvatar.resetValidation();
  popupEditAvatar.open();
});
