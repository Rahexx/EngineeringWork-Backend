const socket = io();
const form = document.querySelector('.chat__form');
const message = document.querySelector("input[type='text']");
const loginUser = document.querySelector('.chat__form').dataset.login;
const otherUsers = document.querySelectorAll('.userList__item');
let currentReceiver = '';

const getTime = () => {
  const date = new Date();
  const hour = date.getHours();
  const minute =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  const day = date.getDay() < 10 ? `0${date.getDay()}` : date.getDay();

  const month = date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth();
  const year = date.getFullYear();

  return `${hour}:${minute}  ${day}-${month}-${year}`;
};

const addNewMessage = (msg) => {
  const listMessages = document.querySelector('.chat__messages');
  const countChildren = listMessages.children.length;
  const li = document.createElement('li');
  const date = document.createElement('p');
  const text = document.createElement('p');
  const span = document.createElement('span');

  li.classList.add('chat__item');
  date.classList.add('chat__date');
  text.classList.add('chat__text');
  span.classList.add('chat__textContainer');

  if (msg.from !== loginUser) {
    li.classList.add('chat__item--other');
    date.classList.add('chat__date--other');
    text.classList.add('chat__text--other');
  } else {
    li.classList.add('chat__item--user');
    date.classList.add('chat__date--user');
    text.classList.add('chat__text--user');
  }

  date.textContent = msg.time;
  span.textContent = msg.text;

  text.appendChild(span);
  li.appendChild(date);
  li.appendChild(text);

  if (countChildren === 0) {
    listMessages.appendChild(li);
  } else {
    const firstChild = listMessages.children[0];
    listMessages.insertBefore(li, firstChild);
  }
};

form.addEventListener('click', (e) => {
  e.preventDefault();

  if (message.value) {
    const now = getTime();
    const msg = {
      from: loginUser,
      to: currentReceiver,
      text: message.value,
      time: now,
    };

    addNewMessage(msg);

    socket.emit('message', msg);

    message.value = '';
  }
});

[...otherUsers].map((item) => {
  item.addEventListener('click', (e) => {
    const listMessages = document.querySelector('.chat__messages');
    const allContacts = document.querySelectorAll('.userList__item');

    [...allContacts].map((item) => {
      item.style.color = '#bee9e8';
    });

    e.target.style.color = 'white';
    listMessages.textContent = '';
    currentReceiver = e.target.textContent;
  });
});

socket.on('message', function (msg) {
  if (msg.to === loginUser) {
    addNewMessage(msg);
  }
});
