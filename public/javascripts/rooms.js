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

// add user to room
const addUser = document.querySelector('.addUserRoom');
const form = document.querySelector('.addUserRoom__form');
let idRoom = '';

// validation flags
let isTitleValid = false;
let isDescriptionValid = false;
let isPriceValid = false;
let isLocationValid = false;
let isFileValid = false;

// page variables
let pageRoom = 1;

const closeAddUser = (isPopUp = false) => {
  const closeList = document.querySelector('.listInfo__switch--rooms');

  const event = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true,
  });
  if (isPopUp) {
    const exit = document.querySelector('.addUserRoom__exit');
    const cancelled = !exit.dispatchEvent(event);
  }
  const close = !closeList.dispatchEvent(event);
};

// remove user from room

const removeUser = () => {
  const url = `/account/removeUser/${idRoom}`;

  fetch(url)
    .then((response) => response.json())
    .then((response) => {
      if (response.isDone) {
        closeAddUser();
      }
    });
};

const removeUserEvent = () => {
  const removeBtns = document.querySelectorAll('.listRooms__btn--delete');

  [...removeBtns].map((item) => {
    item.addEventListener('click', (e) => {
      const parent = e.target.parentElement;
      idRoom = parent.dataset.id;
      removeUser();
    });
  });
};

// show add user to room form

const openAddUser = (target) => {
  const parent = target.parentElement;
  idRoom = parent.dataset.id;
  const pageWidth = document.body.offsetWidth;
  const pageHeight = window.innerHeight;

  if (pageWidth < 1024) {
    gsap.to(addUser, { x: pageWidth, duration: 1 });
  } else if (pageWidth < 1200) {
    gsap.to(addUser, { y: (pageHeight / 100) * 7.5, duration: 0.1 });
    gsap.to(addUser, { x: pageWidth * 0.75, duration: 1, delay: 0.1 });
  } else {
    gsap.to(addUser, { y: (pageHeight / 100) * 7.5, duration: 0.1 });
    gsap.to(addUser, { x: pageWidth * 0.66, duration: 1, delay: 0.1 });
  }
};

const addEventAddUser = () => {
  const addUserBtns = document.querySelectorAll('.listRooms__btn--add');

  [...addUserBtns].map((item) => {
    item.addEventListener('click', (e) => {
      openAddUser(e.target);
    });
  });
};

const addUserRoom = (login) => {
  const url = `/account/addUser/${login.value}/${idRoom}`;

  fetch(url)
    .then((response) => response.json())
    .then((response) => {
      if (response.isDone) {
        closeAddUser(true);
      }
    });
};

const submitForm = () => {
  const login = document.querySelector('.addUserRoom__input');
  const error = document.querySelector('.addUserRoom__error');
  const loginValue = login.value;

  if (loginValue) {
    checkUser(loginValue)
      .then((response) => {
        if (response != null) {
          addUserRoom(login);
        } else {
          error.textContent = 'Brak użytkownika';
          loginWrong(login, error);
        }
      })
      .catch((error) => console.log(error));
  } else {
    loginWrong(login, error);
  }
};

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
  const fragment = new DocumentFragment();
  listRooms.textContent = '';

  data.forEach((item, index) => {
    const li = document.createElement('li');
    const indexItem = document.createElement('p');
    const image = document.createElement('img');
    const title = document.createElement('p');
    const button = document.createElement('button');

    li.classList.add('listRooms__item');
    indexItem.classList.add('listRooms__id');
    image.classList.add('listRooms__image');
    title.classList.add('listRooms__login');

    li.dataset.id = item._id;
    image.setAttribute('src', item.pathImage);

    indexItem.textContent = index + 1;
    title.textContent = item.title;

    if (item.ownerId === currentUser) {
      if (item.tenantId !== '') {
        button.classList.add('listRooms__btn--delete');
        button.textContent = 'Usuń z pokoju';
      } else {
        button.classList.add('listRooms__btn--add');
        button.textContent = 'Dodaj do pokoju';
      }
    } else {
      button.style.opacity = '0';
      button.disabled = true;
      button.classList.add('listRooms__btn--add');
    }

    li.appendChild(indexItem);
    li.appendChild(image);
    li.appendChild(title);
    li.appendChild(button);

    fragment.appendChild(li);
  });

  listRooms.appendChild(fragment);
  addEventAddUser();
  removeUserEvent();
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

// Pagination
const changePageRoom = () => {
  const url = `/account/rooms?page=${pageRoom}`;

  fetch(url)
    .then((response) => response.json())
    .then((response) => {
      addRooms(response);
      addRoomPagination(response);
    });
};

const deleteActiveClassRoom = () => {
  const active = document.querySelector('.pagination__room--active');
  active.classList.remove('pagination__item--active');
  active.classList.remove('pagination__room--active');
};

const addActiveClassRoom = (target) => {
  target.classList.add('pagination__item--active');
};

const addEventRoomPagination = () => {
  const items = document.querySelectorAll('.pagination__room');

  [...items].map((item) => {
    item.addEventListener('click', (e) => {
      pageRoom = Number(e.target.textContent);

      if (items.length > 1) {
        deleteActiveClassRoom();
      }
      addActiveClassRoom(e.target);
      changePageRoom();
    });
  });
};

const addRoomPagination = (response) => {
  const pagination = document.createElement('ul');

  pagination.classList.add('pagination');

  for (let i = 0; i < response.totalPages; i++) {
    const li = document.createElement('li');
    if (i + 1 === pageRoom) {
      li.classList.add(
        'pagination__item',
        'pagination__item--active',
        'pagination__room',
        'pagination__room--active',
      );
    } else {
      li.classList.add('pagination__item', 'pagination__room');
    }

    li.textContent = i + 1;

    pagination.appendChild(li);
  }

  listRooms.appendChild(pagination);
  addEventRoomPagination();
};

switcherRoom.addEventListener('click', () => {
  pageRoom = 1;
  const url = `/account/rooms?page=${pageRoom}`;

  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.length === 0) {
        emptyMessageRooms();
      } else {
        addRooms(response);
        addRoomPagination(response);
      }
    });
});

titleRoom.addEventListener('input', validTitleRoom);
descriptionRoom.addEventListener('input', validDescriptionRoom);
priceRoom.addEventListener('input', validPriceRoom);
locationRoom.addEventListener('input', validLocationRoom);
fileError.addEventListener('input', validFileRoom);
form.addEventListener('submit', (e) => {
  e.preventDefault();

  submitForm();
});

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
