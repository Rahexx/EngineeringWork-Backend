const showFaults = document.querySelector('.listInfo__Faults');
const listFaults = document.querySelector('.listFaults');
const statusOptions = ['W trakcie', 'Naprawiono'];
const addFaultForm = document.querySelector('.addFault__form');

const sendNewStatus = (parentElement, status) => {
  const faultId = parentElement.dataset.id;
  const url = `/account/fault/${faultId}`;
  const data = {
    status,
  };

  fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
    });
};

const addEventStatusBtn = () => {
  const statusBtns = document.querySelectorAll('.listFaults__change');

  [...statusBtns].map((item) => {
    item.addEventListener('click', (e) => {
      const status = e.target.previousElementSibling;
      const indexItem = statusOptions.indexOf(status.textContent);
      if (indexItem === 0) {
        status.textContent = statusOptions[1];
        sendNewStatus(e.target.parentElement, statusOptions[1]);
      } else {
        status.textContent = statusOptions[0];
        sendNewStatus(e.target.parentElement, statusOptions[0]);
      }
    });
  });
};

const addFaults = (response) => {
  const fragment = new DocumentFragment();
  listFaults.textContent = '';

  response.forEach((item, index) => {
    const li = document.createElement('li');
    const indexItem = document.createElement('p');
    const description = document.createElement('p');
    const status = document.createElement('p');
    const changeStatusBtn = document.createElement('button');

    li.dataset.id = item._id;

    li.classList.add('listFaults__item');
    description.classList.add('listFaults__description');
    indexItem.classList.add('listFaults__id');
    status.classList.add('listFaults__status');
    changeStatusBtn.classList.add('listFaults__change');

    description.textContent = item.description;
    indexItem.textContent = index + 1;
    status.textContent = item.status;
    changeStatusBtn.textContent = 'Zmień status';

    li.appendChild(indexItem);
    li.appendChild(description);
    li.appendChild(status);
    li.appendChild(changeStatusBtn);
    fragment.appendChild(li);
  });

  listFaults.appendChild(fragment);
  addEventStatusBtn();
};

const emptyMessage = () => {
  const li = document.createElement('li');
  const p = document.createElement('p');
  listFaults.textContent = '';

  li.classList.add('listFaults__item');
  p.classList.add('listFaults__description');

  p.textContent = 'Nie masz żadnej zgłoszonej usterki';
  p.style.width = '100%';
  p.style.textAlign = 'center';

  li.appendChild(p);
  listFaults.appendChild(li);
};

const checkUser = async (login) => {
  const url = `/login/checkLogin/${login}`;

  const response = await fetch(url);

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    return Promise.reject(`Http error: ${response.status}`);
  }
};

const loginWrong = () => {
  const login = document.querySelectorAll('.addFault__input')[1];
  const error = document.querySelector('.addFault__error');

  login.style.border = '1px solid red';
  error.style.opacity = '1';
};

const closeFormFault = () => {
  const close = document.querySelector('.addFault__exit');

  const event = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true,
  });
  const cancelled = !close.dispatchEvent(event);
};

const clearInputsFault = () => {
  const description = document.querySelectorAll('.addFault__input')[0];
  const login = document.querySelectorAll('.addFault__input')[1];

  description.value = '';
  login.value = '';
};

const addNewFault = (description, login) => {
  const url = '/account/addFault/';

  const data = {
    description,
    login,
  };

  fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((response) => {});

  closeFormFault();
  clearInputsFault();
};

showFaults.addEventListener('click', () => {
  const url = `/account/fault`;

  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.length === 0) {
        emptyMessage();
      } else {
        addFaults(response);
      }
    });
});

addFaultForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const description = document.querySelectorAll('.addFault__input')[0].value;
  const login = document.querySelectorAll('.addFault__input')[1].value;

  checkUser(login)
    .then((response) => {
      if (response != null) {
        addNewFault(description, login);
      } else {
        loginWrong();
      }
    })
    .catch((error) => console.log(error));
});
