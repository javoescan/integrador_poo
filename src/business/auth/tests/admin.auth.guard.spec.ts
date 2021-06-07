import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { ExecutionContext, HttpException } from '@nestjs/common';
import { UserRoles } from 'business/users/enums/roles.enum';
import { AuthGuardMock } from '../mocks/auth.guard.mock';

jest.mock('@nestjs/passport', () => ({
	AuthGuard: (str: string) => AuthGuardMock,
}));

import { AdminAuthGuard } from '../admin.auth.guard';

describe('AdminAuthGuard', () => {
	let adminAuthGuard: AdminAuthGuard;

  beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			providers: [AdminAuthGuard],
		}).compile();

      adminAuthGuard = app.get<AdminAuthGuard>(AdminAuthGuard);
	});

	describe('canActivate', () => {
		it('should return true because it is an admin', async () => {
			const mockedExecutionContext = createMock<ExecutionContext>({
				switchToHttp: () => ({
					getRequest: () => ({
						user: {
							role: UserRoles.ADMIN,
						},
					}),
				}),
			});
			expect(await adminAuthGuard.canActivate(mockedExecutionContext)).toBe(true);
		});

		it('should throw an exception because the jwt does not have a user', async () => {
			const mockedExecutionContext = createMock<ExecutionContext>({
				switchToHttp: () => ({
					getRequest: () => ({}),
				}),
			});
			expect(async() => await adminAuthGuard.canActivate(mockedExecutionContext)).rejects.toThrowError(HttpException);
		});

		it('should throw an exception because the user it is not an admin', async () => {
			const mockedExecutionContext = createMock<ExecutionContext>({
				switchToHttp: () => ({
					getRequest: () => ({
						user: {
							role: UserRoles.CUSTOMER,
						},
					}),
				}),
			});
			expect(async() => await adminAuthGuard.canActivate(mockedExecutionContext)).rejects.toThrowError(HttpException);
		});
  });
});
