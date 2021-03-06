const { image, lorem, name, random } = require('faker');

const cwd = process.cwd();
const supergoose = require(`${cwd}/server/__tests__/supergoose`);
const { app } = require(`${cwd}/server`);

const request = supergoose.mockRequest(app);

beforeAll(supergoose.startDB);
afterAll(supergoose.stopDB);

describe('API router', () => {
  it('responds with a 200 status to a GET for /api/v1/book', async () => {
    const response = await request.get('/api/v1/book');
    expect(response.status).toBe(200);
  });

  it('responds with a 200 status to a GET for /api/v1/book/:id', async () => {
    const obj = {
      title: lorem.words(),
      author: name.findName(),
      isbn: random.uuid(),
      image_url: image.imageUrl(),
      description: lorem.sentences(),
      bookshelf: random.word(),
    };
    const response = await request.post('/api/v1/book').send(obj);
    const id = response.body._id;
    const results = await request.get(`/api/v1/book/${id}`);

    expect(results.status).toBe(200);
  });

  it('responds with a 200 status to a POST to /api/v1/book', async () => {
    const obj = {
      title: lorem.words(),
      author: name.findName(),
      isbn: random.uuid(),
      image_url: image.imageUrl(),
      description: lorem.sentences(),
      bookshelf: random.word(),
    };
    const response = await request.post('/api/v1/book').send(obj);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(obj);

    expect.assertions(2);
  });

  it('responds with a 200 status to a PUT to /api/v1/book/:id', async () => {
    const obj = {
      title: lorem.words(),
      author: name.findName(),
      isbn: random.uuid(),
      image_url: image.imageUrl(),
      description: lorem.sentences(),
      bookshelf: random.word(),
    };
    const response = await request.post('/api/v1/book').send(obj);
    const id = response.body._id;
    const update = {
      title: lorem.words(),
      author: name.findName(),
      isbn: random.uuid(),
      image_url: image.imageUrl(),
      description: lorem.sentences(),
      bookshelf: random.word(),
    };
    const results = await request.put(`/api/v1/book/${id}`).send(update);

    expect(results.status).toBe(200);
    expect(results.body).toMatchObject(update);

    expect.assertions(2);
  });

  it('responds with a 200 status to a PATCH to /api/v1/book/:id', async () => {
    const obj = {
      title: lorem.words(),
      author: name.findName(),
      isbn: random.uuid(),
      image_url: image.imageUrl(),
      description: lorem.sentences(),
      bookshelf: random.word(),
    };
    const response = await request.post('/api/v1/book').send(obj);
    const id = response.body._id;
    const update = {
      title: lorem.words(),
      author: name.findName(),
      isbn: random.uuid(),
      image_url: image.imageUrl(),
      description: lorem.sentences(),
      bookshelf: random.word(),
    };
    const result = await request.patch(`/api/v1/book/${id}`).send(update);

    expect(result.status).toBe(200);
    expect(result.body).toMatchObject(update);

    expect.assertions(2);
  });

  it('responds with a 200 status to a DELETE to /api/v1/book/:id', async () => {
    const obj = {
      title: lorem.words(),
      author: name.findName(),
      isbn: random.uuid(),
      image_url: image.imageUrl(),
      description: lorem.sentences(),
      bookshelf: random.word(),
    };
    const response = await request.post('/api/v1/book').send(obj);
    const id = response.body._id;
    const result = await request.delete(`/api/v1/book/${id}`);

    expect(result.status).toBe(200);
    expect(result.body).toMatchObject(obj);

    expect.assertions(2);
  });
});
