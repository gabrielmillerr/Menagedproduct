import { Product } from '@/domain/entities/Product';
import { randomUUID } from 'crypto';

export type CategoryProps = {
  id: string;
  name: string;
  products?: Product[];
};

export class Category {
  private constructor(private props: CategoryProps) {
    this.validate();
  };

  public static create(name: string, products?: Product[]) {
    return new Category({
      id: randomUUID().toString(),
      name,
      products
    });
  }

  public static with(props: CategoryProps) {
    return new Category(props);
  }

  private validate() {
    if (!this.props.name) {
      throw new Error('Name is required');
    }
  }

  public get id(): string {
    return this.props.id;
  }

  public get name(): string {
    return this.props.name;
  }

  public get products(): Product[] {
    return this.props.products ?? [];
  }
}