const listPages = document.querySelector('.pagination');
const items = document.querySelectorAll('.pagination__item');
const listRooms = document.querySelector('.searchRooms__list');
const submitBtn = document.querySelector('.searchRooms__submit');
let page = 1;
let locationForm = '';
let priceFrom = '';
let priceTo = '';

const changeHeart = (item) => {
  if (item.classList.contains('far')) {
    item.classList.remove('far');
    item.classList.add('fas');
  } else {
    item.classList.add('far');
    item.classList.remove('fas');
  }
};

const addHeartsEvent = () => {
  const hearts = document.querySelectorAll('.searchRooms__heart');

  [...hearts].map((item) => {
    item.addEventListener('click', () => {
      changeHeart(item);
      if (item.classList.contains('fas')) {
        addFavourite(item);
      } else {
        deleteFavourite(item);
      }
    });
  });
};

const changeItem = (response) => {
  const data = response.data;
  const role = response.role;
  const fragment = new DocumentFragment();
  const children = [...listRooms.children];

  for (let i = 0; i < children.length - 1; i++) {
    children[i].remove();
  }

  data.forEach((item) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    const img = document.createElement('img');
    const textHolder = document.createElement('div');
    const title = document.createElement('h3');
    const titleLink = document.createElement('a');
    const description = document.createElement('p');
    const price = document.createElement('p');
    const location = document.createElement('p');

    li.classList.add('mainInfo__roomItem', 'mainInfo__roomItem--item');
    a.classList.add('searchRooms__link');
    img.classList.add('mainInfo__ImagesRoom', 'mainInfo__ImagesRoom--rooms');
    textHolder.classList.add('mainInfo__textHolder');
    title.classList.add('mainInfo__roomTitle');
    titleLink.classList.add('searchRooms__link', 'searchRooms__link--header');
    description.classList.add('mainInfo__roomDescritpion');
    price.classList.add('mainInfo__price');
    location.classList.add('mainInfo__location');

    a.setAttribute('href', `/listRooms/${item._id}`);
    titleLink.setAttribute('href', `/listRooms/${item._id}`);
    img.setAttribute('src', item.pathImage);

    titleLink.textContent = item.title;
    description.textContent = item.description;
    price.textContent = `${item.price}zł / miesiąc`;
    location.textContent = item.location;

    title.appendChild(titleLink);
    textHolder.appendChild(title);
    textHolder.appendChild(description);
    textHolder.appendChild(price);
    textHolder.appendChild(location);
    a.appendChild(img);
    li.appendChild(a);
    li.appendChild(textHolder);

    if (role) {
      const i = document.createElement('i');
      i.classList.add('far', 'fa-heart', 'searchRooms__heart');
      li.appendChild(i);
    }
    fragment.appendChild(li);
  });

  listRooms.insertBefore(fragment, listPages);
  addHeartsEvent();
};

const changePage = () => {
  const url = `/listRooms?page=${page}&isJson=true`;

  fetch(url)
    .then((response) => response.json())
    .then((response) => {
      changeItem(response);
    });
};

const deleteActiveClass = () => {
  const active = document.querySelector('.pagination__item--active');
  active.classList.remove('pagination__item--active');
};

const addActiveClass = (target) => {
  target.classList.add('pagination__item--active');
};

const searchFormData = () => {
  const dataFormValue = [];
  const formValueLength = document.forms[0].length;

  for (let i = 0; i < formValueLength; i++) {
    const item = document.forms[0][i];

    if (item.classList.contains('searchRooms__input')) {
      dataFormValue.push(document.forms[0][i].value);
    }
  }
  return dataFormValue;
};

const changePageForm = () => {
  const url = `/listRooms?location=${locationForm}&priceFrom=${priceFrom}&priceTo=${priceTo}&page=${page}`;

  fetch(url)
    .then((response) => response.json())
    .then((response) => {
      changeItem(response);
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
      changePageForm();
    });
  });
};

const getSearchRooms = (searchParams) => {
  const data = {
    location: searchParams[0],
    priceFrom: searchParams[1],
    priceTo: searchParams[2],
  };
  locationForm = data.location;
  priceFrom = data.priceFrom;
  priceTo = data.priceTo;
  page = 1;

  const url = `/listRooms?location=${data.location}&priceFrom=${data.priceFrom}&priceTo=${data.priceTo}&page=${page}`;

  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((response) => {
      changeItem(response);
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
    })
    .catch((err) => console.log(err));
};

[...items].map((item) => {
  item.addEventListener('click', (e) => {
    page = Number(e.target.textContent);

    deleteActiveClass();
    addActiveClass(e.target);
    changePage();
  });
});

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const searchParams = searchFormData();
  getSearchRooms(searchParams);
});
