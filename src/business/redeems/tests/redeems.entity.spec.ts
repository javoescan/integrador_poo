import * as bcrypt from 'bcrypt';
import { Redeem } from '../redeems.entity';
import { v4 as uuid } from 'uuid';
jest.mock('uuid');
jest.mock('bcrypt');

describe('Redeem', () => {
	const mockedUid = '1';
  uuid.mockImplementation(() => mockedUid);
  jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => '');

	it('should return a redeem object', async () => {
		const redeem = new Redeem();
		await redeem.beforeInsert();
		expect(redeem.id).toEqual(mockedUid);
	});
});
