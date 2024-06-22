import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Inject, ForbiddenException } from '@nestjs/common';
import { Request } from 'express';
import { UserJwtPayload } from '../auth';
import { ISecurityConfig, SecurityConfig } from '~/config';
import { AuthStrategy } from '../auth.constant';
import { UserService } from '~/modules/user/user.service';

@Injectable()
export class RTJwtStrategy extends PassportStrategy(
  Strategy,
  AuthStrategy.REFRESH_JWT_WEBSITE,
) {
  constructor(
    @Inject(SecurityConfig.KEY) private securityConfig: ISecurityConfig,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const RTCookie = request.cookies['refresh_token'];
          if (!RTCookie) {
            throw new ForbiddenException(
              'No refresh token founded, log in required',
            );
          }
          return RTCookie;
        },
      ]),
      secretOrKey: securityConfig.jwtSecret,
    });
  }

  async validate(payload: UserJwtPayload) {
    return this.userService.findOne(payload.sub);
  }
}
