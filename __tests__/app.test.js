const request = require('supertest');
const app = require('../app');

function checkResponse(response) {
  expect(response.status).toEqual(200);
  expect(response.header['content-type']).toEqual('text/html; charset=utf-8');
}

it('It should work for method get on path /.', async () => {
  const response = await request(app).get('/');

  checkResponse(response);
});

it('It should work for method get on path /logIn.', async () => {
  const response = await request(app).get('/logIn');

  checkResponse(response);
});
