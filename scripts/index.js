//Переменные попапа (коллекции)
const popupElements = document.querySelectorAll('.popup');
const popupCloseButtonElements = document.querySelectorAll('.popup__button-close');
//Переменные для изменения данных профиля
const popupElementEditProfile = document.querySelector('.popup_content_edit-profile');
const buttonOpenPopupElementEditProfile = document.querySelector('.profile__edit-button');
const profileNameElement = document.querySelector('.profile__title');
const profileActivityElement = document.querySelector('.profile__subtitle');
const formElementEditProfile = popupElementEditProfile.querySelector('[name = "form-profile-edit"]');
const nameInput = formElementEditProfile.querySelector('[name = "username"]');
const activityInput = formElementEditProfile.querySelector('[name = "activity"]');
//Переменнные для добавления элемента
const popupElementAddItem = document.querySelector('.popup_content_add-item');
const buttonOpenPopupElementAddItem = document.querySelector('.profile__add-button');
const formElementAddItem = popupElementAddItem.querySelector('[name = "form-profile-additem"]');
const formInputTitle = formElementAddItem.querySelector('[name = "title"]');
const formInputLink = formElementAddItem.querySelector('[name = "link"]');
const elementsContainer = document.querySelector('.elements__container');
const itemTemplate = document.querySelector('#item-template').content.querySelector('.item');
//Переменнные для попапа открытия изображения
const popupElementOpenImage = document.querySelector('.popup_content_open-image');
const popupElementImgContainer = document.querySelector('.popup__img-container');
const popupElementImage = document.querySelector('.popup__img');
const popupElementImgCaption = document.querySelector('.popup__img-caption');
//Массив элементов для отображения на странице
const initialItems = [
  {
    name: 'Вкусный ужин',
    link: '../img/krakenimages.jpg',
    alt: 'Праздничный ужин'
  },
  {
    name: 'Ароматная ёлка',
    link: '../img/alsu-vershinina.jpg',
    alt: 'Украшенная елка'
  },
  {
    name: 'Подарки',
    link: '../img/anita-austvika-podarok.jpg',
    alt: 'Подарки'
  },
  {
    name: 'Радость',
    link: '../img/anita-austvika-girl.jpg',
    alt: 'Девочка наряжает елку'
  },
  {
    name: 'Нарядный город',
    link: '../img/anita-austvika.jpg',
    alt: 'Нарядный город'
  },
  {
    name: 'Настроение',
    link: '../img/katie-azi-.jpg',
    alt: 'Настроение'
  }
];
//Функция открытия попапа
const openPopup = (el) => {
  el.classList.add('popup_opened');
}
//Функция закрытия попапа
const closePopup = () => {
  popupElements.forEach(function (el) {
    el.classList.remove('popup_opened');
  })
}
//Функция получения данных профиля и заполнения ими форм
const getDataElementEditProfile = () => {
  nameInput.value = profileNameElement.textContent;
  activityInput.value = profileActivityElement.textContent;
}
//Функция отправки формы в данные профиля
const submitHandlerFormElementEditProfile = (e) => {
  e.preventDefault();
  profileNameElement.textContent = nameInput.value;
  profileActivityElement.textContent = activityInput.value;
  closePopup();
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
  itemElementImage.addEventListener('click', handleOpenPopupImage);
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
//Функция попапа изображения
const handleOpenPopupImage = (e) => {
  popupElementImage.src = e.target.src;
  popupElementImage.alt = e.target.closest('.item').querySelector('.item__title').textContent;
  popupElementImgCaption.textContent = e.target.closest('.item').querySelector('.item__title').textContent;
  openPopup(popupElementOpenImage);
}
//Функция отображения массива элементов
initialItems.forEach((item) => {
  renderItem(item, elementsContainer);
});
//Функция отправки формы данных попапа "добавить элемент"
const submitHandlerFormElementAddItem = (e) => {
  e.preventDefault();
  const addedEl = {
    name: formInputTitle.value,
    link: formInputLink.value
  }
  addedRenderItem(addedEl, elementsContainer);
  closePopup();
  e.target.reset();
}
/*Слушатели событий по клику:
Слушатель на кнопку редактирования профиля*/
buttonOpenPopupElementEditProfile.addEventListener('click', () => {
  getDataElementEditProfile();
  openPopup(popupElementEditProfile);
});
//Слушатель на кнопку добавления элемента
buttonOpenPopupElementAddItem.addEventListener('click', () => openPopup(popupElementAddItem));
//Слушатель на кнопку закрытия с функцией для всех элементов
popupCloseButtonElements.forEach((element) => element.addEventListener('click', closePopup));
//Слушатель на кнопку отправки формы редактирования профиля
formElementEditProfile.addEventListener('submit', submitHandlerFormElementEditProfile);
//Слушатель на кнопку отправки формы добавления элемента
formElementAddItem.addEventListener('submit', submitHandlerFormElementAddItem);



