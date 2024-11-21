import { Product } from '@/domain/entities/Product';

export class FindByIdProductDTO {
  constructor (
    public id: string,
    public name: string,
    public price: number,
    public stock?: number
  ) {}

  static fromProduct(product: Product): FindByIdProductDTO {
    return new FindByIdProductDTO(product.id, product.name, product.price, product.stock);
  }
}