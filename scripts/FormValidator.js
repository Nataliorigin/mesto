export class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
  }
_showInputError = (inputElement, errorMessage) => { //Показать ошибку
    const errorElement =  this._form.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  };
_hideInputError = (inputElement) => { //Скрыть ошибку
    const errorElement = this._form.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity = (inputElement) => { //Проверка инпутов на валидность
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };
 _hasInvalidInput = (inputList) => { // Вернуть булево значение
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
 _toggleButtonState = (inputList, buttonElement) => { //Метод активности кнопки сабмита
    if (this._hasInvalidInput(inputList)) {
      buttonElement.setAttribute('disabled', true);
      buttonElement.classList.add(this._config.inactiveButtonClass);
    } else {
      buttonElement.removeAttribute('disabled');
      buttonElement.classList.remove(this._config.inactiveButtonClass);
    }
  }
 clearValidation = () => {

  }
 enableValidation() {
   const inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector)); //Массив инпутов
   const buttonElement = this._form.querySelector(this._config.submitButtonSelector);
   this._toggleButtonState(inputList, buttonElement);
   this._form.addEventListener('reset', () => { //Обработчик для деактивации сабмита при загрузке страницы
     setTimeout(() => {
       this._toggleButtonState(buttonElement);
     }, 0);
   });

   inputList.forEach((inputElement) => {
     inputElement.addEventListener('input', () => {
       this._checkInputValidity(inputElement);
       this._toggleButtonState(inputList, buttonElement);
     });
   });
  }
}

