import { ProductRepository } from "../../repositories/ProductRepository";

export class MenagedProductStock {
  constructor(private readonly productRepository: ProductRepository) {}

  async increaseStock(id: string, quantity: number) {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new Error('Product not found');
    }

    product.increaseStock(quantity);
    const updatedProduct = await this.productRepository.update(id, {
      stock: product.stock
    })
    return updatedProduct;
  }

  async decreaseStock(id: string, quantity: number) {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new Error('Product not found');
    }
    product.decreaseStock(quantity);
    const updatedProduct = await this.productRepository.update(id, {
      stock: product.stock
    })
    return updatedProduct;
  }
}