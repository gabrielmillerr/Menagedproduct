import { Product } from "@/domain/entities/Product";

export class FindByCategoryProductDTO {
  constructor (
    public id: string,
    public name: string,
    public price: number,
    public stock?: number
  ) {}

  async fromProduct(product: Product): Promise<FindByCategoryProductDTO> {
    return new FindByCategoryProductDTO(product.id, product.name, product.price, product.stock);
  }
}