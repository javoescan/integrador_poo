import { userMock } from 'business/users/mocks/user.mocks';
import { Redeem } from '../redeems.entity';

const redeemMock = new Redeem();
redeemMock.user = userMock;

export { redeemMock };