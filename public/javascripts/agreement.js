const agreementForm = document.querySelector('.addAgreement__form');
const nameAgreement = document.querySelectorAll('.addAgreement__input')[0];
const otherLogin = document.querySelectorAll('.addAgreement__input')[1];
const agreementFile = document.querySelector('.addAgreement__input--file');
const submitBtn = document.querySelector('.addAgreement__submit');
const switcher = document.querySelector('.listInfo__Agreements');
const listAgreement = document.querySelector('.listAgreements');
let validName = false;
let validLogin = false;
let pageAgreement = 1;

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

  p.textContent = 'Nie dodałeś ani nie jesteś dodany do żadnej umowy';
  p.style.width = '100%';
  p.style.textAlign = 'center';

  li.appendChild(p);
  listAgreement.appendChild(li);
};

const addAgreements = (response) => {
  const fragment = new DocumentFragment();
  listAgreement.textContent = '';

  response.data.forEach((item, index) => {
    const li = document.createElement('li');
    const name = document.createElement('p');
    const link = document.createElement('a');
    const nameFile = item.pathFile.split('/');

    li.classList.add('listAgreements__item');
    name.classList.add('listAgreements__name');
    link.classList.add('listAgreements__link');

    link.textContent = nameFile[nameFile.length - 1];

    link.href = item.pathFile;
    link.setAttribute('target', '_blank');

    name.appendChild(link);
    li.appendChild(name);
    fragment.appendChild(li);
  });

  listAgreement.appendChild(fragment);
};

const changePageAgreement = () => {
  const url = `/account/agreement?page=${pageAgreement}`;

  fetch(url)
    .then((response) => response.json())
    .then((response) => {
      addAgreements(response);
      addAgreementPagination(response);
    });
};

const deleteActiveClassAgreement = () => {
  const active = document.querySelector('.pagination__agreement--active');
  active.classList.remove('pagination__item--active');
  active.classList.remove('pagination__agreement--active');
};

const addActiveClassAgreement = (target) => {
  target.classList.add('pagination__item--active');
};

const addEventAgreementPaginationForm = () => {
  const items = document.querySelectorAll('.pagination__agreement');

  [...items].map((item) => {
    item.addEventListener('click', (e) => {
      pageAgreement = Number(e.target.textContent);

      if (items.length > 1) {
        deleteActiveClassAgreement();
      }
      addActiveClassAgreement(e.target);
      changePageAgreement();
    });
  });
};

const addAgreementPagination = (response) => {
  const pagination = document.createElement('ul');

  pagination.classList.add('pagination');

  for (let i = 0; i < response.totalPages; i++) {
    const li = document.createElement('li');
    if (i + 1 === pageAgreement) {
      li.classList.add(
        'pagination__item',
        'pagination__item--active',
        'pagination__agreement',
        'pagination__agreement--active',
      );
    } else {
      li.classList.add('pagination__item', 'pagination__agreement');
    }

    li.textContent = i + 1;

    pagination.appendChild(li);
  }

  listAgreement.appendChild(pagination);
  addEventAgreementPaginationForm();
};

const closePopUp = () => {
  const close = document.querySelector('.addAgreement__exit');

  const event = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true,
  });
  const cancelled = !close.dispatchEvent(event);
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
  pageAgreement = 1;
  const url = `/account/agreement?page=${pageAgreement}`;

  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.data.length === 0) {
        emptyMessageAgreement();
      } else {
        addAgreements(response);
        addAgreementPagination(response);
      }
    });
});

agreementForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const agreementFile = document.querySelector('.addAgreement__input--file');
  const nameFile = document.querySelectorAll('.addAgreement__input')[0].value;
  const login = document.querySelectorAll('.addAgreement__input')[1].value;

  const data = new FormData();

  data.append('file', agreementFile.files[0]);
  data.append('name', nameFile);
  data.append('login', login);

  fetch('/account/addAgreement', {
    method: 'POST',
    body: data,
  })
    .then((res) => res.json)
    .then((res) => {
      console.log(res);
      if (res) {
        closePopUp();
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
