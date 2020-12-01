const listUsers = document.querySelector('.adminPanel__listUser');
const listPages = document.querySelector('.pagination');
const items = document.querySelectorAll('.pagination__item');
const detailsInfo = document.querySelector('.popUp--details');
const detailsBurger = document.querySelector('.burger--details');
const editInfo = document.querySelector('.popUp--edit');
const editBurger = document.querySelector('.burger--edit');
const searchForm = document.querySelector('.adminPanel__searchForm');
let login = '';
let page = 1;

const closeDetails = () => {
  detailsBurger.removeEventListener('click', closeDetails);
  gsap.to('.popUp--details', { left: '-100vw', duration: 1 });
  detailsBurger.style.display = 'none';
};

const closeEdit = () => {
  editInfo.removeEventListener('click', closeDetails);
  gsap.to('.popUp--edit', { left: '-100vw', duration: 1 });
  editBurger.style.display = 'none';
};

const showDetails = () => {
  const pageWidth = document.body.offsetWidth;
  detailsInfo.style.display = 'block';

  if (pageWidth < 1024) {
    gsap.to('.popUp--details', { left: 0, duration: 1 });
  } else {
    gsap.to('.popUp--details', { left: pageWidth / 2, duration: 1 });
  }

  setTimeout(() => {
    detailsBurger.style.display = 'flex';
    detailsBurger.addEventListener('click', closeDetails);
  }, 900);
};

const showEditForm = () => {
  const pageWidth = document.body.offsetWidth;
  editInfo.style.display = 'block';

  if (pageWidth < 1024) {
    gsap.to('.popUp--edit', { left: 0, duration: 1 });
  } else {
    gsap.to('.popUp--edit', { left: pageWidth / 2, duration: 1 });
  }

  setTimeout(() => {
    editBurger.style.display = 'flex';
    editBurger.addEventListener('click', closeEdit);
  }, 900);
};

const addInfoEvent = () => {
  const infoBtns = document.querySelectorAll('.adminPanel__button--details');

  [...infoBtns].map((item) => {
    item.addEventListener('click', () => {
      showDetails();
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
};

const addEditEvent = () => {
  const editBtns = document.querySelectorAll('.adminPanel__button--edit');

  [...editBtns].map((item) => {
    item.addEventListener('click', () => {
      showEditForm();

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
};

const addRemoveEvent = () => {
  const deleteBtns = document.querySelectorAll('.adminPanel__button--delete');

  [...deleteBtns].map((item) => {
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
};

const changeItem = (response) => {
  const fragment = new DocumentFragment();
  const children = [...listUsers.children];

  for (let i = 0; i < children.length - 1; i++) {
    children[i].remove();
  }

  response.forEach((item) => {
    const li = document.createElement('li');
    const login = document.createElement('p');
    const email = document.createElement('p');
    const name = document.createElement('p');
    const surname = document.createElement('p');
    const loginSpan = document.createElement('span');
    const emailSpan = document.createElement('span');
    const nameSpan = document.createElement('span');
    const surnameSpan = document.createElement('span');
    const detailsBtn = document.createElement('button');
    const editBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');

    li.classList.add('adminPanel__listItem');
    login.classList.add('adminPanel__info');
    email.classList.add('adminPanel__info');
    name.classList.add('adminPanel__info');
    surname.classList.add('adminPanel__info');
    loginSpan.classList.add('adminPanel__login');
    emailSpan.classList.add('adminPanel__email');
    nameSpan.classList.add('adminPanel__name');
    surnameSpan.classList.add('adminPanel__surname');
    detailsBtn.classList.add(
      'adminPanel__button',
      'adminPanel__button--details',
    );
    editBtn.classList.add('adminPanel__button', 'adminPanel__button--edit');
    deleteBtn.classList.add('adminPanel__button', 'adminPanel__button--delete');

    li.dataset.id = item._id;

    login.textContent = 'Login:';
    email.textContent = 'Email:';
    name.textContent = 'Imię:';
    surname.textContent = 'Nazwisko:';
    detailsBtn.textContent = 'Szczegóły';
    editBtn.textContent = 'Edytuj';
    deleteBtn.textContent = 'Usuń';
    loginSpan.textContent = item.login;
    emailSpan.textContent = item.email;
    nameSpan.textContent = item.name;
    surnameSpan.textContent = item.surname;

    login.appendChild(loginSpan);
    email.appendChild(emailSpan);
    name.appendChild(nameSpan);
    surname.appendChild(surnameSpan);
    li.appendChild(login);
    li.appendChild(email);
    li.appendChild(name);
    li.appendChild(surname);
    li.appendChild(detailsBtn);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    fragment.appendChild(li);
  });

  listUsers.insertBefore(fragment, listPages);
  addInfoEvent();
  addEditEvent();
  addRemoveEvent();
};

const changePage = () => {
  const url = `/admin?page=${page}&isJson=true`;

  fetch(url)
    .then((response) => response.json())
    .then((response) => {
      changeItem(response.data);
    });
};

const deleteActiveClass = () => {
  const active = document.querySelector('.pagination__item--active');
  active.classList.remove('pagination__item--active');
};

const addActiveClass = (target) => {
  target.classList.add('pagination__item--active');
};

const changePageForm = () => {
  const url = `/admin/searchUser?page=${page}&login=${login}`;

  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((response) => {
      changeItem(response.data);
    });
};

const addEventPaginationForm = () => {
  const items = document.querySelectorAll('.pagination__item');

  [...items].map((item) => {
    item.addEventListener('click', (e) => {
      page = Number(e.target.textContent);

      if (items.length > 1) {
        deleteActiveClass();
      }
      addActiveClass(e.target);
      changePage();
    });
  });
};

const getSearchUser = (login) => {
  page = 1;
  const url = `/admin/searchUser?page=${page}&login=${login}`;

  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((response) => {
      changeItem(response.data);
      const fragment = new DocumentFragment();
      listPages.textContent = '';

      for (let i = 0; i < response.totalPages - 1; i++) {
        const li = document.createElement('li');
        if (i + 1 === page) {
          li.classList.add('pagination__item', 'pagination__item--active');
        } else {
          li.classList.add('pagination__item');
        }

        li.textContent = i + 1;

        fragment.appendChild(li);
      }

      listPages.appendChild(fragment);
      addEventPaginationForm();
    });
};

[...items].map((item) => {
  item.addEventListener('click', (e) => {
    page = Number(e.target.textContent);

    deleteActiveClass();
    addActiveClass(e.target);
    changePage();
  });
});

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchLogin = searchFormData();
  login = searchLogin;
  getSearchUser(searchLogin);
});
