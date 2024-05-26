import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { CreateUserDTO } from '~/modules/user/dto/create-user.dto';
import { USER_ROLES_ENUMS } from '../user.constant';

export class CreateAdminDto extends CreateUserDTO {
  @ApiProperty({ description: 'phone number' })
  @IsNotEmpty()
  @IsEnum(USER_ROLES_ENUMS)
  role: string;
}
