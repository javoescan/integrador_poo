import { Injectable } from '@nestjs/common';
import { userJwtMock } from './user.mocks';

@Injectable()
export class UsersServiceMock {
	async login(email: string, password: string): Promise<string> {
		return userJwtMock;
	}
}