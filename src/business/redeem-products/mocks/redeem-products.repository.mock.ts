import { Injectable } from '@nestjs/common';
import { RedeemProduct } from '../redeem-products.entity';
import { redeemProductMock } from './redeem-products.mocks';

@Injectable()
export class RedeemProductsRepositoryMock {
	async find(): Promise<RedeemProduct[]> {
		return [redeemProductMock];
	}

	async save(redeemProduct: RedeemProduct): Promise<RedeemProduct> {
		return redeemProductMock;
	}
}