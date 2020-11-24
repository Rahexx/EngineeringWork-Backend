const favourite = document.querySelectorAll('.favourites__heart');

const deleteHeart = (item) => {
  const parent = item.parentElement;
  const id = parent.dataset.id;

  const url = `/favourites/${id}`;

  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((response) => {});
};

[...favourite].map((item) => {
  item.addEventListener('click', () => {
    deleteHeart(item);
  });
});
