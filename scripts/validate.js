const showInputError = (formElement, inputElement, errorMessage, config) => { //Показать ошибку
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};
const hideInputError = (formElement, inputElement, config) => { //Скрыть ошибку
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};
const checkInputValidity = (formElement, inputElement, config) => { //Проверка инпутов на валидность
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};
const hasInvalidInput = (inputList) => { // Вернуть булево значение
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}
const toggleButtonState = (inputList, buttonElement, config) => { //Метод активности кнопки сабмита
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
}
const setEventListeners = (formElement, config) => { //Метод добавления слушателей на ввод
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config);
  formElement.addEventListener('reset', () => { //Обработчик для деактивации сабмита при загрузке страницы
    setTimeout(() => {
      toggleButtonState(inputList, buttonElement, config);
    }, 0);
  });

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
}
const enableValidation = (config) => { //Обход массива всех форм
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
}
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button-save',
  inactiveButtonClass: 'form__button-save_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
});