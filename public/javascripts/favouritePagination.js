const listPages = document.querySelector('.pagination');
const items = document.querySelectorAll('.pagination__item');
const listFavourites = document.querySelector('.favourites__list');
let page = 1;

const addEventHeart = () => {
  const hearts = document.querySelectorAll('.favourites__heart');

  [...hearts].map((item) => {
    item.addEventListener('click', (e) => {
      deleteHeart(item);
      const parent = e.target.parentNode;
      const pageWidth = document.body.offsetWidth;
      const brother = parent.nextSibling;

      const tl = gsap.timeline();
      tl.to(parent, { x: pageWidth, duration: 1 })
        .to(parent, {
          height: 0,
          margin: 0,
          padding: 0,
          duration: 0.5,
        })
        .to(brother, { marginTop: 0, duration: 0.5 });
    });
  });
};

const changeItem = (response) => {
  const fragment = new DocumentFragment();
  const children = [...listFavourites.children];

  for (let i = 0; i < children.length - 1; i++) {
    children[i].remove();
  }

  response.forEach((item) => {
    const li = document.createElement('li');
    const title = document.createElement('h2');
    const description = document.createElement('p');
    const comeTo = document.createElement('p');
    const link = document.createElement('a');
    const i = document.createElement('i');

    li.classList.add('favourites__item');
    title.classList.add('favourites__title');
    description.classList.add('favourites__description');
    comeTo.classList.add('favourites__comeTo');
    link.classList.add('favourites__link');
    i.classList.add('fas', 'fa-heart', 'favourites__heart');

    li.dataset.id = item._id;

    link.setAttribute('href', `/listRooms/${item._id}`);

    title.textContent = item.title;
    description.textContent = item.description;
    comeTo.textContent = 'Aby przejść do pokoju kliknij';
    link.text = 'Tutaj';

    comeTo.appendChild(link);
    li.appendChild(title);
    li.appendChild(description);
    li.appendChild(comeTo);
    li.appendChild(i);
    fragment.appendChild(li);
  });

  listFavourites.insertBefore(fragment, listPages);
  addEventHeart();
};

const changePage = () => {
  const url = `/favourites?page=${page}&isJson=true`;

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

[...items].map((item) => {
  item.addEventListener('click', (e) => {
    page = Number(e.target.textContent);

    deleteActiveClass();
    addActiveClass(e.target);
    changePage();
  });
});
