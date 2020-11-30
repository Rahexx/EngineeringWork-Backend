const agreementForm = document.querySelector('.addAgreement__form');
const nameAgreement = document.querySelectorAll('.addAgreement__input')[0];
const otherLogin = document.querySelectorAll('.addAgreement__input')[1];
const agreementFile = document.querySelector('.addAgreement__input--file');
const submitBtn = document.querySelector('.addAgreement__submit');
const switcher = document.querySelector('.listInfo__Agreements');
const listAgreement = document.querySelector('.listAgreements');

let validName = false;
let validLogin = false;

const checkAllValid = () => {
  if (validName && validLogin) {
    if (agreementFile.value !== '') {
      submitBtn.disabled = false;
    }
  }
};

const validNameAgreement = () => {
  const nameError = document.querySelector('.addAgreement__errorName');
  if (nameAgreement.value === '') {
    nameError.style.opacity = '1';
    nameAgreement.style.border = '1px solid red';
    validName = false;
  } else {
    nameError.style.opacity = '0';
    nameAgreement.style.border = '1px solid #adadad';
    validName = true;
    checkAllValid();
  }
};

const emptyMessageAgreement = () => {
  const li = document.createElement('li');
  const p = document.createElement('p');
  listAgreement.textContent = '';

  li.classList.add('listAgreements__item');
  p.classList.add('listAgreements__date');

  p.textContent = 'Nie masz zgłoszonej żadnej płatności';
  p.style.width = '100%';
  p.style.textAlign = 'center';

  li.appendChild(p);
  listAgreement.appendChild(li);
};

const addAgreements = (response) => {
  const fragment = new DocumentFragment();
  listAgreement.textContent = '';

  response.forEach((item, index) => {
    console.log(item);
    const li = document.createElement('li');
    const indexItem = document.createElement('p');
    const name = document.createElement('p');
    const link = document.createElement('a');
    const nameFile = item.pathFile.split('/');

    li.classList.add('listAgreements__item');
    indexItem.classList.add('listAgreements__id');
    name.classList.add('listAgreements__name');
    link.classList.add('listAgreements__link');

    indexItem.textContent = index + 1;
    link.textContent = nameFile[nameFile.length - 1];

    link.href = item.pathFile;
    link.setAttribute('target', '_blank');

    li.appendChild(indexItem);
    name.appendChild(link);
    li.appendChild(name);
    fragment.appendChild(li);
  });

  listAgreement.appendChild(fragment);
};

nameAgreement.addEventListener('input', validNameAgreement);
otherLogin.addEventListener('input', () => {
  if (otherLogin.value) {
    checkUser(otherLogin.value)
      .then((response) => {
        const loginError = document.querySelector('.addAgreement__errorLogin');
        if (response != null) {
          validLogin = true;
          checkAllValid();
        } else {
          loginError.style.opacity = '0';
          otherLogin.style.border = '1px solid #adadad';
          validLogin = false;
        }
      })
      .catch((error) => console.log(error));
  } else {
    loginError.style.opacity = '1';
    otherLogin.style.border = '1px solid red';
  }
});

setInterval(() => {
  checkAllValid();
}, 500);

switcher.addEventListener('click', () => {
  const url = `/account/agreement`;

  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      if (response.length === 0) {
        emptyMessageAgreement();
      } else {
        addAgreements(response);
      }
    });
});
