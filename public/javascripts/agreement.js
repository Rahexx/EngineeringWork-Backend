const agreementForm = document.querySelector('.addAgreement__form');
const nameAgreement = document.querySelectorAll('.addAgreement__input')[0];
const deadlineAgreemnt = document.querySelectorAll('.addAgreement__input')[1];
const otherLogin = document.querySelectorAll('.addAgreement__input')[2];
const agreementFile = document.querySelector('.addAgreement__input--file');
const submitBtn = document.querySelector('.addAgreement__submit');

let validName = false;
let validDeadline = false;
let validLogin = false;

const checkAllValid = () => {
  if (validName && validDeadline && validLogin) {
    console.log('Sprawdzam plik');
    if (agreementFile.value !== '') {
      console.log('Jestem i wysyłam');
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

const validDeadlineAgreement = () => {
  const deadlineError = document.querySelector('.addAgreement__errorDate');

  if (deadlineAgreemnt.value === '') {
    deadlineError.style.opacity = '1';
    deadlineAgreemnt.style.border = '1px solid red';
    validDeadline = false;
  } else {
    deadlineError.style.opacity = '0';
    deadlineAgreemnt.style.border = '1px solid #adadad';
    checkAllValid();
    validDeadline = true;
  }
};

nameAgreement.addEventListener('input', validNameAgreement);
deadlineAgreemnt.addEventListener('input', validDeadlineAgreement);
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
