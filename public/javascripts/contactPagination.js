const listPages = document.querySelector('.pagination');
const items = document.querySelectorAll('.pagination__item');
const listContacts = document.querySelector('.userList');
let page = 1;

const addEventSend = () => {
  const otherUsers = document.querySelectorAll('.userList__item');

  [...otherUsers].map((item) => {
    item.addEventListener('click', (e) => {
      const listMessages = document.querySelector('.chat__messages');
      const allContacts = document.querySelectorAll('.userList__item');
      const width = document.body.offsetWidth;
      gsap.to('.chat', { x: width, duration: 1 });

      [...allContacts].map((item) => {
        item.style.color = '#bee9e8';
      });

      e.target.style.color = 'white';
      listMessages.textContent = '';
      currentReceiver = e.target.textContent;
      getConversation();
    });
  });
};

const changeItem = (response) => {
  const fragment = new DocumentFragment();
  const children = [...listContacts.children];

  for (let i = 0; i < children.length - 1; i++) {
    children[i].remove();
  }

  response.forEach((item) => {
    const li = document.createElement('li');

    li.classList.add('userList__item');
    li.textContent = item;

    fragment.appendChild(li);
  });

  listContacts.insertBefore(fragment, listPages);
  addEventSend();
};

const changePage = () => {
  const url = `/messages?page=${page}&isJson=true`;

  fetch(url)
    .then((response) => response.json())
    .then((response) => {
\      changeItem(response.logins);
    });
};

const deleteActiveClass = () => {
  const active = document.querySelector('.pagination__item--active');
  active.classList.remove('pagination__item--active');
};

const addActiveClass = (target) => {
  target.classList.add('pagination__item--active');
};

[...items].map((item) => {
  item.addEventListener('click', (e) => {
    page = Number(e.target.textContent);

    deleteActiveClass();
    addActiveClass(e.target);
    changePage();
  });
});
