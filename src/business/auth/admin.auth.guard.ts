import { ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRoles } from 'business/users/enums/roles.enum';

@Injectable()
export class AdminAuthGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext) {
    if (!(await super.canActivate(context))) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    const request = context.switchToHttp().getRequest();
    if (request.user.role !== UserRoles.ADMIN) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return true;
  }
}
