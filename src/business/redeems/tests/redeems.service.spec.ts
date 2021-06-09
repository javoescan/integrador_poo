import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductsServiceMock } from 'business/products/mocks/products.service.mock';
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
			expect(await redeemsService.getAllByUser()).toEqual([redeemMock]);
		});
	});

	describe('create', () => {
		it('should return the created redeem', async () => {
			expect(await redeemsService.create(redeemCreateMock, userMock)).toEqual(redeemMock);
		});
	});
});
