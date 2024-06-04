import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Query,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { PaginationArgs } from '~/shared/dto/args/pagination-query.args';
import { BlogEntity } from './entities/blog.entity';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '../auth/guards/admin.guard';
import { JwtUserGuard } from '../auth/guards/jwt-auth.guard';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadPipe } from '~/shared/services/file-upload.pipe';

@ApiTags('Blogs')
@ApiBearerAuth()
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post('create-blog')
  @UseInterceptors(FileInterceptor('thumbnail'))
  @UseGuards(JwtUserGuard, AdminGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create Blog',
    type: CreateBlogDto,
    required: true,
  })
  async create(
    @Body() inputs: CreateBlogDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<BlogEntity> {
    console.log(inputs);
    return this.blogService.create(inputs, file.path);
  }

  @Get('all-blogs')
  @UseGuards(JwtUserGuard, AdminGuard)
  async findAll(
    @Query() query: PaginationArgs,
  ): Promise<{ blogs: BlogEntity[]; total: number }> {
    return await this.blogService.findAll(query);
  }

  @Get('get/:id')
  @UseGuards(JwtUserGuard, AdminGuard)
  findOne(@Param('id') id: number): Promise<BlogEntity> {
    return this.blogService.findOne(id);
  }

  @Put('update/:id')
  @UseGuards(JwtUserGuard, AdminGuard)
  async update(
    @Param('id') id: number,
    @Body() inputs: UpdateBlogDto,
  ): Promise<string> {
    await this.blogService.update(id, inputs);
    return 'ok';
  }

  @Delete('delete/:id')
  @UseGuards(JwtUserGuard, AdminGuard)
  remove(@Param('id') id: number): Promise<void> {
    return this.blogService.removeById(id);
  }
}
