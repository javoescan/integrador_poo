import { Product } from '../products.entity';

const productMock = new Product();
productMock.id = 'test_id';
productMock.price = 5;

export {
  productMock,
};