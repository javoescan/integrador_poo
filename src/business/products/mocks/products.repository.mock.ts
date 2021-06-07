import { Injectable } from '@nestjs/common';
import { Product } from '../products.entity';
import { productMock } from './products.mocks';

@Injectable()
export class ProductsRepositoryMock {
	async find(): Promise<Product[]> {
		return [productMock];
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