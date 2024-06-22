import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateReplyDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  reply: string;
}
