import { Product } from "@/domain/entities/Product";

export class IncreaseStockProductDTO {
  constructor(
    public id: string,
    public stock: number
  ) {}

  static fromProduct(product: Product): IncreaseStockProductDTO {
    return new IncreaseStockProductDTO(product.id, product.stock);
  }
}