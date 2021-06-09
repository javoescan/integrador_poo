import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { productMock } from 'business/products/mocks/products.mocks';
import { ProductsServiceMock } from 'business/products/mocks/products.service.mock';
import { Product } from 'business/products/products.entity';
import { ProductsService } from 'business/products/products.service';
import { RedeemProductsServiceMock } from 'business/redeem-products/mocks/redeem-products.service.mock';
import { RedeemProductsService } from 'business/redeem-products/redeem-products.service';
import { userMock } from 'business/users/mocks/user.mocks';
import { UsersServiceMock } from 'business/users/mocks/users.service.mock';
import { UsersService } from 'business/users/users.service';
import { redeemCreateMock, redeemMock } from '../mocks/redeems.mocks';
import { RedeemsRepositoryMock } from '../mocks/redeems.repository.mock';
import { Redeem } from '../redeems.entity';
import { RedeemsService } from '../redeems.service';

describe('RedeemsService', () => {
	let redeemsService: RedeemsService;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			providers: [RedeemsService, {
				provide: getRepositoryToken(Redeem),
				useClass: RedeemsRepositoryMock,
			}, ProductsService, UsersService, RedeemProductsService],
		})
			.overrideProvider(ProductsService)
			.useClass(ProductsServiceMock)
			.overrideProvider(UsersService)
			.useClass(UsersServiceMock)
			.overrideProvider(RedeemProductsService)
			.useClass(RedeemProductsServiceMock)
			.compile();

      redeemsService = app.get<RedeemsService>(RedeemsService);
	});

	describe('getAll', () => {
		it('should return the redeems collection', async () => {
			expect(await redeemsService.getAll(0, 0)).toEqual({
				total: 1,
				redeems: [redeemMock]
			});
		});
	});

	describe('getAllByUser', () => {
		it('should return the redeems collection filtered by user', async () => {
			expect(await redeemsService.getAllByUser(userMock.id, 0, 0)).toEqual([redeemMock]);
		});
	});

	describe('create', () => {
		it('should return the created redeem', async () => {
			expect(await redeemsService.create(redeemCreateMock, userMock)).toEqual(redeemMock);
		});
	
		it('should throw an exception because the user does not match with the authenticated', async () => {
			const request = {
				...redeemCreateMock,
				userId: 'wrong-id'
			};
			expect(
				async() => await redeemsService.create(request, userMock)
			).rejects.toThrow('User does not match with provided in credentials');
		});

		it('should throw an exception because the product was not found', async () => {
			jest.spyOn(redeemsService['productsService'], 'get').mockImplementationOnce(() => null);
			expect(
				async() => await redeemsService.create(redeemCreateMock, userMock)
			).rejects.toThrow(`Product ${redeemCreateMock.products[0].id} not found`);
		});

		it('should throw an exception because the product was not found', async () => {
			jest.spyOn(redeemsService['productsService'], 'get').mockImplementationOnce(async () => ({
				...productMock,
				stock: 0,
			}) as Product);
			expect(
				async() => await redeemsService.create(redeemCreateMock, userMock)
			).rejects.toThrow(`Product ${redeemCreateMock.products[0].id} doesnt have stock left`);
		});

		it('should throw an exception because the product was not found', async () => {
			jest.spyOn(redeemsService['productsService'], 'get').mockImplementationOnce(async () => ({
				...productMock,
				price: 4000,
			}) as Product);
			expect(
				async() => await redeemsService.create(redeemCreateMock, userMock)
			).rejects.toThrow(`Insufficient credits`);
		});
	});
});
