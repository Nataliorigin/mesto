const popups = document.querySelectorAll('.popup');
const escapeButton = 'Escape';
//Переменные для изменения данных профиля
const popupElementEditProfile = document.querySelector('.popup_content_edit-profile');
const buttonOpenPopupElementEditProfile = document.querySelector('.profile__edit-button');
const profileNameElement = document.querySelector('.profile__title');
const profileActivityElement = document.querySelector('.profile__subtitle');
const formElementEditProfile = document.forms[name = "profile-edit"];
//Переменнные для добавления элемента
const popupElementAddCard = document.querySelector('.popup_content_add-item');
const formElementAddCard = document.forms[name = "add-card"];
const buttonOpenPopupElementAddItem = document.querySelector('.profile__add-button');
const elementsContainer = document.querySelector('.elements__container');
const itemTemplate = document.querySelector('#item-template').content.querySelector('.item');
//Переменнные для попапа открытия изображения
const popupElementOpenImage = document.querySelector('.popup_content_open-image');
const popupElementImage = document.querySelector('.popup__img');
const popupElementImgCaption = document.querySelector('.popup__img-caption');
//Переменные форм
const usernameInput = formElementEditProfile.elements.username;
const userActivityInput = formElementEditProfile.elements.activity;
const titleInput = formElementAddCard.elements.title;
const linkInput = formElementAddCard.elements.link;
//Функция открытия попапа
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupWithEsc);
}
//Функция закрытия попапа
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupWithEsc);
}
//Функция получения данных профиля и заполнения ими форм
const getDataElementEditProfile = () => {
  usernameInput.value = profileNameElement.textContent;
  userActivityInput.value = profileActivityElement.textContent;
}
//Функция отправки формы в данные профиля
const handleProfileFormSubmit = (e) => {
  e.preventDefault();
  profileNameElement.textContent = usernameInput.value;
  profileActivityElement.textContent = userActivityInput.value;
  closePopup(popupElementEditProfile);

}

//Функция заполнения темплейт элемента
function createCard(item) {
  const itemElement = itemTemplate.cloneNode(true);
  const itemElementTitle = itemElement.querySelector('.item__title');
  const itemElementImage = itemElement.querySelector('.item__image');
  const buttonLike = itemElement.querySelector('.item__like');
  const buttonDelete = itemElement.querySelector('.item__delete');
  itemElementTitle.textContent = item.name;
  itemElementImage.src = item.link;
  itemElementImage.alt = item.alt || item.name;
  itemElementImage.addEventListener('click', () => { // Функция открытия попапа изображения
    popupElementImage.src = item.link;
    popupElementImage.alt = item.alt || item.name;
    popupElementImgCaption.textContent = item.name;
    openPopup(popupElementOpenImage)
  })
  buttonLike.addEventListener('click', handleLikeButtonClick);
  buttonDelete.addEventListener('click', handleDeleteButtonClick);
  return itemElement;
}

//Функция отображения добавленного массива элементов
const appendItem = (item, wrapperElement) => {
  const element = createCard(item);
  wrapperElement.append(element);
}
//Функция отображения новых элементов
const prependItem = (item, wrapperElement) => {
  const element = createCard(item);
  wrapperElement.prepend(element);
}
//Функция удаления элемента
const handleDeleteButtonClick = (e) => {
  e.target.closest('.item').remove();
}
//Функция поставить/убрать лайк
const handleLikeButtonClick = (e) => {
  e.target.classList.toggle('item__like_active');
}
//Функция отображения массива элементов
initialItems.forEach((item) => {
  appendItem(item, elementsContainer);
});
//Функция отправки формы данных попапа "добавить элемент"
const handleAddCardFormSubmit = (e) => {
  e.preventDefault();
  const addedEl = {
    name: titleInput.value,
    link: linkInput.value,
  }
  prependItem(addedEl, elementsContainer);
  closePopup(popupElementAddCard);
  e.target.reset();
}
//Функция закрытия попапа по кнопке "esc"
const closePopupWithEsc = (evt) => {
  if (evt.key === escapeButton) {
    const openModal = document.querySelector('.popup_opened');
    closePopup(openModal);
  }
}
/*Слушатели событий по клику:
Слушатель на кнопку редактирования профиля*/
buttonOpenPopupElementEditProfile.addEventListener('click', () => {
  getDataElementEditProfile();
  openPopup(popupElementEditProfile);
});
//Слушатель на кнопку добавления элемента
buttonOpenPopupElementAddItem.addEventListener('click', () => {
  openPopup(popupElementAddCard);
});
//Слушатель на кнопку отправки формы редактирования профиля
formElementEditProfile.addEventListener('submit', handleProfileFormSubmit);
//Слушатель на кнопку отправки формы добавления элемента
formElementAddCard.addEventListener('submit', handleAddCardFormSubmit);
//Слушатель на закрытие попапов по клику на оверлей и крестика
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  })
})
