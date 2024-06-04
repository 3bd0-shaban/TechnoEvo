import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserAuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigKeyPaths, ISecurityConfig } from '~/config';
import { isDev } from '~/global/env';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthStrategy } from './auth.constant';
import { PhoneValidationService } from '~/shared/services/ValidatePhone.service';
import { RTJwtStrategy } from './strategies/rt-jwt.strategy';

@Module({
  imports: [
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule.register({
      defaultStrategy: AuthStrategy.JWT,
      session: false,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<ConfigKeyPaths>) => {
        const { jwtSecret, jwtExpire } =
          configService.get<ISecurityConfig>('security');
        console.log(jwtExpire);
        return {
          secret: jwtSecret,
          signOptions: {
            expiresIn: `${jwtExpire}s`,
          },
          ignoreExpiration: isDev,
        };
      },

      inject: [ConfigService],
    }),
  ],
  controllers: [UserAuthController],
  providers: [AuthService, PhoneValidationService, JwtStrategy, RTJwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
