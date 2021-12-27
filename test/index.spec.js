const app = require("../src/app")
const request = require("supertest")

describe('GET /tasks', () => {

      test('Should respond with a 200 status code', async () => {
            const response = await request(app).get('/tasks').send();
            expect(response.statusCode).toBe(200)
      });

      test('Should respond an array', async () => {
            const response = await request(app).get('/tasks').send();
            expect(response.body).toBeInstanceOf(Array);
      })
});

describe('POST /tasks', () => {
      describe('Given a title and description', () => {
            const newTask = {
                  title: 'Test title',
                  description: 'Test description'
            };

            test('Should respond with a 200 status code', async () => {
                  const response = await request(app).post('/tasks').send(newTask);
                  expect(response.statusCode).toBe(200)
            });
      
            test('Should respond with a Content-Type of application/json', async () => {
                  const response = await request(app).post('/tasks').send(newTask);
                  expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
            });
      
            test('Should respond an object with the new task saved with an ID', async () => {
                  const response = await request(app).post('/tasks').send(newTask);
                  expect(response.body.id).toBeDefined();
            });
      });

      describe('When title and description are missing', () => {
            test('Should respond with a 400 status code', async () => {
                  const fields = [
                        {},
                        { title: '' },
                        { description: '' }
                  ];
                  
                  for (const body of fields) {
                        const response = await request(app).post('/tasks').send(body);
                        expect(response.statusCode).toBe(400);
                  }
            });
      });
})