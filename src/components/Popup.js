import { escapeButton } from '../utils/elements.js';

export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;

  }
  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => this._handleEscClose(evt))
  }
  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', (evt) => this._handleEscClose())
  }
  _handleEscClose(evt) {
  if(evt.key === escapeButton) {
  this.close();
  }
  }
  _setEventListeners() {
this._popupSelector.addEventListener('mousedown',(evt) => {
  if (evt.target.classList.contains('popup_opened')) {
    this.close();
  }
  if (evt.target.classList.contains('popup__button-close')) {
    this.close();
    }
    });
  }
}
