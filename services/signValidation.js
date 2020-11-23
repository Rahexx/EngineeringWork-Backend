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
  const cleanPhone = phone.trim();

  const reg = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;
  const regResult = reg.test(cleanPhone);

  return regResult ? cleanPhone : false;
};

const dateValid = (date) => {
  const reg = /(([1-2][0-9])|([1-9])|(3[0-1]))-((1[0-2])|([1-9]))-[0-9]{4}/g;
  const regResult = reg.test(date);

  return regResult ? date : false;
};

module.exports = {
  nameValid,
  emailValid,
  phoneValid,
};
