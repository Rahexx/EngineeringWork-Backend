const request = require('supertest');
const app = require('../app');

it('works', async () => {
  const response = await request(app).get('/');

  expect(response.status).toEqual(200);
  expect(response.header['content-type']).toEqual('text/html; charset=utf-8');
});
