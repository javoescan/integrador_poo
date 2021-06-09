import { Injectable } from '@nestjs/common';
import { Redeem } from '../redeems.entity';
import { redeemMock } from './redeems.mocks';

@Injectable()
export class RedeemsRepositoryMock {
	async findAndCount(): Promise<any> {
		return [[redeemMock], 1];
	}

	async find(): Promise<Redeem[]> {
		return [redeemMock];
	}

	async save(user: Redeem): Promise<Redeem> {
		return redeemMock;
	}
}