import { Injectable } from '@nestjs/common';
import { User } from '../users.entity';
import { userMock, userJwtMock } from './user.mocks';

@Injectable()
export class UsersServiceMock {
	async getAll(id: string): Promise<User[]> {
		return [userMock];
	}

	async get(id: string): Promise<User> {
		return userMock;
	}

	async login(email: string, password: string): Promise<string> {
		return userJwtMock;
	}

	async create(user: User): Promise<User> {
		return userMock;
	}

	async update(user: User): Promise<User> {
		return userMock;
	}

	async delete(id: string): Promise<string> {
		return id;
	}
}