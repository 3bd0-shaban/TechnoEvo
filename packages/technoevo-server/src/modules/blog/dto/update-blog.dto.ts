import { PartialType } from '@nestjs/mapped-types';
import { CreateBlogDto } from './create-blog.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateBlogDto extends PartialType(CreateBlogDto) {
  @ApiProperty({
    type: Boolean,
  })
  @IsNotEmpty()
  @IsBoolean()
  is_Active: boolean;

  @ApiProperty({
    type: Boolean,
  })
  @IsNotEmpty()
  @IsBoolean()
  is_Commenting: boolean;
}
