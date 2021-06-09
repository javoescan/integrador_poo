import { TransformInterceptor } from './transform.interceptor';
import { of } from 'rxjs';
import { HttpStatus } from '@nestjs/common';

describe('TransformInterceptor', () => {
	let interceptor = new TransformInterceptor();

	describe('intercept', () => {
		it('should return the response', async () => {
      const payload = { key: 'test' };
			expect(
				await interceptor
					.intercept(null, {
						handle: () => of(payload),
					})
					.toPromise(),
			).toEqual({
        statusCode: HttpStatus.OK,
        payload,
      });
		});
	});
});
