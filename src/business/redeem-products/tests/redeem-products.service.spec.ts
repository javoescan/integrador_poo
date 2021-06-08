import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthService } from 'business/auth/auth.service';
import { AuthServiceMock } from 'business/auth/mocks/auth.service.mock';
import { redeemProductMock } from '../mocks/redeem-products.mocks';
import { RedeemProductsRepositoryMock } from '../mocks/redeem-products.repository.mock';
import { RedeemProduct } from '../redeem-products.entity';
import { RedeemProductsService } from '../redeem-products.service';

describe('RedeemProductsService', () => {
	let redeemProductsService: RedeemProductsService;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			providers: [RedeemProductsService, AuthService, {
				provide: getRepositoryToken(RedeemProduct),
				useClass: RedeemProductsRepositoryMock,
			}],
		})
			.overrideProvider(AuthService)
			.useClass(AuthServiceMock)
			.compile();

      redeemProductsService = app.get<RedeemProductsService>(RedeemProductsService);
	});

	describe('getAll', () => {
		it('should return the redeemProducts collection', async () => {
			expect(await redeemProductsService.getAll()).toEqual([redeemProductMock]);
		});
	});

	describe('create', () => {
		it('should return the created redeemProduct', async () => {
			expect(await redeemProductsService.create(redeemProductMock)).toEqual(redeemProductMock);
		});
	});
});
