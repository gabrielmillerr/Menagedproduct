import { Product } from "@/domain/entities/Product";
import { Category } from "@/domain/entities/Category";
import { ProductRepository } from "@/domain/repositories/ProductRepository";
import { CustomError } from "@/shared/utils/CustomError";
import { statusCode } from "@/shared/utils/statusCode";

export class CreateProduct {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(name: string, price: number, stock: number, categorias: Category[]) {
    const productWithSameName = await this.productRepository.findByName(name);
    
    if (productWithSameName) {
      throw new CustomError('Product name already exists', statusCode.CONFLICT);
    }

    const product = Product.create(name, price, stock, categorias);
    await this.productRepository.save(product);

    return product;
  }
}