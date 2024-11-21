import { ProductRepository } from "../../repositories/ProductRepository";
import { CustomError } from "@/shared/utils/CustomError";
import { statusCode} from "@/shared/utils/statusCode";

export class UpdateProduct {
  constructor(private productRepository: ProductRepository) {}

  async execute(id: string, data: { name: string; price: number; stock: number }) {
    const product = await this.productRepository.findById(id);
    
    if (!product) {
      throw new CustomError("Product not found", statusCode.NOT_FOUND);
    }

    const updatedProduct = await this.productRepository.update(id, data);
    return updatedProduct;
  }
}