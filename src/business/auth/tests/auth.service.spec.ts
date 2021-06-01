import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from 'business/auth/auth.service';
import { userMock, userJwtMock } from 'business/users/mocks/user.mocks';
import { JwtService } from '@nestjs/jwt';
import { JwtServiceMock } from '../mocks/jwt.service.mock';

describe('AuthService', () => {
	let authService: AuthService;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			providers: [AuthService, JwtService],
		})
			.overrideProvider(JwtService)
			.useClass(JwtServiceMock)
			.compile();

      authService = app.get<AuthService>(AuthService);
	});

	describe('generateJwt', () => {
		it('should return the generated jwt', async () => {
			expect(await authService.generateJwt(userMock.id, userMock.email, userMock.role)).toEqual(userJwtMock);
		});
	});
});
