import { UserRoles } from '../enums/roles.enum';
import { User } from '../user.entity';

const userMock = new User();
userMock.id = 'test_id';
userMock.email = 'test_email';
userMock.firstName = 'test_firstName';
userMock.lastName = 'test_lastName';
userMock.password = 'test_password';
userMock.role = UserRoles.CUSTOMER;

const userJwtMock = 'test_jwt';

export {
  userMock,
  userJwtMock,
};