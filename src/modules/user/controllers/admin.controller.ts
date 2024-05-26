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
import { DashboardGuard } from '../../auth/guards/dashboard.guard';
import { PasswordUpdateDto } from '~/shared/dto/inputs/password.dto';
import { LogService } from '../../log/log.service';

@ApiTags('Admin Control - Dashboard Manpulation')
@ApiBearerAuth()
@Controller('admin')
export class AdminController {
  constructor(
    private readonly userService: UserService,
    private readonly logService: LogService,
  ) {}

  @Post('create-user')
  @UseGuards(DashboardGuard)
  create(@Body() createUserDto: CreateUserDTO) {
    return this.userService.create(createUserDto);
  }

  @Get('all-users')
  @UseGuards(DashboardGuard)
  async findAll(
    @Query() query: PaginationArgs,
  ): Promise<{ users: UserEntity[]; total: number }> {
    return await this.userService.findAll(query);
  }

  @Get('get-by-id/:id')
  @UseGuards(DashboardGuard)
  findOne(@Param('id') id: number): Promise<UserEntity> {
    return this.userService.findOne(id);
  }

  @Put('update-by-id/:id')
  @UseGuards(DashboardGuard)
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: updateUserDTO,
  ): Promise<string> {
    await this.userService.update(id, updateUserDto);
    return 'ok';
  }

  @Put('update-by-id/:id/password')
  @UseGuards(DashboardGuard)
  async updatePassword(
    @Param('id') id: number,
    @Body() inputs: PasswordUpdateDto,
  ): Promise<string> {
    await this.userService.updatePasswordById(id, inputs);
    return 'ok';
  }

  @Delete('delete-by-id/:id')
  @UseGuards(DashboardGuard)
  remove(@Param('id') id: number): Promise<void> {
    return this.userService.removeById(id);
  }
}
