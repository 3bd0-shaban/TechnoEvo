import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthStrategy } from '../auth.constant';

@Injectable()
export class RTJwtUserGuard extends AuthGuard(
  AuthStrategy.REFRESH_JWT_WEBSITE,
) {}
