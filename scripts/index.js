const buttonOpenButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const popupCloseButton = document.querySelector(".popup__close-button");
const cardsCloseButton = document.querySelector(".popup__close-button_place");
const popupImageCloseButton = document.querySelector(".popup__close-button_image");
const nameInput = document.querySelector(".profile__name");
const jobInput = document.querySelector(".profile__job");
const popupInputName = document.querySelector(".popup__input_type_name");
const popupInputProfession = document.querySelector(".popup__input_type_profession");
const popupPlace = document.querySelector(".popup_place");
const popupImage = document.querySelector(".popup_image");
const cardsAddButton = document.querySelector(".profile__add-button");
const cardsSection = document.querySelector(".element");
const popupImageImage = document.querySelector(".popup__picture");
const popupImageText = document.querySelector(".popup__text_image");
const elementTemplate = document.querySelector(".element_template").content;
const formField = document.querySelector(".popup__field");
const form = document.querySelector(".popup__content");
const popupInput = form.querySelector(".popup__input");
const NewCardForm = document.querySelector(".popup__content_place");
const NewCardPopupInput = NewCardForm.querySelector(".popup__input_place");
const cardsForm = document.querySelector(".popup__content_place");
const cardsNameInput = document.querySelector(".popup__input_type_place");
const cardsUrlInput = document.querySelector(".popup__input_type_image");

function createCards(item) {
  const сard = elementTemplate.querySelector(".element__card").cloneNode(true);
  сard.querySelector(".element__mask").src = item.link;
  сard.querySelector(".element__mask").alt = item.name;
  сard.querySelector(".element__text").innerText = item.name;
  сard
    .querySelector(".element__heart-button")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("element__heart-button_active");
    });
  сard
    .querySelector(".element__delete-button")
    .addEventListener("click", function () {
      deleteCard(сard);
    });
  сard.querySelector(".element__mask").addEventListener("click", function () {
    popupImageOpen(popupImage);
    popupImageImage.src = item.link;
    popupImageText.innerText = item.name;
  });
  return сard;
}

function renderCards(array) {
  array.forEach(function (item) {
    cardsSection.prepend(createCards(item));
  });
}

renderCards(initialCards);

function renderNewCard(item) {
  cardsSection.prepend(item);
}

function cardsFormSubmitHandler(evt) {
  evt.preventDefault();
  const cardData = { name: cardsNameInput.value, link: cardsUrlInput.value };
  createCards(cardData);
  cardsPopupClose(popupPlace);
  renderNewCard(createCards(cardData));
}
cardsForm.addEventListener("submit", cardsFormSubmitHandler);

function formSubmitHandler(evt) {
  evt.preventDefault();
  nameInput.textContent = popupInputName.value;
  jobInput.textContent = popupInputProfession.value;

  popupClose(popup);
}
form.addEventListener("submit", formSubmitHandler);

function deleteCard(item) {
  item.remove();
}

function popupOpen(popup) {
  popup.classList.add("popup_open");
  document.addEventListener("keydown", closePopupOnQ);
}

function popupClose(popup) {
  popup.classList.remove("popup_open");
  document.addEventListener("keydown", closePopupOnQ);
}

function popupImageOpen(popupImage) {
  popupImage.classList.add("popup_open_image");
  document.addEventListener("keydown", closePopupOnQ);
}

function popupImageClose(popupImage) {
  popupImage.classList.remove("popup_open_image");
  document.addEventListener("keydown", closePopupOnQ);
}

function cardsPopupOpen(popupPlace) {
  popupPlace.classList.add("popup_open_place");
  document.addEventListener("keydown", closePopupOnQ);
}

function cardsPopupClose(popupPlace) {
  popupPlace.classList.remove("popup_open_place");
  document.addEventListener("keydown", closePopupOnQ);
}

function closePopupOnQ(e) {
  if (e.keyCode === 27) {
    cardsPopupClose(popupPlace);
    popupClose(popup);
    popupImageClose(popupImage);
  }
}

const showError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}_error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
};
const hideError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}_error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = "";
};
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideError(formElement, inputElement);
  }
};
const hasInvalidInput = function (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
};
form.addEventListener("submit", function (evt) {
  evt.preventDefault();
});
popupInput.addEventListener("input", function () {
  checkInputValidity(form, popupInput);
});
const setEventListeners = (formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};
setEventListeners(form);

function enableValidation() {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    const fieldSetList = Array.from(
      formElement.querySelectorAll(config.fieldSelector)
    );
    fieldSetList.forEach((fieldSet) => {
      setEventListeners(fieldSet);
    });
  });
}

enableValidation();

buttonOpenButton.addEventListener("click", function () {
  popupOpen(popup);
  popupInputName.value = nameInput.textContent;
  popupInputProfession.value = jobInput.textContent;
});

popupCloseButton.addEventListener("click", function () {
  popupClose(popup);
});

popupImageCloseButton.addEventListener("click", function () {
  popupImageClose(popupImage);
});

cardsAddButton.addEventListener("click", function () {
  cardsPopupOpen(popupPlace);
});

cardsCloseButton.addEventListener("click", function () {
  cardsPopupClose(popupPlace);
});

popup.addEventListener("click", function (e) {
  if (e.target === e.currentTarget) {
    popupClose(popup);
    popupImageClose(popupImage);
    cardsPopupClose(popupPlace);
  }
});

popupImage.addEventListener("click", function (e) {
  if (e.target === e.currentTarget) {
    popupImageClose(popupImage);
  }
});

popupPlace.addEventListener("click", function (e) {
  if (e.target === e.currentTarget) {
    cardsPopupClose(popupPlace);
  }
});

/*
const showError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}_error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;

};
const hideError = (formElement, inputElement,) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}_error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.textContent = '';
};
const checkInputValidity = (formElement, inputElement,) => {
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideError(formElement, inputElement);
  }
};
const hasInvalidInput = function (inputList){
  return inputList.some((inputElement) => {
  return !inputElement.validity.valid;
}); 
}
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
  buttonElement.classList.add('popup__save-button_inactive');
} else {
  buttonElement.classList.remove('popup__save-button_inactive');
} 
}
form.addEventListener('submit', function (evt) {
  evt.preventDefault();
});
popupInput.addEventListener('input', function () {
  checkInputValidity(form, popupInput);
});
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__save-button');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement); 
    });
  });
};
setEventListeners(form);


function enableValidation(){
  const formList = Array.from(document.querySelectorAll('.popup__content'));
  formList.forEach((formElement) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
  const fieldSetList = Array.from(formElement.querySelectorAll('.popup__field'));
  fieldSetList.forEach((fieldSet) => {
    setEventListeners(fieldSet);
  }); 
}); 
}

enableValidation();
*/
