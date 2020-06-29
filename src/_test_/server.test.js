const request = require('supertest');
import { app }from '../server/index'


describe('Post Endpoints', () => {
  it('should route to index.html', async () => {
    const res = await request(app)
      .get('/')
      .send('./dist/index.html')
    expect(res.statusCode).toEqual(200);
  })
})