import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthService } from 'business/auth/auth.service';
import { AuthServiceMock } from 'business/auth/mocks/auth.service.mock';
import { userMock } from 'business/users/mocks/user.mocks';
import { redeemMock } from '../mocks/redeems.mocks';
import { RedeemsRepositoryMock } from '../mocks/redeems.repository.mock';
import { Redeem } from '../redeems.entity';
import { RedeemsService } from '../redeems.service';

describe('RedeemsService', () => {
	let redeemsService: RedeemsService;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			providers: [RedeemsService, AuthService, {
				provide: getRepositoryToken(Redeem),
				useClass: RedeemsRepositoryMock,
			}],
		})
			.overrideProvider(AuthService)
			.useClass(AuthServiceMock)
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
			expect(await redeemsService.create(redeemMock, userMock)).toEqual(redeemMock);
		});
	});
});
