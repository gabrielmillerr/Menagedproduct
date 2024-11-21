import { Product } from '@/domain/entities/Product';

export class FindAllProductDTO {
  constructor (
    public id: string,
    public name: string,
    public price: number,
    public stock?: number
  ) {}

  static fromProduct(product: Product): FindAllProductDTO {
    return new FindAllProductDTO(product.id, product.name, product.price, product.stock);
  }
}