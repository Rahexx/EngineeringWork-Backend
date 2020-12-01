// Buttons in admin
const infoBtn = document.querySelectorAll('.adminPanel__button--details');
const editBtn = document.querySelectorAll('.adminPanel__button--edit');
const deleteBtn = document.querySelectorAll('.adminPanel__button--delete');
const submitEditBtn = document.querySelector('.submitEdit');

// elements to change value when it's necessary
const infoName = document.querySelector('.popUp__detailsInfo--name');
const infoSurname = document.querySelector('.popUp__detailsInfo--surname');
const infoLogin = document.querySelector('.popUp__detailsInfo--login');
const infoPassword = document.querySelector('.popUp__detailsInfo--password');
const infoEmail = document.querySelector('.popUp__detailsInfo--email');
const infoPhone = document.querySelector('.popUp__detailsInfo--phone');
const infoDate = document.querySelector('.popUp__detailsInfo--date');
const infoSex = document.querySelector('.popUp__detailsInfo--sex');
const editName = document.querySelector('.input--name');
const editLogin = document.querySelector('.input--login');
const editSurname = document.querySelector('.input--surname');
const editEmail = document.querySelector('.input--email');
const editPhone = document.querySelector('.input--phone');
let editId = 0;
let editParent = '';

const setInfoData = (response) => {
  infoName.textContent = response.name;
  infoSurname.textContent = response.surname;
  infoLogin.textContent = response.login;
  infoPassword.textContent = response.password;
  infoEmail.textContent = response.email;
  infoPhone.textContent = response.phone;
  infoDate.textContent = response.date.substr(0, 10);
  infoSex.textContent = response.sex;
};

const setEditData = (response) => {
  editName.value = response.name;
  editSurname.value = response.surname;
  editLogin.value = response.login;
  editEmail.value = response.email;
  editPhone.value = response.phone;
};

const deleteItem = (item) => {
  item.remove();
};

const dowloadEditData = () => {
  const dataFormValue = [];
  const formValueLength = document.forms[1].length;

  for (let i = 0; i < formValueLength; i++) {
    const item = document.forms[1][i];

    if (item.classList.contains('signHolder__input')) {
      dataFormValue.push(document.forms[1][i].value);
    }
  }
  return dataFormValue;
};

const updateItem = (response) => {
  for (let i = 0; i < editParent.children.length; i++) {
    if (i > 3) {
      break;
    }

    switch (i) {
      case 0:
        editParent.children[0].children[0].textContent = response.login;
        break;
      case 1:
        editParent.children[1].children[0].textContent = response.email;
        break;
      case 2:
        editParent.children[2].children[0].textContent = response.name;
        break;
      case 3:
        editParent.children[3].children[0].textContent = response.surname;
        break;
    }
  }
};

const closeEditPopUp = () => {
  const burgerEdit = document.querySelector('.burger--edit');

  const event = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true,
  });
  const cancelled = !burgerEdit.dispatchEvent(event);
};

const sendUpdateData = async (formData) => {
  const url = `/admin/update/${editId}`;

  const data = {
    name: formData[1],
    surname: formData[2],
    email: formData[3],
    phone: formData[4],
    login: formData[0],
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
      if (response.isUpdate) {
        closeEditPopUp();
        updateItem(response);
      }
    });
};

const searchFormData = () => {
  const dataFormValue = [];
  const searchLogin = document.forms[0].children[0];

  return searchLogin.value;
};

const showSearchUser = (response) => {
  const userList = document.querySelector('.adminPanel__listUser');
  const itemsUserList = userList.children;
  const loginsResponse = [];

  response.forEach((item) => {
    loginsResponse.push(item.login);
  });

  [...itemsUserList].map((item, index) => {
    const child = itemsUserList[index].children[0];
    const loginText = child.children[0].textContent;

    if (loginsResponse.includes(loginText)) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
};

[...infoBtn].map((item) => {
  item.addEventListener('click', () => {
    const parent = item.parentElement;
    const id = parent.dataset.id;

    const url = `/admin/info/${id}`;

    fetch(url, {
      method: 'get',
    })
      .then((response) => response.json())
      .then((response) => {
        setInfoData(response);
      });
  });
});

[...deleteBtn].map((item) => {
  item.addEventListener('click', () => {
    const parent = item.parentElement;
    const id = parent.dataset.id;

    const url = `/admin/delete/${id}`;

    fetch(url, {
      method: 'get',
    })
      .then((response) => response.json())
      .then((response) => {
        deleteItem(parent);
      });
  });
});

[...editBtn].map((item) => {
  item.addEventListener('click', () => {
    const parent = item.parentElement;
    const id = parent.dataset.id;
    editId = id;
    editParent = parent;

    const url = `/admin/edit/${id}`;

    fetch(url, {
      method: 'get',
    })
      .then((response) => response.json())
      .then((response) => {
        setEditData(response);
      });
  });
});

submitEditBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const formData = dowloadEditData();
  sendUpdateData(formData);
});


