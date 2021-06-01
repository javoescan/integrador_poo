import * as bcrypt from 'bcrypt';
import { User } from '../users.entity';
import { v4 as uuid } from 'uuid';
jest.mock('uuid');
jest.mock('bcrypt');

describe('User', () => {
	const mockedUid = '1';
  uuid.mockImplementation(() => mockedUid);
  jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => '');

	it('should return an user object', async () => {
		const user = new User();
		await user.beforeInsert();
		expect(user.id).toEqual(mockedUid);
	});
});
