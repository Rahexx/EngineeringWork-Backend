const submit = document.querySelector('.signHolder__button--submit');
let degree = 10;

const cleanErrors = () => {
  const listErrorsNode = document.querySelectorAll('.signHolder__error');

  [...listErrorsNode].map((item) => {
    item.style.display = 'none';
  });
};

const handleErros = (response) => {
  const listErrorsNode = document.querySelectorAll('.signHolder__error');
  const spinner = document.querySelector('.spinner');
  spinner.remove();
  submit.style.opacity = '1';

  if (!response.name) {
    listErrorsNode[0].style.display = 'block';
  }
  if (!response.surname) {
    listErrorsNode[1].style.display = 'block';
  }
  if (!response.email) {
    listErrorsNode[2].style.display = 'block';
  }
  if (!response.phone) {
    listErrorsNode[3].style.display = 'block';
  }
  if (!response.date) {
    listErrorsNode[4].style.display = 'block';
  }
  if (!response.login) {
    listErrorsNode[5].style.display = 'block';
  }
  if (!response.password) {
    listErrorsNode[6].style.display = 'block';
  }
};

const dowloadData = () => {
  const dataFormValue = [];
  const formValueLenght = document.forms[0].length;

  for (let i = 0; i < formValueLenght; i++) {
    const item = document.forms[0][i];

    if (
      item.classList.contains('signHolder__input') ||
      item.classList.contains('signHolder__select')
    ) {
      dataFormValue.push(document.forms[0][i].value);
    }
  }
  return dataFormValue;
};

const sendData = async (formData) => {
  const url = '/signUp';

  const data = {
    name: formData[0],
    surname: formData[1],
    email: formData[2],
    phone: formData[3],
    date: formData[4],
    sex: formData[5],
    login: formData[6],
    password: formData[7],
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
      if (response.isAdd) {
        window.location.href = '/logIn';
      } else {
        handleErros(response);
      }
    });
};

const spinSpinner = () => {
  const spinner = document.querySelector('.spinner');

  setInterval(() => {
    if (degree >= 360) {
      degree = 0;
    }

    spinner.style.transform = `translate(-50%, -125%) rotate(${degree}deg)`;
    degree += 10;
  }, 40);
};

const createSpinner = () => {
  const spinner = document.createElement('i');

  spinner.classList.add('fas', 'fa-spinner', 'spinner');

  spinner.style.position = 'absolute';
  spinner.style.top = '50%';
  spinner.style.left = '65%';
  spinner.style.fontSize = '26px';
  spinner.style.transform = 'translate(-50%, -125%)';
  spinner.style.color = '#62b6cb';

  return spinner;
};

const showLoadIcon = () => {
  submit.style.opacity = '0';

  const spinner = createSpinner();

  submit.parentNode.insertBefore(spinner, submit);
  spinSpinner();
};

submit.addEventListener('click', (e) => {
  e.preventDefault();

  cleanErrors();
  showLoadIcon();
  const formData = dowloadData();
  sendData(formData);
});
