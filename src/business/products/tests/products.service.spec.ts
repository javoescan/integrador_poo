import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { productMock } from '../mocks/products.mocks';
import { ProductsRepositoryMock } from '../mocks/products.repository.mock';
import { Product } from '../products.entity';
import { ProductsService } from '../products.service';

describe('ProductsService', () => {
	let productsService: ProductsService;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			providers: [ProductsService, {
				provide: getRepositoryToken(Product),
				useClass: ProductsRepositoryMock,
			}],
		}).compile();

      productsService = app.get<ProductsService>(ProductsService);
	});

	describe('getAll', () => {
		it('should return the products collection', async () => {
			expect(await productsService.getAll()).toEqual([productMock]);
		});
	});

	describe('get', () => {
		it('should return the product', async () => {
			expect(await productsService.get(productMock.id)).toEqual(productMock);
		});
	});

	describe('create', () => {
		it('should return the created product', async () => {
			jest.spyOn(productsService['productsRepository'], 'findOne').mockImplementationOnce(() => null);
			expect(await productsService.create(productMock)).toEqual(productMock);
		});
	});

	describe('update', () => {
		it('should return the updated product', async () => {
			expect(await productsService.update(productMock)).toEqual(productMock);
		});
		it('should throw an error because the product does not exist', async () => {
			jest.spyOn(productsService['productsRepository'], 'findOne').mockImplementationOnce(() => null);
			expect(async() => await productsService.update(productMock)).rejects.toThrowError(HttpException);
		});
	});

	describe('delete', () => {
		it('should return the deleted product id', async () => {
			expect(await productsService.delete(productMock.id)).toEqual(productMock.id);
		});
  });
});
