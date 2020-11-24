const infoBtn = document.querySelectorAll('.adminPanel__button--details');
const deleteBtn = document.querySelectorAll('.adminPanel__button--delete');
const infoName = document.querySelector('.popUp__detailsInfo--name');
const infoSurname = document.querySelector('.popUp__detailsInfo--surname');
const infoLogin = document.querySelector('.popUp__detailsInfo--login');
const infoPassword = document.querySelector('.popUp__detailsInfo--password');
const infoEmail = document.querySelector('.popUp__detailsInfo--email');
const infoPhone = document.querySelector('.popUp__detailsInfo--phone');
const infoDate = document.querySelector('.popUp__detailsInfo--date');
const infoSex = document.querySelector('.popUp__detailsInfo--sex');

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

const deleteItem = (item) => {
  item.remove();
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
