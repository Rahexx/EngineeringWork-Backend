const showSeetlements = document.querySelector('.listInfo__Settlement');
const listSeetlements = document.querySelector('.listSettlements');

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

  response.forEach((item, index) => {
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

showSeetlements.addEventListener('click', (e) => {
  const url = `/account/settlement`;

  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.length === 0) {
        emptyMessageSettlement();
      } else {
        addSettlements(response);
      }
    });
});
