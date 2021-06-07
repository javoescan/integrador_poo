import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { ExecutionContext, HttpException } from '@nestjs/common';
import { AuthGuardMock } from '../mocks/auth.guard.mock';
import { UserRoles } from 'business/users/enums/roles.enum';

jest.mock('@nestjs/passport', () => ({
	AuthGuard: (str: string) => AuthGuardMock,
}));

import { BasicAuthGuard } from '../basic.auth.guard';

describe('BasicAuthGuard', () => {
	let basicAuthGuard: BasicAuthGuard;

  beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			providers: [BasicAuthGuard],
		}).compile();

      basicAuthGuard = app.get<BasicAuthGuard>(BasicAuthGuard);
	});

	describe('canActivate', () => {
		it('should return true because it is a seller or an admin', async () => {
			const mockedExecutionContext = createMock<ExecutionContext>({
				switchToHttp: () => ({
					getRequest: () => ({
						user: {
							role: UserRoles.CUSTOMER,
							email: 'test@test.com',
							id: 'test_id',
						}
					}),
				}),
			});
			expect(await basicAuthGuard.canActivate(mockedExecutionContext)).toBe(true);
		});

		it('should throw an exception because the jwt does not have a user', async () => {
			const mockedExecutionContext = createMock<ExecutionContext>({
				switchToHttp: () => ({
					getRequest: () => ({}),
				}),
			});
			expect(async() => await basicAuthGuard.canActivate(mockedExecutionContext)).rejects.toThrowError(HttpException);
		});

		it('should throw an exception because the user it is not an admin', async () => {
			const mockedExecutionContext = createMock<ExecutionContext>({
				switchToHttp: () => ({
					getRequest: () => ({
						user: {
							role: 5,
						}
					}),
				}),
			});
			expect(async() => await basicAuthGuard.canActivate(mockedExecutionContext)).rejects.toThrowError(HttpException);
		});
  });
});
