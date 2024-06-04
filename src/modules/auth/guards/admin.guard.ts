import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { UserEntity } from '~/modules/user/entities/user.entity';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    if (request.user) {
      const user = request.user as UserEntity;
      if (user.role === 'Super Admin' || user.role === 'Admin') {
        return true;
      }
    }
    throw new UnauthorizedException(
      'Could not authenticate with token or user does not have permissions',
    );
  }
}
