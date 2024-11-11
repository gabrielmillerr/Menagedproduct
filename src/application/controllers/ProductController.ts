import { Request, Response } from 'express';
import { CreateProduct } from "../../domain/usecases/product/CreateProduct";
import { MenagedProductStock } from "../../domain/usecases/product/MenagedProductStock"
import { FindProduct } from "../../domain/usecases/product/FindProduct"
import { UpdateProduct } from "../../domain/usecases/product/UpdateProduct"

import { ProductDTO } from "@/dtos/controllers/product/product.dto"; 

export class ProductController {
  constructor(
    private createProduct: CreateProduct,
    private menageProductStock: MenagedProductStock,
    private findProduct: FindProduct,
    private updateProduct: UpdateProduct
  ) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { name, price, stock } = req.body;
      const product = await this.createProduct.execute(name, price, stock ?? 0);
      const productDTO = ProductDTO.fromProduct(product);
      res.status(201).json(productDTO);
    } catch(error) {
       res.status(400).json({ message: error.message });
    }
  }

  async findById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const product = await this.findProduct.findById(id);

      if(!product) {
        res.status(404).json({ message: 'Product not found' });
        return
      }

      const productDTO = ProductDTO.fromProduct(product);
      res.status(200).json(productDTO);
    } catch(error) {
      res.status(500).json({ message: error.message });
    }
  }

  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const products = await this.findProduct.findAll();
      const productDTOs = products.map(ProductDTO.fromProduct);
      res.status(200).json(productDTOs);
    } catch(error) {
      res.status(400).json({ message: error.message });
    }
  }

  async increaseStock(req: Request, res: Response): Promise<void> {
    try {
      const { id, quantity } = req.body;
      const product = await this.menageProductStock.increaseStock(id, quantity);
      const productDTO = ProductDTO.fromProduct(product);
      res.status(200).json(productDTO);
    } catch(error) {
      res.status(400).json({ message: error.message });
    }
  }

  async decreaseStock(req: Request, res: Response): Promise<void> {
    try {
      const { id, quantity } = req.body;
      const product = await this.menageProductStock.decreaseStock(id, quantity);
      const productDTO = ProductDTO.fromProduct(product);
      res.status(200).json(productDTO);
    } catch(error) {
      res.status(400).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const data = req.body;
      const product = await this.updateProduct.execute(id, data);
      const productDTO = ProductDTO.fromProduct(product);
      res.status(200).json(productDTO);
    } catch(error) {
      res.status(400).json({ message: error.message });
    }
  }
}