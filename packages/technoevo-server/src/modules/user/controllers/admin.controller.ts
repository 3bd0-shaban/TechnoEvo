import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from '~/modules/user/dto/create-user.dto';
import { PaginationArgs } from '~/shared/dto/args/pagination-query.args';
import { UserEntity } from '../entities/user.entity';
import { updateUserDTO } from '~/modules/user/dto/update-user.dto';
import { PasswordUpdateDto } from '~/shared/dto/inputs/password.dto';
import { LogService } from '../../log/log.service';
import { USER_ROLES_ENUMS } from '../user.constant';
import { AdminGuard } from '~/modules/auth/guards/admin.guard';
import { JwtUserGuard } from '~/modules/auth/guards/jwt-auth.guard';

@ApiTags('Admin Control - Dashboard Manpulation')
@ApiBearerAuth()
@Controller('admin')
export class AdminController {
  constructor(
    private readonly userService: UserService,
    private readonly logService: LogService,
  ) {}

  @Post('create-user')
  @UseGuards(JwtUserGuard, AdminGuard)
  createUser(@Body() createUserDto: CreateUserDTO) {
    return this.userService.create(createUserDto, USER_ROLES_ENUMS.User);
  }

  @Post('create-admin')
  createAdmin(@Body() createUserDto: CreateUserDTO) {
    return this.userService.create(createUserDto, USER_ROLES_ENUMS.Admin);
  }

  @Get('all-users')
  @UseGuards(JwtUserGuard, AdminGuard)
  async findAll(
    @Query() query: PaginationArgs,
  ): Promise<{ users: UserEntity[]; total: number }> {
    return await this.userService.findAll(query);
  }

  @Get('get-by-id/:id')
  @UseGuards(JwtUserGuard, AdminGuard)
  findOne(@Param('id') id: number): Promise<UserEntity> {
    return this.userService.findOne(id);
  }

  @Put('update-by-id/:id')
  @UseGuards(JwtUserGuard, AdminGuard)
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: updateUserDTO,
  ): Promise<string> {
    await this.userService.update(id, updateUserDto);
    return 'ok';
  }

  @Put('update-by-id/:id/password')
  @UseGuards(JwtUserGuard, AdminGuard)
  async updatePassword(
    @Param('id') id: number,
    @Body() inputs: PasswordUpdateDto,
  ): Promise<string> {
    await this.userService.updatePasswordById(id, inputs);
    return 'ok';
  }

  @Delete('delete-by-id/:id')
  @UseGuards(JwtUserGuard, AdminGuard)
  remove(@Param('id') id: number): Promise<void> {
    return this.userService.removeById(id);
  }
}
