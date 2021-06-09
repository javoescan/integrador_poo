import { Test, TestingModule } from '@nestjs/testing';
import { userMock } from 'business/users/mocks/user.mocks';
import { redeemCreateMock, redeemMock } from '../mocks/redeems.mocks';
import { RedeemsServiceMock } from '../mocks/redeems.service.mock';
import { RedeemsController } from '../redeems.controller';
import { RedeemsService } from '../redeems.service';

describe('RedeemsController', () => {
	let redeemsController: RedeemsController;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			controllers: [RedeemsController],
			providers: [RedeemsService],
		})
			.overrideProvider(RedeemsService)
			.useClass(RedeemsServiceMock)
			.compile();

      redeemsController = app.get<RedeemsController>(RedeemsController);
	});

	describe('getAll', () => {
		it('should return the redeems collection', async () => {
			expect(await redeemsController.getAll(0, 0)).toEqual([redeemMock]);
		});
	});

	describe('getAllByUser', () => {
		it('should return the redeems collection filtered by users', async () => {
			expect(await redeemsController.getAllByUser(userMock.id, 0, 0)).toEqual([redeemMock]);
		});
	});

	describe('create', () => {
		it('should return the created redeem', async () => {
			expect(await redeemsController.create(redeemCreateMock, userMock)).toEqual(redeemMock);
		});
	});
});
