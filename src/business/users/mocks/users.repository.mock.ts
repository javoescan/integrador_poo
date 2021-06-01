import { Injectable } from '@nestjs/common';
import { User } from '../user.entity';
import { userMock } from './user.mocks';

@Injectable()
export class UsersRepositoryMock {
	async findOne(id: string): Promise<User> {
		return userMock;
	}
}