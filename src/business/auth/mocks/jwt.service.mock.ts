import { Injectable } from '@nestjs/common';
import { userJwtMock } from 'business/users/mocks/user.mocks';

@Injectable()
export class JwtServiceMock {
	async sign(): Promise<string> {
		return userJwtMock;
	}
}