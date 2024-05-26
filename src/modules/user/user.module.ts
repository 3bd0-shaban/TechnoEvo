import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './controllers/user.controller';
import { UserEntity } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { LogModule } from '../log/log.module';
import { EmailService } from '~/shared/mailer/mailer.service';
import { PhoneValidationService } from '~/shared/services/ValidatePhone.service';
import { AdminController } from './controllers/admin.controller';

const userEntityModule = TypeOrmModule.forFeature([UserEntity]);
@Module({
  imports: [userEntityModule, forwardRef(() => AuthModule), LogModule],
  controllers: [UserController, AdminController],
  providers: [UserService, PhoneValidationService, EmailService],
  exports: [UserService],
})
export class UserModule {}
