import { Injectable } from '@nestjs/common';
import { RedeemProduct } from '../redeem-products.entity';
import { redeemProductMock } from './redeem-products.mocks';

@Injectable()
export class RedeemProductsServiceMock {
	async getAll(id: string): Promise<RedeemProduct[]> {
		return [redeemProductMock];
	}

	async create(redeemProduct: RedeemProduct): Promise<RedeemProduct> {
		return redeemProductMock;
	}
}