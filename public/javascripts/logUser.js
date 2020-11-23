const submit = document.querySelector('.logHolder__submit');

const handleErros = () => {
  const errorNode = document.querySelector('.signHolder__error');

  errorNode.style.display = 'block';
};

const sendData = async (formData) => {
  const url = '/logIn';

  const data = {
    login: formData[0],
    password: formData[1],
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
      if (response.isLog) {
        window.location.href = '/';
      } else {
        handleErros();
      }
    });
};

const dowloadData = () => {
  const dataFormValue = [];
  const formValueLength = document.forms[0].length;

  for (let i = 0; i < formValueLength - 1; i++) {
    const item = document.forms[0][i];

    if (item.classList.contains('logHolder__input')) {
      dataFormValue.push(document.forms[0][i].value);
    }
  }
  return dataFormValue;
};

submit.addEventListener('click', (e) => {
  e.preventDefault();

  const formData = dowloadData();
  sendData(formData);
});
