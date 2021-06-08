import { Test, TestingModule } from '@nestjs/testing';
import { productMock } from '../mocks/products.mocks';
import { ProductsServiceMock } from '../mocks/products.service.mock';
import { ProductsController } from '../products.controller';
import { ProductsService } from '../products.service';

describe('ProductsController', () => {
	let productsController: ProductsController;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			controllers: [ProductsController],
			providers: [ProductsService],
		})
			.overrideProvider(ProductsService)
			.useClass(ProductsServiceMock)
			.compile();

      productsController = app.get<ProductsController>(ProductsController);
	});

	describe('getAll', () => {
		it('should return the products collection', async () => {
			expect(await productsController.getAll()).toEqual([productMock]);
		});
	});

	describe('get', () => {
		it('should return the product', async () => {
			expect(await productsController.get(productMock.id)).toEqual(productMock);
		});
	});

	describe('create', () => {
		it('should return the created product', async () => {
			expect(await productsController.create(productMock)).toEqual(productMock);
		});
	});

	describe('update', () => {
		it('should return the updated product', async () => {
			expect(await productsController.update(productMock)).toEqual(productMock);
		});
	});

	describe('delete', () => {
		it('should return the deleted product id', async () => {
			expect(await productsController.delete(productMock.id)).toEqual(productMock.id);
		});
	});
});
