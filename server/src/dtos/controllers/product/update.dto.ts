import { Product } from "@/domain/entities/Product";

export class UpdateProductDTO {
  constructor(
    public id: string,
    public name?: string,
    public price?: number,
    public stock?: number
  ) {}

  static fromProduct(product: Product): UpdateProductDTO {
    return new UpdateProductDTO(product.id, product.name, product.price, product.stock);
  }
}