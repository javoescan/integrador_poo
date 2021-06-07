import { Injectable } from '@nestjs/common';
import { User } from '../users.entity';
import { userMock } from './user.mocks';

@Injectable()
export class UsersRepositoryMock {
	createQueryBuilder = () => ({
		addSelect: () => ({
			where: () => ({
				getOne: () => userMock,
			})
		})
	})

	async find(): Promise<User[]> {
		return [userMock];
	}

	async findOne(id: string): Promise<User> {
		return userMock;
	}

	async save(user: User): Promise<User> {
		return userMock;
	}

	async softDelete(id: string): Promise<string> {
		return id;
	}
}