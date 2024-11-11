import { ProductRepository } from "../../repositories/ProductRepository";

export class UpdateProduct {
  constructor(private productRepository: ProductRepository) {}

  async execute(id: string, data: { name: string; price: number; stock: number }) {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new Error("Product not found");
    }

    const updatedProduct = await this.productRepository.update(id, data);
    return updatedProduct;
  }
}