import { randomUUID } from 'crypto';

export type ProductProps = {
  id: string,
  name: string,
  price: number,
  stock?: number
}

export class Product {
  private constructor(private props: ProductProps) {
    this.props.stock = this.props.stock ?? 0;
    this.validate();
  }

  public static create(name: string, price: number, stock: number) {
    return new Product({
      id: randomUUID().toString(),
      name,
      price,
      stock
    });
  }

  public static with(props: ProductProps) {
    return new Product(props); // Método alternativo de criação
  }

  private validate() {
    if (!this.props.name) {
      throw new Error('Name is required');
    }

    if (this.props.price === undefined || this.props.price < 0) {
      throw new Error('Price must be a positive number');
    }
  }

  public get id(): string {
    return this.props.id;
  }

  public get name(): string {
    return this.props.name;
  }

  public get price(): number {
    return this.props.price;
  }

  public get stock(): number {
    return this.props.stock ?? 0;
  }

  public increaseStock(quantity: number) {
    if (quantity <= 0) {
      throw new Error('Quantity must be a positive number');
    }
    this.props.stock = (this.props.stock ?? 0) + quantity;
  }

  public decreaseStock(quantity: number) {
    if (quantity <= 0) {
      throw new Error('Quantity must be a positive number');
    }

    if ((this.props.stock ?? 0) < quantity) {
      throw new Error('Insufficient stock');
    }

    this.props.stock = (this.props.stock ?? 0) - quantity;
  }
}
