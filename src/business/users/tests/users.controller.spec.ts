import { CacheModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { userMock, userJwtMock } from '../mocks/user.mocks';
import { UsersServiceMock } from '../mocks/users.service.mock';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';

describe('UsersController', () => {
	let usersController: UsersController;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			imports: [CacheModule.register({})],
			controllers: [UsersController],
			providers: [UsersService],
		})
			.overrideProvider(UsersService)
			.useClass(UsersServiceMock)
			.compile();

      usersController = app.get<UsersController>(UsersController);
	});

	describe('getAll', () => {
		it('should return the users collection', async () => {
			expect(await usersController.getAll()).toEqual([userMock]);
		});
	});

	describe('get', () => {
		it('should return the user', async () => {
			expect(await usersController.get(userMock.id)).toEqual(userMock);
		});
	});

	describe('login', () => {
		it('should return the mocked jwt', async () => {
			expect(await usersController.login(userMock.email, userMock.password)).toEqual(userJwtMock);
		});
	});

	describe('create', () => {
		it('should return the created user', async () => {
			expect(await usersController.create(userMock)).toEqual(userMock);
		});
	});

	describe('update', () => {
		it('should return the updated user', async () => {
			expect(await usersController.update(userMock)).toEqual(userMock);
		});
	});

	describe('delete', () => {
		it('should return the deleted user id', async () => {
			expect(await usersController.delete(userMock.id)).toEqual(userMock.id);
		});
	});
});
