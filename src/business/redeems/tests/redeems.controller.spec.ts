import { Test, TestingModule } from '@nestjs/testing';
import { redeemMock } from '../mocks/redeems.mocks';
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
			expect(await redeemsController.getAllByUser()).toEqual([redeemMock]);
		});
	});

	describe('create', () => {
		it('should return the created redeem', async () => {
			expect(await redeemsController.create(redeemMock)).toEqual(redeemMock);
		});
	});
});
