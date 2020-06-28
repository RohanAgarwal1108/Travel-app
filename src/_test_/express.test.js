const request=require('supertest')
import { app } from '../server/index'


describe('Post Endpoints', () => {
  it('should return the trip details', async () => {
    const res = await request(app)
      .post('/testing')
      .send({
        fromEntry: 'Moscow',
        toEntry: 'Paris',
        dateEntry: '2020-06-30',
        todoEntry: '123'
      })
    expect(res.statusCode).toEqual(201);
  })
})