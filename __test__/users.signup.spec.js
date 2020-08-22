// __test__/users.signup.spec.js

const request = require('supertest');

const server = require('../server');
const config = require('../server/config');
const database = require('../server/database');

let agent;

beforeAll(() => {
  const url = `${config.database.url}-test`;
  database.connect({ url }, {});

  agent = request(server);
});

afterAll(() => {
  database.disconnect();
});

describe('Users', () => {
  test('Get the list of the users', async () => {
    const response = await agent.get('/api/users');
    const { body = {} } = response;
    const { success = false } = body;
    expect(success).toBeTruthy();
  });
});
