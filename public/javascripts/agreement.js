const agreementForm = document.querySelector('.addAgreement__form');
const nameAgreement = document.querySelectorAll('.addAgreement__input')[0];
const otherLogin = document.querySelectorAll('.addAgreement__input')[1];
const agreementFile = document.querySelector('.addAgreement__input--file');
const submitBtn = document.querySelector('.addAgreement__submit');

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
