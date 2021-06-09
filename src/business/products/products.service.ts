import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './products.entity';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private productsRepository: Repository<Product>) {}

  async getAll(limit, page): Promise<Product[]> {
    return this.productsRepository.find({
      take: limit || 10,
      skip: page || 0,
    });
  }

  async get(id: string): Promise<Product> {
    return this.productsRepository.findOne({ id });
  }

  async create(product: Product): Promise<Product> {
    const entity = new Product();
    entity.price = product.price;
    entity.name = product.name;
    entity.stock = product.stock;
    return this.productsRepository.save(entity);
  }
  
  async update(product: Product): Promise<Product> {
    try {
      const existingProduct = await this.get(product.id);
      const updatedProduct = {
        ...existingProduct,
        ...product,
      };
      return this.productsRepository.save(updatedProduct);
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  async delete(id: string): Promise<string> {
    await this.productsRepository.softDelete({ id });
    return id;
  }
}