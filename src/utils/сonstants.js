import abhazia from "../img/abhazia.jpg";
import dagestan from "../img/dagestan.jpg";
import everest from "../img/everest.jpg";
import vladivostok from "../img/vladivostok.jpg";
import kamchatka from "../img/kamchatka.jpg";
import sulakCanyon from "../img/sulak_canyon.jpg";

export const initialCard = [
  {
    name: "Абхазия",
    link: abhazia,
  },
  {
    name: "Дагестан",
    link: dagestan,
  },
  {
    name: "Эверест",
    link: everest,
  },
  {
    name: "Владивосток",
    link: vladivostok,
  },
  {
    name: "Камчатка",
    link: kamchatka,
  },
  {
    name: "Сулакский каньон",
    link: sulakCanyon,
  },
];
export const configValidation = {
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button-save",
  inactiveButtonClass: "form__button-save_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};
export const escapeKey = "Escape";
export const templateSelector = "#item-template";
export const cardsSelector = ".cards__container";
