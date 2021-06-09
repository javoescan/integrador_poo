import { Injectable } from '@nestjs/common';
import { Product } from '../products.entity';
import { productMock } from './products.mocks';

@Injectable()
export class ProductsRepositoryMock {
	async findAndCount(): Promise<any> {
		return [[productMock], 1];
	}

	async findOne(id: string): Promise<Product> {
		return productMock;
	}

	async save(product: Product): Promise<Product> {
		return productMock;
	}

	async softDelete(id: string): Promise<string> {
		return id;
	}
}