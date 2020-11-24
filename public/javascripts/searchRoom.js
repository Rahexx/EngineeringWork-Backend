const submitBtn = document.querySelector('.searchRooms__submit');

const showSearchRooms = (response) => {
  const roomsList = document.querySelector('.searchRooms__list');
  const itemsRoomList = roomsList.children;
  const roomsResponse = [];

  response.forEach((item) => {
    roomsResponse.push(item.description);
  });

  [...itemsRoomList].map((item, index) => {
    const infoHolder = itemsRoomList[index].children[1];
    const description = infoHolder.children[1].textContent;

    if (roomsResponse.includes(description)) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
};

const searchFormData = (response) => {
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

const getSearchRooms = (searchParams) => {
  const data = {
    location: searchParams[0],
    priceFrom: searchParams[1],
    priceTo: searchParams[2],
  };

  const url = `/listRooms?location=${data.location}&priceFrom=${data.priceFrom}&priceTo=${data.priceTo}`;

  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((response) => {
      showSearchRooms(response);
    })
    .catch((err) => console.log(err));
};

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const searchParams = searchFormData();
  getSearchRooms(searchParams);
});
