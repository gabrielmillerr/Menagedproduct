import { Product } from "../../entities/Product";
import { ProductRepository } from "../../repositories/ProductRepository";

export class CreateProduct {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(name: string, price: number, stock: number) {
    const productWithSameName = await this.productRepository.findByName(name);
    if (productWithSameName) {
      throw new Error('Product name already exists');
    }

    const product = Product.create(name, price, stock);
    await this.productRepository.save(product);

    return product;
  }
}