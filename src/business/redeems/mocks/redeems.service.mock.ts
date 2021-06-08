import { Injectable } from '@nestjs/common';
import { Redeem } from '../redeems.entity';
import { redeemMock } from './redeems.mocks';

@Injectable()
export class RedeemsServiceMock {
	async getAllByUser(id: string): Promise<Redeem[]> {
		return [redeemMock];
	}

	async create(user: Redeem): Promise<Redeem> {
		return redeemMock;
	}
}