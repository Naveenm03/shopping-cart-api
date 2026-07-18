const request = require('supertest');
const app = require('../app');

describe('Products API', () => {
  let createdProductId;

  it('should return empty products initially', async () => {
    const res = await request(app).get('/products');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual([]);
  });

  it('should create a product', async () => {
    const res = await request(app)
      .post('/products')
      .send({ name: 'Test Product', price: 10.99 });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toEqual('Test Product');
    expect(res.body.price).toEqual(10.99);
    createdProductId = res.body.id;
  });

  it('should return the created product', async () => {
    const res = await request(app).get('/products');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(1);
    expect(res.body[0].id).toEqual(createdProductId);
  });

  it('should delete the product', async () => {
    const res = await request(app).delete(`/products/${createdProductId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.id).toEqual(createdProductId);
  });

  it('should return 404 for non-existent product', async () => {
    const res = await request(app).delete(`/products/999`);
    expect(res.statusCode).toEqual(404);
  });
});
