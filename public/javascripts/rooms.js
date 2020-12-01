const switcherRoom = document.querySelector('.listInfo__switch--rooms');
const listRooms = document.querySelector('.listRooms');

// Add room inputs
const titleRoom = document.querySelector('.addRoom__input--title');
const descriptionRoom = document.querySelector('.addRoom__input--description');
const priceRoom = document.querySelector('.addRoom__input--price');
const locationRoom = document.querySelector('.addRoom__input--location');
const imageRoom = document.querySelector('.addRoom__input--file');
const submitRoomBtn = document.querySelector('.addRoom__submit');

// error elements
const titleError = document.querySelector('.addRoom__titleError');
const descriptionError = document.querySelector('.addRoom__descriptionError');
const priceError = document.querySelector('.addRoom__priceError');
const locationError = document.querySelector('.addRoom__locationError');
const fileError = document.querySelector('.addRoom__fileError');

// validation flags
let isTitleValid = false;
let isDescriptionValid = false;
let isPriceValid = false;
let isLocationValid = false;
let isFileValid = false;

// validation for add room to database
const validTitleRoom = () => {
  if (titleRoom.value.length >= 3) {
    isTitleValid = true;
    titleError.style.opacity = 0;
    titleRoom.style.border = '1px solid #adadad';
  } else {
    isTitleValid = false;
    titleError.style.opacity = 1;
    titleRoom.style.border = '1px solid red';
  }
};

const validDescriptionRoom = () => {
  if (descriptionRoom.value.length >= 10) {
    isDescriptionValid = true;
    descriptionError.style.opacity = 0;
    descriptionRoom.style.border = '1px solid #adadad';
  } else {
    isDescriptionValid = false;
    descriptionError.style.opacity = 1;
    descriptionRoom.style.border = '1px solid red';
  }
};

const validPriceRoom = () => {
  if (priceRoom.value > 0) {
    isPriceValid = true;
    priceError.style.opacity = 0;
    priceRoom.style.border = '1px solid #adadad';
  } else {
    isPriceValid = false;
    priceError.style.opacity = 1;
    priceRoom.style.border = '1px solid red';
  }
};

const validLocationRoom = () => {
  if (locationRoom.value.length >= 3) {
    isLocationValid = true;
    locationError.style.opacity = 0;
    locationRoom.style.border = '1px solid #adadad';
  } else {
    isLocationValid = false;
    locationError.style.opacity = 1;
    locationRoom.style.border = '1px solid red';
  }
};

const validFileRoom = () => {
  if (imageRoom.value.length > 0) {
    isFileValid = true;
    fileError.style.opacity = 0;
  } else {
    isFileValid = false;
    fileError.style.opacity = 1;
  }
};

// Show list rooms functions
const addRooms = (response) => {
  const { data } = response;
  const { currentUser } = response;
  console.log(currentUser);
  const fragment = new DocumentFragment();
  listRooms.textContent = '';

  data.forEach((item, index) => {
    const li = document.createElement('li');
    const indexItem = document.createElement('p');
    const image = document.createElement('img');
    const title = document.createElement('p');

    li.classList.add('listRooms__item');
    indexItem.classList.add('listRooms__id');
    image.classList.add('listRooms__image');
    title.classList.add('listRooms__login');

    li.dataset.id = item._id;
    image.setAttribute('src', item.pathImage);

    indexItem.textContent = index + 1;
    title.textContent = item.title;

    li.appendChild(indexItem);
    li.appendChild(image);
    li.appendChild(title);

    if (item.ownerId === currentUser) {
      const button = document.createElement('button');

      if (item.tenantId !== '') {
        button.classList.add('listRooms__btn--delete');
        button.textContent = 'Usuń z pokoju';
      } else {
        button.classList.add('listRooms__btn--add');
        button.textContent = 'Dodaj do pokoju';
      }

      li.appendChild(button);
    }
    fragment.appendChild(li);
  });

  listRooms.appendChild(fragment);
};

const emptyMessageRooms = () => {
  const li = document.createElement('li');
  const p = document.createElement('p');
  listRooms.textContent = '';

  li.classList.add('listRooms__item');
  p.classList.add('listRooms__login');
  p.style.lineHeight = '20px';

  p.textContent =
    'Nie dodałeś żadnego pokoju, ani nie jesteś przypisanego do żadnego pokoju';
  p.style.width = '100%';
  p.style.textAlign = 'center';

  li.appendChild(p);
  listRooms.appendChild(li);
};

switcherRoom.addEventListener('click', () => {
  const url = `/account/rooms`;

  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.length === 0) {
        emptyMessageRooms();
      } else {
        addRooms(response);
      }
    });
});

titleRoom.addEventListener('input', validTitleRoom);
descriptionRoom.addEventListener('input', validDescriptionRoom);
priceRoom.addEventListener('input', validPriceRoom);
locationRoom.addEventListener('input', validLocationRoom);
fileError.addEventListener('input', validFileRoom);

setInterval(() => {
  if (isTitleValid && isDescriptionValid && isPriceValid && isLocationValid) {
    validFileRoom();
    if (isFileValid) {
      submitRoomBtn.disabled = false;
    }
  } else {
    submitRoomBtn.disabled = true;
  }
}, 500);
