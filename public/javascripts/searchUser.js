const submitBtn = document.querySelector('.users__search');
const submitForm = document.querySelector('.users__searchForm');

const showSearchUser = (response) => {
  console.log(response);
  const userList = document.querySelector('.users__list');
  const itemsUserList = userList.children;
  const loginsResponse = [];

  response.forEach((item) => {
    loginsResponse.push(item.login);
  });

  [...itemsUserList].map((item, index) => {
    const child = itemsUserList[index].children[0];
    const loginText = child.textContent;

    if (loginsResponse.includes(loginText)) {
      item.style.display = 'list-item';
    } else {
      item.style.display = 'none';
    }
  });
};

submitForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const login = submitForm.children[0].value;
  console.log(login);
  const url = `/searchUsers/${login}`;

  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((response) => {
      showSearchUser(response);
    });
});
