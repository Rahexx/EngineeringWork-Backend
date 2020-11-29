const showFaults = document.querySelector('.listInfo__Faults');
const listFaults = document.querySelector('.listFaults');

const emptyMessage = () => {
  const li = document.createElement('li');
  const p = document.createElement('p');
  listFaults.textContent = '';

  li.classList.add('listFaults__item');
  p.classList.add('listFaults__description');

  p.textContent = 'Nie masz żadnej zgłoszonej usterki';
  p.style.width = '100%';
  p.style.textAlign = 'center';

  li.appendChild(p);
  listFaults.appendChild(li);
};

const addFaults = (response) => {
  const fragment = new DocumentFragment();
  listFaults.textContent = '';

  response.forEach((item, index) => {
    const li = document.createElement('li');
    const indexItem = document.createElement('p');
    const description = document.createElement('p');
    const status = document.createElement('p');
    const changeStatusBtn = document.createElement('button');

    li.classList.add('listFaults__item');
    description.classList.add('listFaults__description');
    indexItem.classList.add('listFaults__id');
    status.classList.add('listFaults__status');
    changeStatusBtn.classList.add('listFaults__change');

    description.textContent = item.description;
    indexItem.textContent = index + 1;
    status.textContent = item.status;
    changeStatusBtn.textContent = 'Zmień status';

    li.appendChild(indexItem);
    li.appendChild(description);
    li.appendChild(status);
    li.appendChild(changeStatusBtn);
    fragment.appendChild(li);
  });

  listFaults.appendChild(fragment);
};

showFaults.addEventListener('click', () => {
  const url = `/account/fault`;

  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.length === 0) {
        emptyMessage();
      } else {
        addFaults(response);
      }
    });
});
