import { Product } from "@/domain/entities/Product";
import { Category } from "@/domain/entities/Category";
import { ProductRepository } from "@/domain/repositories/ProductRepository";

export class CreateProduct {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(name: string, price: number, stock: number, categorias: Category[]) {
    const productWithSameName = await this.productRepository.findByName(name);
    if (productWithSameName) {
      throw new Error('Product name already exists');
    }

    const product = Product.create(name, price, stock, categorias);
    await this.productRepository.save(product);

    return product;
  }
}