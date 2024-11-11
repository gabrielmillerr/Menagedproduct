import request from 'supertest';
import { app } from '../../main'; // Importa aplicação Express
import prisma from '../../prisma';
import { randomUUID } from 'crypto';

describe('ProductController', () => {
  let uniqueName: string;

  beforeEach(() => {
    uniqueName = `tela-${randomUUID().slice(0, 5)}`;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should create a product', async () => {
    const response = await request(app)
      .post('/products/create')
      .send({ name: uniqueName, price: 500, stock: 5 });

    expect(response.status).toBe(201);
    expect(response.body.props).toHaveProperty('id');
    expect(response.body.props.name).toBe(uniqueName);
    expect(response.body.props.price).toBe(500);
  });

  it('should return 400 if name exists', async () => {
    // Cria o produto pela primeira vez
    await request(app)
      .post('/products/create')
      .send({ name: uniqueName, price: 500, stock: 5 });

    // Tenta criar o produto novamente com o mesmo nome
    const response = await request(app)
      .post('/products/create')
      .send({ name: uniqueName, price: 500, stock: 5 });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Product name already exists');
  });

  it('should find a product by id', async () => {
    // Cria o produto
    const createResponse = await request(app)
      .post('/products/create')
      .send({ name: uniqueName, price: 500, stock: 5 });

    const createdProductId = createResponse.body.props.id;

    // Recupera o produto pelo ID
    const response = await request(app)
      .get(`/products/${createdProductId}`)
      .send();

    expect(response.status).toBe(200);
    expect(response.body.props.name).toBe(uniqueName);
    expect(response.body.props.price).toBe(500);
  });

  it('should return 404 if product not found', async () => {
    const uuidInvalid = randomUUID();
    const response = await request(app)
      .get(`/products/${uuidInvalid}`)
      .send();

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Product not found');
  });

  // Teste de validação de campos
  it('should return 400 if required fields are missing', async () => {
    const response = await request(app)
      .post('/products/create')
      .send({ price: 500, stock: 5 }); // Sem o campo name

    expect(response.status).toBe(400);
    expect(response.body.errors).toContain('"name" is required');
  });

  it("should update a product", async () => {
    // Cria um produto inicialmente
    const uniqueName = `tela-${randomUUID().slice(0, 5)}`;
    const createResponse = await request(app)
      .post('/products/create')
      .send({ name: uniqueName, price: 500, stock: 5 });

    expect(createResponse.status).toBe(201);
    const createdProductId = createResponse.body.props.id;

    // Atualiza o produto criado
    const updateData = { name: `${uniqueName}-updated`, price: 600, stock: 10 };
    const updateResponse = await request(app)
      .put(`/products/${createdProductId}`)
      .send(updateData);

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.props.name).toBe(updateData.name);
    expect(updateResponse.body.props.price).toBe(updateData.price);
    expect(updateResponse.body.props.stock).toBe(updateData.stock);

    // Verifica se os dados foram realmente atualizados
    const getResponse = await request(app)
      .get(`/products/${createdProductId}`)
      .send();

    expect(getResponse.status).toBe(200);
    expect(getResponse.body.props.name).toBe(updateData.name);
    expect(getResponse.body.props.price).toBe(updateData.price);
    expect(getResponse.body.props.stock).toBe(updateData.stock);
  });
});