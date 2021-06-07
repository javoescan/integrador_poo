
import { ExecutionContext } from '@nestjs/common';

export class AuthGuardMock {
	async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
		if (!request.user) {
			return false;
		}
		return true;
	}
}