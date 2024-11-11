import { Product } from '../../../domain/entities/Product';

export class ProductDTO {
  constructor (
    public id: string,
    public name: string,
    public price: number,
    public stock?: number
  ) {}

  static fromProduct(product: Product): ProductDTO {
    return new ProductDTO(product.id, product.name, product.price, product.stock);
  }
}