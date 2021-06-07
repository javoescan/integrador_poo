import { Injectable } from '@nestjs/common';
import { Product } from '../products.entity';
import { productMock } from './products.mocks';

@Injectable()
export class ProductsServiceMock {
	async getAll(id: string): Promise<Product[]> {
		return [productMock];
	}

	async get(id: string): Promise<Product> {
		return productMock;
	}

	async create(product: Product): Promise<Product> {
		return productMock;
	}

	async update(product: Product): Promise<Product> {
		return productMock;
	}

	async delete(id: string): Promise<string> {
		return id;
	}
}