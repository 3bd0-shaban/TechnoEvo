import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { CategoryEntity } from '~/modules/category/entities/category.entity';

export class CreateBlogDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  blog_Title?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  blog_des?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  thumbnail?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  categories?: CategoryEntity[];
}
