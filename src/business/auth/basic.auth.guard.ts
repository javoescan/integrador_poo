import { ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRoles } from 'business/users/enums/roles.enum';

@Injectable()
export class BasicAuthGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext) {
    if (!(await super.canActivate(context))) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    const request = context.switchToHttp().getRequest();
    if (!Object.values(UserRoles).includes(request.user.role) || !request.user.email || !request.user.id) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return true;
  }
}
