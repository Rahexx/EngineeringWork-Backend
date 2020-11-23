const {
  nameValid,
  emailValid,
  phoneValid,
  dateValid,
  loginValid,
  passwordValid,
} = require('../services/signValidation');

describe('nameValid', () => {
  it('works', () => {
    const name = 'Andrzej';

    expect(nameValid(name)).toBe(name.trim());
  });

  it('handles an empty name', () => {
    const name = '';

    expect(nameValid(name)).toBe(false);
  });

  it('handles with number in name', () => {
    const name = '12122';

    expect(nameValid(name)).toBe(false);
  });
});

describe('nameValid', () => {
  it('works', () => {
    const email = 'rahexx12@gmail.com';

    expect(emailValid(email)).toBe(email.trim());
  });

  it('handles an empty email', () => {
    const email = '';

    expect(emailValid(email)).toBe(false);
  });

  it('handles without @', () => {
    const email = 'endriu12';

    expect(emailValid(email)).toBe(false);
  });

  it('handles without dot', () => {
    const email = 'endriu12@cc';

    expect(emailValid(email)).toBe(false);
  });
});

describe('phoneValid', () => {
  it('works', () => {
    const phoneNumber = '123456789';

    expect(phoneValid(phoneNumber)).toBe(phoneNumber.trim());
  });

  it('handles with empty phoneNumber', () => {
    const phoneNumber = '';

    expect(phoneValid(phoneNumber)).toBe(false);
  });

  it('handles with letters', () => {
    const phoneNumber = '12aa3456789';

    expect(phoneValid(phoneNumber)).toBe(false);
  });
});

describe('dateValid', () => {
  it('works', () => {
    const date = '2020-11-06';

    expect(dateValid(date)).toBe(date);
  });

  it('handles with empty date', () => {
    const date = '';

    expect(dateValid(date)).toBe(false);
  });

  it('handles with wrong format date', () => {
    const date = '1997/12/12';
    const date2 = '1.12.1997';

    expect(dateValid(date)).toBe(false);
    expect(dateValid(date2)).toBe(false);
  });
});

describe('loginValid', () => {
  it('works', () => {
    const login = 'Rahexx';

    expect(loginValid(login)).toBe(login);
  });

  it('works with numbers', () => {
    const login = 'Rahexx123';

    expect(loginValid(login)).toBe(login);
  });

  it('handles with empty login', () => {
    const login = '';

    expect(loginValid(login)).toBe(false);
  });

  it('handles with special sign', () => {
    const login = 'Rahexx!';

    expect(loginValid(login)).toBe(false);
  });

  it('handles with to short login', () => {
    const login = 'Ra';

    expect(loginValid(login)).toBe(false);
  });

  it('handles with to long login', () => {
    const login = 'RahexxRahexxRahexxRahexx';

    expect(loginValid(login)).toBe(false);
  });
});

describe('passwordValid', () => {
  it('works', () => {
    const password = 'Mongooose12!';

    expect(passwordValid(password)).toBe(password);
  });

  it('work without special sign', () => {
    const password = 'Mongooose12';

    expect(passwordValid(password)).toBe(password);
  });

  it('handles without 1 uppercase letter', () => {
    const password = 'mongooose12';

    expect(passwordValid(password)).toBe(false);
  });

  it('handles without 1 lowercase letter', () => {
    const password = 'MONGOOSE12';

    expect(passwordValid(password)).toBe(false);
  });

  it('handles with too short password', () => {
    const password = 'mongo';

    expect(passwordValid(password)).toBe(false);
  });
});
