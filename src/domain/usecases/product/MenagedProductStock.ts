import { ProductRepository } from "../../repositories/ProductRepository";

export class MenagedProductStock {
  constructor(private readonly productRepository: ProductRepository) {}

  async increaseStock(id: string, quantity: number) {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new Error('Product not found');
    }

    product.increaseStock(quantity);
    await this.productRepository.update(id, product);
    
    return product;
  }

  async decreaseStock(id: string, quantity: number) {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new Error('Product not found');
    }

    product.decreaseStock(quantity);
    await this.productRepository.update(id, product);
    
    return product;
  }
}