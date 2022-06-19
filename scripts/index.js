const buttonOpenButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const popupCloseButton = document.querySelector(".popup__close-button");
const cardsCloseButton = document.querySelector(".popup-place__close-button");
const popupImageCloseButton = document.querySelector(".popup-image__close-button");
const nameInput = document.querySelector(".profile__name");
const jobInput = document.querySelector(".profile__job");
const popupInput = document.querySelector(".popup__input");
const popupInputName = document.querySelector(".popup__input_type_name");
const popupInputProfession = document.querySelector(".popup__input_type_profession");
const popupPlace = document.querySelector(".popup-place");
const popupImage = document.querySelector(".popup-image");
const cardsAddButton = document.querySelector(".profile__add-button");
const cardsSection = document.querySelector(".element");
const popupImageImage = document.querySelector(".popup-image__image");
const popupImageText = document.querySelector(".popup-image__text");
const elementTemplate = document.querySelector(".element_template").content;
const form = document.querySelector(".popup__content");
const cardsForm = document.querySelector(".popup-place__content");
const cardsNameInput = document.querySelector(".popup-place__input_type_name");
const cardsUrlInput = document.querySelector(".popup-place__input_type_place");
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

function createCards(item) {
  const Card = elementTemplate.querySelector(".element__card").cloneNode(true);
  Card.querySelector(".element__mask").src = item.link;
  Card.querySelector(".element__mask").alt = item.name;
  Card.querySelector(".element__text").innerText = item.name;
  Card.querySelector(".element__heart-button").addEventListener(
    "click",
    function (evt) {
      evt.target.classList.toggle("element__heart-button_active");
    }
  );
  Card.querySelector(".element__delete-button").addEventListener(
    "click",
    function () {
      deleteCard(Card);
    }
  );
  Card.querySelector(".element__mask").addEventListener("click", function () {
    popupImageOpen(popupImage);
    popupImageImage.src = item.link;
    popupImageText.innerText = item.name;
  });
  return Card;
}

function renderCards(array) {
  array.forEach(function (item) {
    cardsSection.prepend(createCards(item));
  });
}

renderCards(initialCards);

function formSubmitHandler(evt) {
  evt.preventDefault();
  nameInput.textContent = popupInputName.value;
  jobInput.textContent = popupInputProfession.value;
  popupClose(popup);
}
form.addEventListener("submit", formSubmitHandler);

function renderNewCard(item) {
  cardsSection.prepend(item);
}

function cardsFormSubmitHandler(evt) {
  evt.preventDefault();
  const Card = elementTemplate.querySelector(".element__card").cloneNode(true);
  Card.querySelector(".element__mask").src = cardsUrlInput.value;
  Card.querySelector(".element__mask").alt = cardsNameInput.value;
  Card.querySelector(".element__text").innerText = cardsNameInput.value;
  popupPlace.classList.remove("popup-place_open");
  Card.querySelector(".element__heart-button").addEventListener(
    "click",
    function (evt) {
      evt.target.classList.toggle("element__heart-button_active");
    }
  );
  Card.querySelector(".element__delete-button").addEventListener(
    "click",
    function () {
      deleteCard(Card);
    }
  );
  Card.querySelector(".element__mask").addEventListener("click", function () {
    popupImageOpen(popupImage);
    popupImageImage.src = cardsUrlInput.value;
    popupImageText.innerText = cardsNameInput.value;
  });
  renderNewCard(Card);
}

cardsForm.addEventListener("submit", cardsFormSubmitHandler);

function deleteCard(item) {
  item.remove();
}

function popupOpen(popup) {
  popup.classList.add("popup_open");
}

function popupClose(popup) {
  popup.classList.remove("popup_open");
}

function popupImageOpen(popupImage) {
  popupImage.classList.add("popup-image_open");
}

function popupImageClose(popupImage) {
  popupImage.classList.remove("popup-image_open");
}

function cardsPopupOpen(popupPlace) {
  popupPlace.classList.add("popup-place_open");
}

function cardsPopupClose(popupPlace) {
  popupPlace.classList.remove("popup-place_open");
}

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

/*
function renderCard(array) {
  array.forEach((item) =>
  cardsSection.prepend(createCard(item)));
  }
  */
