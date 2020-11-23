var express = require('express');
var router = express.Router();
const User = require('../models/user');

const {
  nameValid,
  emailValid,
  dateValid,
  loginValid,
  passwordValid,
  phoneValid,
} = require('../services/signValidation');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('signUp');
});

router.post('/', function (req, res, next) {
  const body = req.body;

  const isNameValid = nameValid(body.name);
  const isSurnameValid = nameValid(body.surname);
  const isEmailValid = emailValid(body.email);
  const isPhoneValid = phoneValid(body.phone);
  const isDateValid = dateValid(body.date);
  const isLoginValid = loginValid(body.login);
  const isPasswordValid = passwordValid(body.password);

  if (
    isNameValid &&
    isSurnameValid &&
    isEmailValid &&
    isPhoneValid &&
    isDateValid &&
    isLoginValid &&
    isPasswordValid
  ) {
    res.json({ isAdd: true });
    const newUser = new User({
      name: isNameValid,
      surname: isSurnameValid,
      email: isEmailValid,
      phone: isPhoneValid,
      date: isDateValid,
      sex: body.sex,
      login: isLoginValid,
      password: isPasswordValid,
    });
    newUser.save();
  } else {
    res.json({
      isAdd: false,
      name: isNameValid,
      surname: isSurnameValid,
      email: isEmailValid,
      phone: isPhoneValid,
      date: isDateValid,
      login: isLoginValid,
      password: isPasswordValid,
    });
  }
});

module.exports = router;
