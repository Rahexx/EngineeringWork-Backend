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
