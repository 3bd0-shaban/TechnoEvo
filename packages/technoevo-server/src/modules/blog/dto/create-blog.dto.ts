import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsString,
  MinLength,
  ArrayNotEmpty,
  IsOptional,
  MaxLength,
} from 'class-validator';
import { CategoryEntity } from '~/modules/category/entities/category.entity';

export class CreateBlogDto {
  @ApiProperty({
    description: 'Title should be at least 3 characters in length',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(70)
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
  @IsOptional()
  thumbnail?: any;

  @ApiProperty({
    type: [Number],
    description: 'Categories associated with the blog',
    example: [1, 2],
  })
  @IsString({ each: true })
  @IsNotEmpty()
  categories?: CategoryEntity[];
}
