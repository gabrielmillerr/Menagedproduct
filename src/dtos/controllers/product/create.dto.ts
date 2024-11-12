import { Product } from '@/domain/entities/Product';

export class CreateProductDTO {
  constructor (
    public id: string,
    public name: string,
    public price: number,
    public stock?: number
  ) {}

  static fromProduct(product: Product): CreateProductDTO {
    return new CreateProductDTO(product.id, product.name, product.price, product.stock);
  }
}