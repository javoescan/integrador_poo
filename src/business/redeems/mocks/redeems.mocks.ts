import { productMock } from 'business/products/mocks/products.mocks';
import { userMock } from 'business/users/mocks/user.mocks';
import { RedeemCreate } from '../interfaces/redeem-create.interface';
import { Redeem } from '../redeems.entity';

const redeemMock = new Redeem();
redeemMock.user = userMock;

const redeemCreateMock: RedeemCreate = {
  userId: userMock.id,
  products: [productMock],
}

export { redeemMock, redeemCreateMock };