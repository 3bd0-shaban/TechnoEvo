import { Module } from '@nestjs/common';
import { ContactUsService } from './contact-us.service';
import { ContactUsController } from './contact-us.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactUsEntity } from './entities/contact-us.entity';
import { PhoneValidationService } from '~/shared/services/ValidatePhone.service';

@Module({
  imports: [TypeOrmModule.forFeature([ContactUsEntity])],
  controllers: [ContactUsController],
  providers: [ContactUsService, PhoneValidationService],
})
export class ContactUsModule {}
