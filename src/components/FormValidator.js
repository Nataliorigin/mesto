export default class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._inputList = Array.from(
      this._form.querySelectorAll(this._config.inputSelector)
    );
    this._buttonElement = this._form.querySelector(
      this._config.submitButtonSelector
    );
  }

  _showInputError = (inputElement, errorMessage) => { //Показать ошибку
    const errorElement = this._form.querySelector(
      `.${inputElement.name}-error`
    );
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  };
  _hideInputError = (inputElement) => { //Скрыть ошибку
    const errorElement = this._form.querySelector(
      `.${inputElement.name}-error`
    );
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = "";
  };
  _checkInputValidity = (inputElement) => { //Проверить инпут на валидность
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };
  _hasInvalidInput = () => { // Вернуть булево значение
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
  _toggleButtonState = () => { //Метод активности кнопки сабмита
    if (this._hasInvalidInput()) {
      this._buttonElement.setAttribute("disabled", true);
      this._buttonElement.classList.add(this._config.inactiveButtonClass);
    } else {
      this._buttonElement.removeAttribute("disabled");
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
    }
  };
  resetValidation = () => {
    this._inputList.forEach((inputElement) => { //Скрыть ошибки при открытии попапа
      this._hideInputError(inputElement);
    });
    this._form.addEventListener("reset", () => { //Деактивировать сабмит при очистке формы
      setTimeout(() => {
        this._toggleButtonState();
      }, 0);
    });
  };

  enableValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }
}
