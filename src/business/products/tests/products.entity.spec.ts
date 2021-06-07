import { Product } from '../products.entity';
import { v4 as uuid } from 'uuid';
jest.mock('uuid');

describe('Product', () => {
	const mockedUid = '1';
  uuid.mockImplementation(() => mockedUid);

	it('should return a product object', async () => {
		const product = new Product();
		await product.beforeInsert();
		expect(product.id).toEqual(mockedUid);
	});
});
