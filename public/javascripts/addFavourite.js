const favourite = document.querySelectorAll('.searchRooms__heart');

const getId = (item) => {
  const parent = item.parentElement;
  const link = parent.children[0];
  const linkHref = link.href.split('/');
  const id = linkHref[linkHref.length - 1];

  return id;
};

const addFavourite = (item) => {
  const id = getId(item);

  const url = `/listRooms/addFavourite/${id}`;

  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((response) => {});
};

const deleteFavourite = (item) => {
  const id = getId(item);

  const url = `/listRooms/deleteFavourite/${id}`;

  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((response) => {});
};

const checkHearts = (response) => {
  const hearts = document.querySelectorAll('.searchRooms__heart');
  const roomIds = [];

  response.forEach((item) => {
    roomIds.push(item.roomId);
  });

  [...hearts].map((item) => {
    const id = getId(item);

    if (roomIds.includes(id)) {
      item.classList.remove('far');
      item.classList.add('fas');
    }
  });
};

[...favourite].map((item) => {
  item.addEventListener('click', () => {
    if (item.classList.contains('fas')) {
      addFavourite(item);
    } else {
      deleteFavourite(item);
    }
  });
});

setInterval(() => {
  const url = `/listRooms/showAll/yes`;

  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((response) => {
      checkHearts(response);
    });
}, 500);
