const showSeetlements = document.querySelector('.listInfo__Settlement');
const listSeetlements = document.querySelector('.listSettlements');
const addSettlementForm = document.querySelector('.addSettlement__form');
let pageSettlement = 1;

const closeFormSettlement = () => {
  const close = document.querySelector('.addSettlement__exit');

  const event = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true,
  });
  const cancelled = !close.dispatchEvent(event);
};

const clearInputsSettlement = () => {
  const cost = document.querySelectorAll('.addSettlement__input')[0];
  const date = document.querySelectorAll('.addSettlement__input')[1];
  const login = document.querySelectorAll('.addSettlement__input')[2];

  cost.value = '';
  date.value = '';
  login.value = '';
};

const sendNewSettlement = (cost, date, login) => {
  const url = '/account/addSettlement/';

  const data = {
    cost,
    date,
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

  closeFormSettlement();
  clearInputsSettlement();
};

const closeList = (item, isRotate = true) => {
  item.parentElement.children[1].dataset.switch = 'false';
  const parent = item.parentElement;
  const tl = gsap.timeline();

  if (isRotate) {
    tl.to(parent, {
      height: '8vh',
      duration: 1,
    }).to(item, { rotate: 360, duration: 0.3 });
  } else {
    gsap.to(parent, {
      height: '8vh',
      duration: 1,
    });
  }
};

const deleteSettlement = (parentElement) => {
  const settlementId = parentElement.parentElement.dataset.id;
  const url = `/account/settlement/delete/${settlementId}`;

  fetch(url)
    .then((response) => response.json())
    .then((response) => {});
};

const removeItem = (e) => {
  const parent = e.target.parentElement.parentElement;
  const pageWidth = document.body.offsetWidth;
  parent.style.minHeight = '0';
  const tl = gsap.timeline();

  tl.to(parent, { x: pageWidth, duration: 1 })
    .to(parent, {
      height: 0,
      margin: 0,
      padding: 0,
      duration: 0.5,
    })
    .to(parent, { display: 'none' });

  setTimeout(() => {
    closeList(parent.parentElement, false);
  }, 1500);

  setTimeout(() => {
    parent.remove();
  }, 1500);
};

const addEventDeleteBtn = () => {
  const deleteBtns = document.querySelectorAll('.listSettlements__delete');

  [...deleteBtns].map((item) => {
    item.addEventListener('click', (e) => {
      deleteSettlement(e.target.parentElement);
      removeItem(e);
    });
  });
};

const emptyMessageSettlement = () => {
  const li = document.createElement('li');
  const p = document.createElement('p');
  listSeetlements.textContent = '';

  li.classList.add('listSettlements__item');
  p.classList.add('listSettlements__deadline');

  p.textContent = 'Nie masz zgłoszonej żadnej płatności';
  p.style.width = '100%';
  p.style.textAlign = 'center';

  li.appendChild(p);
  listSeetlements.appendChild(li);
};

const addSettlements = (response) => {
  const fragment = new DocumentFragment();
  listSeetlements.textContent = '';

  response.data.forEach((item, index) => {
    const date = new Date(item.date);
    const li = document.createElement('li');
    const indexItem = document.createElement('p');
    const cost = document.createElement('p');
    const deadline = document.createElement('p');
    const tenantLogin = document.createElement('p');
    const ownerLogin = document.createElement('p');
    const deleteButton = document.createElement('p');
    const deleteIcon = document.createElement('i');

    li.dataset.id = item._id;

    li.classList.add('listSettlements__item');
    indexItem.classList.add('listSettlements__id');
    cost.classList.add('listSettlements__cost');
    deadline.classList.add('listSettlements__deadline');
    tenantLogin.classList.add('listSettlements__login');
    ownerLogin.classList.add(
      'listSettlements__login',
      'listSettlements__login--owner',
    );
    deleteButton.classList.add('listSettlements__delete');
    deleteIcon.classList.add('fas', 'fa-times-circle');

    indexItem.textContent = index + 1;
    cost.textContent = item.price;
    deadline.textContent = `${
      date.getDay() < 10 ? `0${date.getDay()}` : date.getDay()
    }-${date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth()}-${
      date.getFullYear() < 10 ? `0${date.getFullYear()}` : date.getFullYear()
    }`;
    tenantLogin.textContent = item.tenantLogin;
    ownerLogin.textContent = item.ownerLogin;

    deleteButton.appendChild(deleteIcon);
    li.appendChild(indexItem);
    li.appendChild(cost);
    li.appendChild(deadline);
    li.appendChild(tenantLogin);
    li.appendChild(ownerLogin);
    li.appendChild(deleteButton);

    fragment.appendChild(li);
  });

  listSeetlements.appendChild(fragment);
  addEventDeleteBtn();
};

const changePageSettlement = () => {
  const url = `/account/settlement?page=${pageSettlement}`;

  fetch(url)
    .then((response) => response.json())
    .then((response) => {
      addSettlements(response);
      addSettlementPagination(response);
    });
};

const deleteActiveClassSettlement = () => {
  const active = document.querySelector('.pagination__settlement--active');
  active.classList.remove('pagination__item--active');
  active.classList.remove('pagination__settlement--active');
};

const addActiveClassSettlement = (target) => {
  target.classList.add('pagination__item--active');
};

const addEventSettlementPagination = () => {
  const items = document.querySelectorAll('.pagination__settlement');

  [...items].map((item) => {
    item.addEventListener('click', (e) => {
      pageSettlement = Number(e.target.textContent);

      if (items.length > 1) {
        deleteActiveClassSettlement();
      }
      addActiveClassSettlement(e.target);
      changePageSettlement();
    });
  });
};

const addSettlementPagination = (response) => {
  const pagination = document.createElement('ul');

  pagination.classList.add('pagination');

  for (let i = 0; i < response.totalPages; i++) {
    const li = document.createElement('li');
    if (i + 1 === pageSettlement) {
      li.classList.add(
        'pagination__item',
        'pagination__item--active',
        'pagination__settlement',
        'pagination__settlement--active',
      );
    } else {
      li.classList.add('pagination__item', 'pagination__settlement');
    }

    li.textContent = i + 1;

    pagination.appendChild(li);
  }

  listSeetlements.appendChild(pagination);
  addEventSettlementPagination();
};

showSeetlements.addEventListener('click', (e) => {
  pageSettlement = 1;
  const url = `/account/settlement?page=${pageSettlement}`;

  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.data.length === 0) {
        emptyMessageSettlement();
      } else {
        addSettlements(response);
        addSettlementPagination(response);
      }
    });
});

addSettlementForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const cost = document.querySelectorAll('.addSettlement__input')[0];
  const date = document.querySelectorAll('.addSettlement__input')[1];
  const login = document.querySelectorAll('.addSettlement__input')[2];
  let costValid = false;
  let dateValid = false;

  if (!cost.value) {
    const error = document.querySelectorAll('.addSettlement__error')[0];

    cost.style.border = '1px solid red';
    error.style.opacity = '1';

    costValid = false;
  } else {
    const error = document.querySelectorAll('.addSettlement__error')[1];

    cost.style.border = '1px solid #adadad';
    error.style.opacity = '0';

    costValid = true;
  }

  if (!date.value) {
    const error = document.querySelectorAll('.addSettlement__error')[1];

    date.style.border = '1px solid red';
    error.style.opacity = '1';

    dateValid = false;
  } else {
    const error = document.querySelectorAll('.addSettlement__error')[1];

    date.style.border = '1px solid #adadad';
    error.style.opacity = '0';

    dateValid = true;
  }

  if (login.value) {
    checkUser(login.value)
      .then((response) => {
        const login = document.querySelectorAll('.addSettlement__input')[2];
        const error = document.querySelectorAll('.addSettlement__error')[2];
        if (response != null) {
          login.style.border = '1px solid #adadad';
          error.style.opacity = '0';

          if (costValid && dateValid) {
            sendNewSettlement(cost.value, date.value, login.value);
          }
        } else {
          loginWrong(login, error);
        }
      })
      .catch((error) => console.log(error));
  } else {
    const login = document.querySelectorAll('.addSettlement__input')[2];
    const error = document.querySelectorAll('.addSettlement__error')[2];

    loginWrong(login, error);
  }
});
