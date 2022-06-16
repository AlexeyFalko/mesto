const buttonOpenButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const popupCloseButton = document.querySelector(".popup__close-button");
const cardsCloseButton = document.querySelector(".popup-place__close-button");
const nameInput = document.querySelector(".profile__name");
const jobInput = document.querySelector(".profile__job");
const popupInput = document.querySelector(".popup__input");
const popupInputName = document.querySelector(".popup__input_type_name");
const popupInputProfession = document.querySelector(".popup__input_type_profession");
const popupPlace = document.querySelector(".popup-place");
const cardsAddButton = document.querySelector(".profile__add-button");
const cardsSection = document.querySelector(".element");

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

function openPage(initialCards) {
  const elementTemplate = document.querySelector(".element_template").content;
  const openingCard = elementTemplate.cloneNode(true);
  openingCard.querySelector(".element__mask").src = initialCards.link;
  openingCard.querySelector(".element__text").innerText = initialCards.name;
  openingCard.querySelector('.element__heart-button').addEventListener('click', function(evt){
    evt.target.classList.toggle('element__heart-button_active');  
  });
  cardsSection.appendChild(openingCard);
}
initialCards.forEach(openPage);





cardsAddButton.addEventListener("click", function () {
  popupPlace.classList.add("popup-place_open");
});

cardsCloseButton.addEventListener("click", function () {
  popupPlace.classList.remove("popup-place_open");
});

buttonOpenButton.addEventListener("click", function () {
  popup.classList.add("popup_open");
  popupInputName.value = nameInput.textContent;
  popupInputProfession.value = jobInput.textContent;
});

popupCloseButton.addEventListener("click", function () {
  popup.classList.remove("popup_open");
});

const form = document.querySelector(".popup__content");
function formSubmitHandler(evt) {
  evt.preventDefault();
  nameInput.textContent = popupInputName.value;
  jobInput.textContent = popupInputProfession.value;
  popup.classList.remove("popup_open");
}
form.addEventListener("submit", formSubmitHandler);

const cardsForm = document.querySelector(".popup-place__content");
function cardsFormSubmitHandler(evt) {
  evt.preventDefault();
  const cardsNameInput = document.querySelector(".popup-place__input_type_name");
  const cardsUrlInput = document.querySelector(".popup-place__input_type_place");
  const elementTemplate = document.querySelector(".element_template").content;
  const openingCard = elementTemplate.cloneNode(true);
  openingCard.querySelector(".element__mask").src = cardsUrlInput.value;
  openingCard.querySelector(".element__text").innerText = cardsNameInput.value;
  popupPlace.classList.remove("popup-place_open");
  openingCard.querySelector('.element__heart-button').addEventListener('click', function(evt){
    evt.target.classList.toggle('element__heart-button_active');
  });
  openingCard.querySelector('.element__delete-button').addEventListener('click', function(){
    deleteCard(openingCard);
  });
  cardsSection.prepend(openingCard);
}

function deleteCard (item) {
  item.remove();
}



cardsForm.addEventListener("submit", cardsFormSubmitHandler);







