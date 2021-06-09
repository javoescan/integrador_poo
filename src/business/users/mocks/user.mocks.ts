import { UserRoles } from '../enums/roles.enum';
import { User } from '../users.entity';

const userMock = new User();
userMock.id = 'test_id';
userMock.email = 'test_email';
userMock.firstName = 'test_firstName';
userMock.lastName = 'test_lastName';
userMock.document = 'test_document';
userMock.password = 'test_password';
userMock.role = UserRoles.CUSTOMER;
userMock.credits = 10;

const userJwtMock = 'test_jwt';
const loginMock = { token: userJwtMock };

export {
  userMock,
  userJwtMock,
  loginMock,
};