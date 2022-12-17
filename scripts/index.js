const popupElements = document.querySelectorAll('.popup');
const escapeButton = 'Escape';
//Переменные для изменения данных профиля
const popupElementEditProfile = document.querySelector('.popup_content_edit-profile');
const popupCloseButtonElementEditProfile = popupElementEditProfile.querySelector('.popup__button-close');
const buttonOpenPopupElementEditProfile = document.querySelector('.profile__edit-button');
const profileNameElement = document.querySelector('.profile__title');
const profileActivityElement = document.querySelector('.profile__subtitle');
const formElementEditProfile = popupElementEditProfile.querySelector('[name = "profile-edit"]');
//Переменнные для добавления элемента
const popupElementAddCard = document.querySelector('.popup_content_add-item');
const formElementAddCard = popupElementAddCard.querySelector('[name = "add-card"]');
const popupCloseButtonElementAddItem = popupElementAddCard.querySelector('.popup__button-close');
const buttonOpenPopupElementAddItem = document.querySelector('.profile__add-button');
const elementsContainer = document.querySelector('.elements__container');
const itemTemplate = document.querySelector('#item-template').content.querySelector('.item');
//Переменнные для попапа открытия изображения
const popupElementOpenImage = document.querySelector('.popup_content_open-image');
const popupCloseButtonElementOpenImage = popupElementOpenImage.querySelector('.popup__button-close');
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
const submitHandlerFormElementEditProfile = (e) => {
  e.preventDefault();
  profileNameElement.textContent = usernameInput.value;
  profileActivityElement.textContent = userActivityInput.value;
  closePopup(popupElementEditProfile);

}

//Функция заполнения темплейт элемента
function createElement(item) {
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
const renderItem = (item, wrapperElement) => {
  const element = createElement(item);
  wrapperElement.append(element);
}
//Функция отображения новых элементов
const addedRenderItem = (item, wrapperElement) => {
  const element = createElement(item);
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
  renderItem(item, elementsContainer);
});
//Функция отправки формы данных попапа "добавить элемент"
const submitHandlerFormElementAddItem = (e) => {
  e.preventDefault();
  const addedEl = {
    name: titleInput.value,
    link: linkInput.value,
  }
  const submitButton = popupElementAddCard.querySelector('.form__button-save');
  submitButton.classList.add('form__button-save_disabled');
  submitButton.disabled = true;
  addedRenderItem(addedEl, elementsContainer);
  closePopup(popupElementAddCard);
  e.target.reset();
}
//Функция закрытия попапа по клику на оверлей
const closePopupByOverlay = (evt) => {
  const openModal = document.querySelector('.popup_opened');
  if (evt.target === evt.currentTarget) {
    closePopup(openModal);
  }
}
//Функция закрытия попапа по кнопке "esc"
const closePopupWithEsc = (evt) => {
  const openModal = document.querySelector('.popup_opened');
  if (evt.key === escapeButton) {
    closePopup(openModal);
  }
}
/*Слушатели событий по клику:
Слушатель на кнопку редактирования профиля*/
buttonOpenPopupElementEditProfile.addEventListener('click', () => {
  getDataElementEditProfile();
  const submitButton = popupElementEditProfile.querySelector('.form__button-save');
  submitButton.classList.remove('form__button-save_disabled');
  submitButton.disabled = false;
  openPopup(popupElementEditProfile);
});
//Слушатель на кнопку добавления элемента
buttonOpenPopupElementAddItem.addEventListener('click', () => {
  openPopup(popupElementAddCard);
});
//Слушатели на кнопки закрытия
popupCloseButtonElementEditProfile.addEventListener('click', () => closePopup(popupElementEditProfile));
popupCloseButtonElementAddItem.addEventListener('click', () => closePopup(popupElementAddCard));
popupCloseButtonElementOpenImage.addEventListener('click', () => closePopup(popupElementOpenImage));
//Слушатель на кнопку отправки формы редактирования профиля
formElementEditProfile.addEventListener('submit', submitHandlerFormElementEditProfile);
//Слушатель на кнопку отправки формы добавления элемента
formElementAddCard.addEventListener('submit', submitHandlerFormElementAddItem);
//Слушатель на закрытие попапа по клику на оверлей
popupElements.forEach((popup) => popup.addEventListener('click', closePopupByOverlay));
