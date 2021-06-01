import { Injectable } from '@nestjs/common';
import { userJwtMock } from 'business/users/mocks/user.mocks';

@Injectable()
export class AuthServiceMock {
	async generateJwt(): Promise<string> {
		return userJwtMock;
	}
}