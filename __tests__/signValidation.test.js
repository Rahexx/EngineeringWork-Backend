const {
  nameValid,
  emailValid,
  phoneValid,
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
