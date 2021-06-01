import * as bcrypt from 'bcrypt';
import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthService } from 'business/auth/auth.service';
import { AuthServiceMock } from 'business/auth/mocks/auth.service.mock';
import { userMock, userJwtMock } from '../mocks/user.mocks';
import { UsersRepositoryMock } from '../mocks/users.repository.mock';
import { User } from '../users.entity';
import { UsersService } from '../users.service';

describe('UsersService', () => {
	let usersService: UsersService;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			providers: [UsersService, AuthService, {
				provide: getRepositoryToken(User),
				useClass: UsersRepositoryMock,
			}],
		})
			.overrideProvider(AuthService)
			.useClass(AuthServiceMock)
			.compile();

      usersService = app.get<UsersService>(UsersService);
	});

	describe('getAll', () => {
		it('should return the users collection', async () => {
			expect(await usersService.getAll()).toEqual([userMock]);
		});
	});

	describe('get', () => {
		it('should return the user', async () => {
			expect(await usersService.get(userMock.id)).toEqual(userMock);
		});
	});

	describe('login', () => {
		it('should return the mocked jwt', async () => {
			jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => Promise.resolve(true));
			expect(await usersService.login(userMock.email, userMock.password)).toEqual(userJwtMock);
		});
		it('should throw an error because the user does not exist', async () => {
			jest.spyOn(usersService['usersRepository'], 'createQueryBuilder').mockImplementationOnce((): any => ({
				addSelect: (): any => ({
					where: (): any => ({
						getOne: (): any => null,
					})
				})
			}));
			expect(async() => await usersService.login(userMock.email, userMock.password)).rejects.toThrowError(HttpException);
		});
		it('should throw an error because the password does not match', async () => {
			jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => Promise.resolve(false));
			expect(async() => await usersService.login(userMock.email, userMock.password)).rejects.toThrowError(HttpException);
		});
	});

	describe('create', () => {
		it('should return the created user', async () => {
			jest.spyOn(usersService['usersRepository'], 'findOne').mockImplementationOnce(() => null);
			expect(await usersService.create(userMock)).toEqual(userMock);
		});
		it('should throw an error because the user already exists', async () => {
			expect(async() => await usersService.create(userMock)).rejects.toThrowError(HttpException);
		});
	});

	describe('update', () => {
		it('should return the updated user', async () => {
			expect(await usersService.update(userMock)).toEqual(userMock);
		});
		it('should throw an error because the user does not exist', async () => {
			jest.spyOn(usersService['usersRepository'], 'findOne').mockImplementationOnce(() => null);
			expect(async() => await usersService.update(userMock)).rejects.toThrowError(HttpException);
		});
	});

	describe('delete', () => {
		it('should return the deleted user id', async () => {
			expect(await usersService.delete(userMock.id)).toEqual(userMock.id);
		});
  });
});
