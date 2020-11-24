const favourite = document.querySelectorAll('.searchRooms__heart');

const addFavourite = (item) => {
  const parent = item.parentElement;
  const link = parent.children[0];
  const linkHref = link.href.split('/');
  const id = linkHref[linkHref.length - 1];

  const url = `/listRooms/addFavourite/${id}`;

  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
    });
};

const deleteFavourite = (item) => {
  const parent = item.parentElement;
  const link = parent.children[0];
  const linkHref = link.href.split('/');
  const id = linkHref[linkHref.length - 1];

  const url = `/listRooms/deleteFavourite/${id}`;

  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
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

window.addEventListener('load', () => {
  setTimeout(() => {
    const url = `/listRooms/showAll/yes`;

    fetch(url, {
      method: 'get',
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      });
  }, 1000);
});
