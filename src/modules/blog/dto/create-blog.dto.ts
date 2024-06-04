import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsString,
  MinLength,
  ArrayNotEmpty,
} from 'class-validator';
import { CategoryEntity } from '~/modules/category/entities/category.entity';

export class CreateBlogDto {
  @ApiProperty({
    description: 'Title should be at least 3 characters in length',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  blog_Title?: string;

  @ApiProperty({
    description: 'Description of the blog',
  })
  @IsNotEmpty()
  @IsString()
  blog_des?: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Blog Image',
  })
  @IsNotEmpty()
  thumbnail?: any;

  @ApiProperty({
    type: 'array',
    description: 'Categories associated with the blog',
    example: [1, 2],
  })
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  categories?: CategoryEntity[];
}
