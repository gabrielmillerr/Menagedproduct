import { PrismaProductRepository } from '../infra/repositories/PrismaProductRepository';
import { CreateProduct } from '../domain/usecases/product/CreateProduct';
import { MenagedProductStock } from '../domain/usecases/product/MenagedProductStock';
import { ProductController } from '../application/controllers/ProductController';
import { FindProduct } from '../domain/usecases/product/FindProduct';
import { UpdateProduct } from '../domain/usecases/product/UpdateProduct';

const productRepository = new PrismaProductRepository();
const createProduct = new CreateProduct(productRepository);
const menagedProductStock = new MenagedProductStock(productRepository);
const findProduct = new FindProduct(productRepository);
const updateProduct = new UpdateProduct(productRepository);

export const productController = new ProductController(
  createProduct,
  menagedProductStock,
  findProduct, 
  updateProduct
);