import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { RedeemProduct } from '../redeem-products.entity';
jest.mock('uuid');
jest.mock('bcrypt');

describe('RedeemProduct', () => {
	const mockedUid = '1';
  uuid.mockImplementation(() => mockedUid);
  jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => '');

	it('should return an redeem product object', async () => {
		const redeemProduct = new RedeemProduct();
		await redeemProduct.beforeInsert();
		expect(redeemProduct.id).toEqual(mockedUid);
	});
});
