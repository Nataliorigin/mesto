import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = document
      .querySelector(popupSelector)
      .querySelector(".popup__img");
    this._caption = document
      .querySelector(popupSelector)
      .querySelector(".popup__img-caption");
  }
  open(cardTitle, cardImageLink) {
    this._image.src = cardImageLink;
    this._image.alt = cardTitle;
    this._caption.textContent = cardTitle;
    super.open();
  }
}
