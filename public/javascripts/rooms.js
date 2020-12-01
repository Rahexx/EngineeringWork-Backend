const switcherRoom = document.querySelector('.listInfo__switch--rooms');
const listRooms = document.querySelector('.listRooms');

const addRooms = (response) => {
  const { data } = response;
  const { currentUser } = response;
  console.log(currentUser);
  const fragment = new DocumentFragment();
  listRooms.textContent = '';

  data.forEach((item, index) => {
    const li = document.createElement('li');
    const indexItem = document.createElement('p');
    const image = document.createElement('img');
    const title = document.createElement('p');

    li.classList.add('listRooms__item');
    indexItem.classList.add('listRooms__id');
    image.classList.add('listRooms__image');
    title.classList.add('listRooms__login');

    li.dataset.id = item._id;
    image.setAttribute('src', item.pathImage);

    indexItem.textContent = index + 1;
    title.textContent = item.title;

    li.appendChild(indexItem);
    li.appendChild(image);
    li.appendChild(title);

    if (item.ownerId === currentUser) {
      const button = document.createElement('button');

      if (item.tenantId !== '') {
        button.classList.add('listRooms__btn--delete');
        button.textContent = 'Usuń z pokoju';
      } else {
        button.classList.add('listRooms__btn--add');
        button.textContent = 'Dodaj do pokoju';
      }

      li.appendChild(button);
    }
    fragment.appendChild(li);
  });

  listRooms.appendChild(fragment);
};

const emptyMessageRooms = () => {
  const li = document.createElement('li');
  const p = document.createElement('p');
  listRooms.textContent = '';

  li.classList.add('listRooms__item');
  p.classList.add('listRooms__login');
  p.style.lineHeight = '20px';

  p.textContent =
    'Nie dodałeś żadnego pokoju, ani nie jesteś przypisanego do żadnego pokoju';
  p.style.width = '100%';
  p.style.textAlign = 'center';

  li.appendChild(p);
  listRooms.appendChild(li);
};

switcherRoom.addEventListener('click', () => {
  const url = `/account/rooms`;

  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.length === 0) {
        emptyMessageRooms();
      } else {
        addRooms(response);
      }
    });
});
