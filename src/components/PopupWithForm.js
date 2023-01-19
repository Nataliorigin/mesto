import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
constructor({popupSelector, handleFormSubmit}) {
  super(popupSelector);
  this._handleFormSubmit = handleFormSubmit;
  this._formElement = popupSelector.querySelector('.popup__form');
}
  _getInputValues() { // Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
    this._inputList = this._formElement.querySelectorAll('.form__input');
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  _setEventListeners() {
  super._setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
  close() {
    super.close();
    this._formElement.reset();
  }
}
