import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength, IsNotEmpty } from 'class-validator';

export class NewBlogdto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, {
    message: 'minLength-{"ln":6,"count":6}',
  })
  @MaxLength(20, {
    message: 'maxLength-{"ln":20,"count":20}',
  })
  @ApiProperty()
  content: string;
}
