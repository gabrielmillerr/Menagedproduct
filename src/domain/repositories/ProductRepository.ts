// Essa interface define que qualquer repositório que lidará com Product precisa implementar esses métodos.
import { Product } from "../entities/Product";

export interface ProductRepository {
  save(product: Product): Promise<void>;
  findById(id: string): Promise<Product | null>;
  findByName(name: string): Promise<Product | null>;
  findAll(): Promise<Product[]>;
  update(id: string, data: Partial<Product>): Promise<Product>;
}