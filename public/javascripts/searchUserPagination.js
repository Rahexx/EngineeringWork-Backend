const listPages = document.querySelector('.pagination');
const items = document.querySelectorAll('.pagination__item');
const listUsers = document.querySelector('.users__list');
const submitForm = document.querySelector('.users__searchForm');
let page = 1;
let formLogin = '';

const changeItem = (response) => {
  const fragment = new DocumentFragment();
  const children = [...listUsers.children];

  for (let i = 0; i < children.length - 1; i++) {
    children[i].remove();
  }

  response.forEach((item) => {
    const li = document.createElement('li');
    const login = document.createElement('p');
    const a = document.createElement('a');
    const i = document.createElement('i');

    li.classList.add('users__item');
    login.classList.add('users__login');
    a.classList.add('users__link');
    i.classList.add('fas', 'fa-arrow-right');

    a.setAttribute('href', `/searchUsers/profile/${item._id}`);

    login.textContent = item.login;

    a.appendChild(i);
    li.appendChild(login);
    li.appendChild(a);
    fragment.appendChild(li);
  });

  listUsers.insertBefore(fragment, listPages);
};

const changePage = () => {
  const url = `/searchUsers?page=${page}&isJson=true`;

  fetch(url)
    .then((response) => response.json())
    .then((response) => {
      changeItem(response.data);
    });
};

const changePageForm = () => {
  const url = `/searchUsers/searchLogin?page=${page}&login=${formLogin}&isJson=true`;

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

const addEventPaginationForm = () => {
  const items = document.querySelectorAll('.pagination__item');

  [...items].map((item) => {
    item.addEventListener('click', (e) => {
      page = Number(e.target.textContent);

      if (items.length > 1) {
        deleteActiveClass();
      }
      addActiveClass(e.target);
      changePageForm();
    });
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

submitForm.addEventListener('submit', (e) => {
  e.preventDefault();

  page = 1;
  const login = submitForm.children[0].value;
  formLogin = login;
  const url = `/searchUsers/searchLogin?page=${page}&login=${login}&isJson=true`;

  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((response) => {
      changeItem(response.data);
      const fragment = new DocumentFragment();
      listPages.textContent = '';
      for (let i = 0; i < response.totalPages; i++) {
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
});
