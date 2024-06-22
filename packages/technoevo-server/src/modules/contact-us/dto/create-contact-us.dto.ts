import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContactUsDto {
  @ApiProperty({ description: 'Name of the person contacting you' })
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  fullname: string;

  @ApiProperty({
    description: 'Email address of the person contacting you (unique)',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Phone number of the person contacting you (optional)',
  })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({ description: 'country code' })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({ description: 'The actual message content' })
  @IsNotEmpty()
  @IsString()
  message: string;

  @ApiProperty({ description: 'Subject of the contact message (optional)' })
  @IsOptional()
  @IsString()
  @Length(1, 255)
  subject: string;
}
