import { Product } from "@/domain/entities/Product";

export class DecreaseStockProductDTO {
  constructor(
    public id: string,
    public stock: number
  ) {}

  static fromProduct(product: Product): DecreaseStockProductDTO {
    return new DecreaseStockProductDTO(product.id, product.stock);
  }
}