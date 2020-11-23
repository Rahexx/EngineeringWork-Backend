const nameValid = (name) => {
  const cleanName = name.trim();
  const reg = /^[a-zA-Z-zżźćńółęąśŻŹĆĄŚĘŁÓŃ '.-]*$/;

  const regResult = reg.test(cleanName);
  return regResult && cleanName.length > 2 ? cleanName : false;
};

const emailValid = (email) => {
  const cleanEmail = email.trim();

  const reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const regResult = reg.test(cleanEmail);

  return regResult ? cleanEmail : false;
};

const phoneValid = (phone) => {
  const stringPhone = phone.toString();
  console.log(stringPhone);
  console.log(typeof stringPhone);

  const reg = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;
  const regResult = reg.test(stringPhone);

  return regResult ? stringPhone : false;
};

const dateValid = (date) => {
  const reg = /(([1-2][0-9])|([1-9])|(3[0-1]))-((1[0-2])|([1-9]))-[0-9]{4}/g;
  const regResult = reg.test(date);

  return regResult ? date : false;
};

const loginValid = (login) => {
  const reg = /^[a-z0-9_-]{3,16}$/gim;
  const regResult = reg.test(login);

  return regResult ? login : false;
};

const passwordValid = (password) => {
  const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
  const regResult = reg.test(password);

  return regResult ? password : false;
};

module.exports = {
  nameValid,
  emailValid,
  phoneValid,
  dateValid,
  loginValid,
  passwordValid,
};
