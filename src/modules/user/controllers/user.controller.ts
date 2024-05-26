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
import { UserEntity } from '../entities/user.entity';
import { JwtUserGuard } from '../../auth/guards/jwt-auth.guard';
import { updateUserDTO } from '~/modules/user/dto/update-user.dto';
import { CurrentUser } from '../../auth/decorator/auth-user.decorator';
import { PasswordUpdateDto } from '~/shared/dto/inputs/password.dto';
import { LogService } from '../../log/log.service';

@ApiTags('Website Users - Website Manpulation')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly logService: LogService,
  ) {}

  @Get('get')
  @UseGuards(JwtUserGuard)
  findSelf(@CurrentUser() user: UserEntity): Promise<UserEntity> {
    return this.userService.findOne(user.id);
  }

  @Put('update')
  @UseGuards(JwtUserGuard)
  async updateSelf(
    @CurrentUser() user: UserEntity,
    @Body() updateUserDto: updateUserDTO,
  ): Promise<string> {
    await this.userService.update(user.id, updateUserDto);
    return 'ok';
  }

  @Put('update/password')
  @UseGuards(JwtUserGuard)
  async updateSelfPassword(
    @CurrentUser() user: UserEntity,
    @Body() inputs: PasswordUpdateDto,
  ): Promise<string> {
    await this.userService.updatePasswordById(user.id, inputs);
    return 'ok';
  }
}
