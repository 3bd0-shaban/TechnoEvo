import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ContactUsService } from './contact-us.service';
import { CreateContactUsDto } from './dto/create-contact-us.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtUserGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';
import { ContactUsEntity } from './entities/contact-us.entity';
import { PaginationArgs } from '~/shared/dto/args/pagination-query.args';

@ApiTags('Contact Us')
@ApiBearerAuth()
@Controller('contact-us')
export class ContactUsController {
  constructor(private readonly contactUsService: ContactUsService) {}

  @Post('create-message')
  create(@Body() inputs: CreateContactUsDto) {
    return this.contactUsService.create(inputs);
  }

  @Get('all-contact-us')
  @UseGuards(JwtUserGuard, AdminGuard)
  async findAll(
    @Query() query: PaginationArgs,
  ): Promise<{ contactUss: ContactUsEntity[]; total: number }> {
    return await this.contactUsService.findAll(query);
  }

  @Get('get/:id')
  @UseGuards(JwtUserGuard, AdminGuard)
  findOne(@Param('id') id: number): Promise<ContactUsEntity> {
    return this.contactUsService.findOne(id);
  }

  @Delete('delete/:id')
  @UseGuards(JwtUserGuard, AdminGuard)
  remove(@Param('id') id: number): Promise<void> {
    return this.contactUsService.removeById(id);
  }
}
