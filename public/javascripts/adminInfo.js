const infoBtn = document.querySelectorAll('.adminPanel__button--details');
const infoName = document.querySelector('.popUp__detailsInfo--name');
const infoSurname = document.querySelector('.popUp__detailsInfo--surname');
const infoLogin = document.querySelector('.popUp__detailsInfo--login');
const infoPassword = document.querySelector('.popUp__detailsInfo--password');
const infoEmail = document.querySelector('.popUp__detailsInfo--email');
const infoPhone = document.querySelector('.popUp__detailsInfo--phone');
const infoDate = document.querySelector('.popUp__detailsInfo--date');
const infoSex = document.querySelector('.popUp__detailsInfo--sex');

function setInfoData(response) {
  infoName.textContent = response.name;
  infoSurname.textContent = response.surname;
  infoLogin.textContent = response.login;
  infoPassword.textContent = response.password;
  infoEmail.textContent = response.email;
  infoPhone.textContent = response.phone;
  infoDate.textContent = response.date.substr(0, 10);
  infoSex.textContent = response.sex;
}

[...infoBtn].map((item) => {
  item.addEventListener('click', () => {
    const parent = item.parentElement;
    const login = parent.dataset.login;

    const url = `/admin/info/${login}`;

    fetch(url, {
      method: 'get',
    })
      .then((response) => response.json())
      .then((response) => {
        setInfoData(response);
      });
  });
});
